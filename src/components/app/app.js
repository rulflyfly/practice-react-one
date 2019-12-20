import React, { Component } from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../items-status-filter/items-status-filter';
import ItemAddForm from '../item-add-form/item-add-form';

import './app.css'

// All elements' names start with capitals this is required in React
// That's how React differs custom tags from standard html tags
//JSX only create one element so always wrap multiple elements with a parent element

export default class App extends Component {

    maxId = 100;

    state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch')
      ],
      term: '',
      filter: 'all'
    }

    createTodoItem(label) {
      return {
        label, 
        important: false, 
        done: false,
        id: this.maxId++
      }
    }

    deleteItem = (id) => {
       this.setState(({todoData}) => {
         const idx = todoData.findIndex(el => el.id === id);
         
         const newArray = [...todoData.slice(0, idx), 
               ...todoData.slice(idx+1)];

         return {
           todoData: newArray
         };
       });
    }

    addItem = (text) => {
      this.setState(({todoData}) => {
        const newItem = this.createTodoItem(text);
        const newArray = [
          ...todoData, 
          newItem  
        ];
        

        return {
          todoData: newArray
        }
      })
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex(el => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
          ...arr.slice(0, idx), 
          newItem,
          ...arr.slice(idx+1)
        ];

    }

    onToggleDone = (id) => {
      this.setState(({ todoData }) => {
      
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }

      });
    }

    onToggleImportant = (id) => {

      this.setState(({ todoData }) => {
      
      return {
          todoData: this.toggleProperty(todoData, id, 'important')
      }
  
        });
    }

    onFilter = (text) => {
      this.setState(() => {
        return {
          term: text
        }
      })
    }

    onStatusChange = (status) =>{
      this.setState({
        filter: status
      })
    }

    search = (items, term) => {
       if (term === '') {
         return items;
       }
       return items.filter(item => {
         return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
       })
    }

    filter = (items, filter) => {
      switch (filter) {
        case 'all':
          return items;
        case 'active':
          return items.filter(item => !item.done);
        case 'done':
          return items.filter(item => item.done);
        default:
          return items;
      }
    }


    render () {
      const { todoData, term, filter } = this.state;
      const visibleItems = this.filter(this.search(todoData, term), filter);

      const doneCount = todoData
                     .filter(el => el.done)
                     .length;

      const todoCount = todoData.length - doneCount;

      return (
        <div className="todo-app mx-auto container width">
          <AppHeader toDo={todoCount} done={doneCount} />
          <div className="top-panel d-flex">
            <SearchPanel 
              onFilter={this.onFilter}/>
            <ItemStatusFilter 
            onStatusChange={this.onStatusChange}
            filter={filter}/>
          </div>
    
          <TodoList todos={visibleItems} 
          onDeleted = {this.deleteItem}
          onToggleImportant = {this.onToggleImportant}
          onToggleDone = {this.onToggleDone} />

          <ItemAddForm
          addItem = { this.addItem } />
        </div>
      );
    }
  
  
  };

 