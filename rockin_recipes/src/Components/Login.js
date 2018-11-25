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

    handleSubmit(event) {
        event.preventDefault();

        axios.get(`http://localhost:5000/getUser?userId=${this.state.username}`)
            .then(res => {
                var likesIds = res.data.likes;
                var likesList = [];
                for (var i = 0; i < likesIds.length; i++) {
                    axios.get(`http://localhost:5000/getRecipe?recipeId=${likesIds[i]}`)
                        .then(res => {
                            likesList.push(res.data)
                        });
                }
                this.props.addLikesAction(likesList);

                var dislikesIds = res.data.dislikes;
                var dislikesList = [];
                for (var j = 0; j < dislikesIds.length; j++) {
                    axios.get(`http://localhost:5000/getRecipe?recipeId=${dislikesIds[j]}`)
                        .then(res => {
                            dislikesList.push(res.data)
                        });
                }
                this.props.addDislikesAction(dislikesList);
                this.props.loginUsernameAction(this.state.username);
            });
    }

    render () {
        const title = {
            fontSize: '60px',
            color: 'purple',
            textAlign: 'center',
        }
        return (
            <div>
            <h1 style={title}>ROCKIN' RECIPES</h1>
            <form onSubmit={this.handleSubmit}>
                Please enter your email&nbsp;
                <input type="text" value={this.state.username} onChange={this.handleChange}></input><br/>
                <input type="submit" value="Login"></input><br/>
            </form>
            </div>
        )
    }
}

// function validate(values) {
//     const errors = {};
//     if(!values.email)
//     {
//         errors.email = 'Please enter an email';
//     }
//
//     return errors;
// }

const mapDispatchToProps = {
    loginUsernameAction,
    addLikesAction,
    addDislikesAction
};

const mapStateToProps = state => {
    return {
        user: state.user,
        recipeList: state.recipeList
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)