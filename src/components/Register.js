import React, {Component} from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';

const API_link = "http://18.191.179.31:9092";

class RegistrationForm extends Component {
   state = {
       confirmDirty: false,
       autoCompleteResult: [],
   };

   handleConfirmBlur = e => {
       const { value } = e.target;
       this.setState({ confirmDirty: this.state.confirmDirty || !!value });
   };

   compareToFirstPassword = (rule, value, callback) => {
       const { form } = this.props;
       if (value && value !== form.getFieldValue('password')) {
           callback('Two passwords that you enter is inconsistent!');
       } else {
           callback();
       }
   };

   validateToNextPassword = (rule, value, callback) => {
       const { form } = this.props;
       if (value && this.state.confirmDirty) {
           form.validateFields(['confirm'], { force: true });
       }
       callback();
   };

   handleSubmit = e => {
       e.preventDefault();
       this.props.form.validateFields((err, values) => {
           if (!err) {
               console.log('Received values of form: ', values);
               axios.post("http://localhost:8080/register", {
                 email: values.email,
                 password: values.password,
                 firstName: values.firstName,
                 lastName: values.lastName
               })
               .then(response => {
                 console.log(response);
                 message.success('Registration succeed!');
               })
               .catch((err) => {
                  console.error(err);
                  message.error('Registration failed.');
              });
           }
       });
   };

   render() {
       const { getFieldDecorator } = this.props.form;

       const formItemLayout = {
           labelCol: {
               xs: { span: 24 },
               sm: { span: 8 },
           },
           wrapperCol: {
               xs: { span: 24 },
               sm: { span: 16 },
           },
       };
       const tailFormItemLayout = {
           wrapperCol: {
               xs: {
                   span: 24,
                   offset: 0,
               },
               sm: {
                   span: 16,
                   offset: 8,
               },
           },
       };

       return (
           <div className="register-layout">
           <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register">
             <Form.Item label="FirstName" >
                 {
                   getFieldDecorator('firstName', {
                     rules: [{ required: true, message: 'Please input your firstName' }],
                   })(<Input />)
                 }
             </Form.Item>
             <Form.Item label="LastName" >
                 {
                   getFieldDecorator('lastName', {
                     rules: [{ required: true, message: 'Please input your lastName' }],
                   })(<Input />)
                 }
             </Form.Item>
               <Form.Item label="Email" >
                   {
                     getFieldDecorator('email', {
                       rules: [{ required: true, message: 'Please input your email!' }],
                     })(<Input />)
                   }
               </Form.Item>
               <Form.Item label="Password" hasFeedback>
                   {getFieldDecorator('password', {
                       rules: [
                           {
                               required: true,
                               message: 'Please input your password!',
                           },
                           {
                               validator: this.validateToNextPassword,
                           },
                       ],
                   })(<Input.Password />)}
               </Form.Item>
               <Form.Item label="Confirm Password" hasFeedback>
                   {getFieldDecorator('confirm', {
                       rules: [
                           {
                               required: true,
                               message: 'Please confirm your password!',
                           },
                           {
                               validator: this.compareToFirstPassword,
                           },
                       ],
                   })(<Input.Password onBlur={this.handleConfirmBlur} />)}
               </Form.Item>
               <Form.Item {...tailFormItemLayout}>
                   <Button type="primary" htmlType="submit" style={{background: "#dcbc60", borderColor: "white"}} className="register-button">
                       Register
                   </Button>
                   {<p>I already have an account, go back to <Link to="/login">login</Link></p>}
               </Form.Item>
           </Form>
           </div>
       );
   }
}

export const Register = Form.create({ name: 'register' })(RegistrationForm);
