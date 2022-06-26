import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: 'Anita Hegde',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    loginClicked() {
        if(this.state.username==='Anita Hegde' && this.state.password==='abcdef'){    
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);      
            this.props.navigate(`/welcome/${this.state.username}`)
        }
        else {
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        }

        AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password).then(() =>
         {
            AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
            this.props.navigate(`/welcome/${this.state.username}`)
        }).catch( () =>{
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        })
        
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                <div className="TodoApp">
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn" onClick={this.loginClicked}>Login</button>
                </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent