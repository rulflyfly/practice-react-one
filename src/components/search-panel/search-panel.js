import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {


    onInputChange = (e) => {
       
      this.props.onFilter(e.target.value)
      
    }
    
    render () {
    const searchText = 'Type here to search'

    return (
         <input 
    placeholder={searchText} className='p-2'
    onChange={this.onInputChange}/>
    );
    }
}




    