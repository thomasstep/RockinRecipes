import React, { Component } from 'react';
import { connect } from "react-redux";
import { loginUsernameAction, addLikesAction, addDislikesAction } from "../redux/actions.js"
import axios from 'axios';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            user: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        axios.get(`http://localhost:5000/getUser?userId=${this.state.username}`)
            .then(res => {
                this.props.addLikesAction(res.data.likes)
                this.props.addDislikesAction(res.data.dislikes)
            })
        this.props.loginUsernameAction(this.state.username);
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                Please enter your email&nbsp;
                <input type="text" value={this.state.username} onChange={this.handleChange}></input><br/>
                <input type="submit" value="Login"></input><br/>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};
    if(!values.email)
    {
        errors.email = 'Please enter an email';
    }

    return errors;
}

const mapDispatchToProps = {
    loginUsernameAction,
    addLikesAction,
    addDislikesAction
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
