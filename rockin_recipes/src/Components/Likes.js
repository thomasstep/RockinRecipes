import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { addLikesAction, addDislikesAction } from "../redux/actions.js"
//Idea create an array with each recipe id assigned to 0. change to -1 for dislike and 1 for like
//use axios based on each value in this array[recipeId:value]
class Likes extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            likes: 0,
            //updated: false
            status: ""
        };

    }
    liked = () => {
        this.setState((prevState, props) => {
            return {
                likes: 1,
                status: "Liked"

            };

        });
        axios.get(`http://localhost:5000/addLike?recipeId=${this.props.recipeid}&userId=${this.props.userid}`)
            .then(res => {
                axios.get(`http://localhost:5000/getUser?userId=${this.props.userid}`)
                    .then(res => {
                        var likesIds = res.data.likes;
                        var likesList = [];
                        for (var i = 0; i < likesIds.length; i++) {
                            axios.get(`http://localhost:5000/getRecipe?recipeId=${likesIds[i]}`)
                                .then(res => {
                                    var data = res.data;
                                    likesList.push(data);
                                });
                        }
                        this.props.addLikesAction(likesList);

                        var dislikesIds = res.data.dislikes;
                        var dislikesList = [];
                        for (var j = 0; j < dislikesIds.length; j++) {
                            axios.get(`http://localhost:5000/getRecipe?recipeId=${dislikesIds[j]}`)
                                .then(res => {
                                    var data = res.data;
                                    dislikesList.push(data);
                                });
                        }
                        this.props.addDislikesAction(dislikesList);
                    });
            })
    }
    disliked = () => {
        this.setState((prevState, props) => {
            return {
                likes: -1,
                status: "Disliked"
            };

        })
        axios.get(`http://localhost:5000/addDislike?recipeId=${this.props.recipeid}&userId=${this.props.userid}`)
            .then(res => {
                axios.get(`http://localhost:5000/getUser?userId=${this.props.userid}`)
                    .then(res => {
                        var likesIds = res.data.likes;
                        var likesList = [];
                        for (var i = 0; i < likesIds.length; i++) {
                            axios.get(`http://localhost:5000/getRecipe?recipeId=${likesIds[i]}`)
                                .then(res => {
                                    var data = res.data;
                                    likesList.push(data);
                                });
                        }
                        this.props.addLikesAction(likesList);

                        var dislikesIds = res.data.dislikes;
                        var dislikesList = [];
                        for (var j = 0; j < dislikesIds.length; j++) {
                            axios.get(`http://localhost:5000/getRecipe?recipeId=${dislikesIds[j]}`)
                                .then(res => {
                                    var data = res.data;
                                    dislikesList.push(data);
                                });
                        }
                        this.props.addDislikesAction(dislikesList);
                    });
            });
    }
    /*updateLikes = () => {
   
       if(!this.state.updated) {
         this.setState((prevState, props) => {
           return {
             likes: prevState.likes + 1,
             updated: true
           };
         });
   
       } else {
   
         this.setState((prevState, props) => {
           return {
             likes: prevState.likes - 1,
             updated: false
           };
         });
   
       }
     }*/

    render() {

        return (
            <div>
                <button type="button" onClick={this.liked}>Like</button>
                <button type="button" onClick={this.disliked}>Dislike</button>
                <p>{this.state.status}</p>
            </div>
        );
    }
}

const mapDispatchToProps = {
    addLikesAction,
    addDislikesAction
};

export default connect(null, mapDispatchToProps)(Likes);
