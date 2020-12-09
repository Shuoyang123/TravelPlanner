import React, {Component} from 'react';
import {Button, DatePicker} from 'antd';
import PlacesAutocomplete from 'react-places-autocomplete';



const {RangePicker} = DatePicker;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            startDate : '',
            endDate: '',
            address: '',
        };
    }

    searchTextOnChange = searchText => {
        this.setState({ searchText });
    };

    selectOnChange = address => {
        this.setState({ searchText: address, address})
    }

    dateOnChange = (dates) => {
        this.setState({
            startDate: dates[0],
            endDate: dates[1]
        })
    };


    searchOnClick = () => {
        const dates = [];
        let i = 0;
        while (true) {
            const copy = this.state.startDate.clone();
            copy.add(i, 'days');
            i++
            if (copy <= this.state.endDate) {
                dates.push(copy);
            }
            else {
                break;
            }
        }

        this.props.update(
            this.state.address,
            dates,

        )
    }



    render() {

        const searchOptions = {
            types: ['(cities)'],
        }

       return (
           <div className="container">

               <div className="search-city">
                   <PlacesAutocomplete
                       value={this.state.searchText}
                       onChange={this.searchTextOnChange}
                       onSelect={this.selectOnChange}
                       searchOptions={searchOptions}
                   >

                   {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                       <div>
                           <input style={{border: "3px solid #dcbc60", borderRadius: "5px", height: "35px"}}
                               {...getInputProps({
                                   placeholder: 'Search City ...',
                                   className: 'location-search-input',
                               })}
                           />
                           <div className="autocomplete-dropdown-container">
                               {loading && <div>Loading...</div>}
                               {suggestions.map(suggestion => {
                                   const className = suggestion.active
                                       ? 'suggestion-item--active'
                                       : 'suggestion-item';
                                   // inline style for demonstration purpose
                                   const style = suggestion.active
                                       ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                       : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                   return (
                                       <div
                                           {...getSuggestionItemProps(suggestion, {
                                               className,
                                               style,
                                           })}
                                       >
                                           <span>{suggestion.description}</span>
                                       </div>
                                   );
                               })}
                           </div>
                       </div>
                   )}
               </PlacesAutocomplete>
               </div>

               <div className="search-date">
                   <RangePicker onChange={this.dateOnChange}></RangePicker>
               </div>

               <div className="search-next-btm">
                   <Button type="primary" style={{background: "#dcbc60", borderColor: "#dcbc60", width: "150px", height: "35px"}} onClick={this.searchOnClick}>Next</Button>
               </div>

           </div>
       );
   }
}



export default Search;
