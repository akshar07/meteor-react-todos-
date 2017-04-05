import React, { Component,PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import Task from './Task.jsx';
import { Tasks } from '../api/tasks.js';

 class App extends Component{
  
    renderTasks(){
       return this.props.tasks.map((task)=>{
            return (
                <Task id={task.id} task={task}/>
            )
        });
    };
    handleSubmit(event){
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        Tasks.insert(
            {text,
            createdAt:new Date()
        });
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    render(){
        return (
            
            <div className="container">
                <header>
                    Todo - list
                </header>
                <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                    <input 
                    type="text"
                    ref="textInput"
                    placeholder="add new task"
                    />
                </form>
                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}
App.propTypes = {
  tasks: PropTypes.array.isRequired,
};
export default createContainer(() => {
  return {
   tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);