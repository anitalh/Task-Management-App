import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'
import moment from 'moment'

class ListTodosComponent extends Component {
    constructor(props){
        super(props)
        this.state = {todos : [],
            message : null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
    }

    componentDidMount() {
        this.refreshTodos()
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    this.setState({ todos: response.data })
                }
            )
    }

    addTodoClicked() {
        this.props.navigate(`/todos/-1`)
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({message : `Delete of todo ${id} is successful!`})
                    this.refreshTodos()
                }
            )

    }
    updateTodoClicked(id){
        this.props.navigate(`/todos/${id}`)
    }

    render() {
        return (
            <div>
                <h1>Todos</h1>
                {this.state.message && <div className="alert">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Dtae</th>
                                <th>Is Completed?</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map (todos =>
                            <tr key = {todos.id}>
                                <td>{todos.description}</td>
                                <td>{todos.targetDate.toString()}</td>
                                <td>{moment(todos.targetDate).format('YYYY-MM-DD')}</td>
                                <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todos.id)}>Delete</button></td>
                                <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todos.id)}>Update</button></td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )        
    }
}

export default ListTodosComponent