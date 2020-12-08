import React, {Component} from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { API_ROOT } from '../const/constant';
import { TOKEN_KEY } from '../const/constant';
import '../styles/Login.css';

class NormalLoginForm extends Component {
   handleSubmit = e => {
       e.preventDefault();
       this.props.form.validateFields((err, values) => {
           if (!err) {
               console.log('Received values of form: ', values);
           }
       });
   };

   render() {
       const { getFieldDecorator } = this.props.form;
       return (
           <div className="login-layout">
           <Form onSubmit={this.handleSubmit} className="login-form">
               <Form.Item>
                   {getFieldDecorator('username', {
                       rules: [{ required: true, message: 'Please input your username!' }],
                   })(
                       <Input
                           prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           placeholder="Username"
                       />,
                   )}
               </Form.Item>
               <Form.Item>
                   {getFieldDecorator('password', {
                       rules: [{ required: true, message: 'Please input your Password!' }],
                   })(
                       <Input
                           prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           type="password"
                           placeholder="Password"
                       />,
                   )}
               </Form.Item>
               <Form.Item>
                   <Button type="primary" htmlType="submit" style={{background: "#dcbc60", borderColor: "white"}} className="login-form-button">
                       Log in
                   </Button>
                   Or <Link to="/register">register now!</Link>
               </Form.Item>
           </Form>
           </div>
       );
   }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default Login;
