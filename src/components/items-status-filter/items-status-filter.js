import React, {Component} from 'react';

import './items-status-filter.css';


export default class ItemStatusFilter extends Component {

        changeStatus = (e) => {
                this.props.onStatusChange(e.target.textContent.toLowerCase());
        }

        buttonData = [
                {name: 'all', label: 'All'},
                {name: 'active', label: 'Active'},
                {name: 'done', label: 'Done'}
        ]

        render () {
          
                const { filter } = this.props

          const buttons = this.buttonData.map(({name, label}) => {
                const isActive = filter === name;
                const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'
               return <button type="button"
                className={`btn ${clazz}`}
                key={name}
                onClick={this.changeStatus}>{label}</button>
          })
          return (
            <div className="btn-group">
                {buttons}
            </div>
        ); 
        }
};
  