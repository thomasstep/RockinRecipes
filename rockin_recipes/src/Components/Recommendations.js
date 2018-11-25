import React, {Component} from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { addRecommendationsAction } from "../redux/actions.js"

class Recommendations extends Component {
    constructor() {
        super();
        this.state = {
            recipes: [],
            recipeId: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({recipeId: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        var recommendationsList = [];
        axios.get(`http://localhost:5000/getRecipe?recipeId=${this.state.recipeId}`)
            .then(res => {
                recommendationsList.push(res.data);
        });
        axios.get(`http://localhost:5000/getIdRecommendations?recipeId=${this.state.recipeId}&userId={this.props.user}]`)
            .then(res => {
                var recommendations = res.data;
                for ( var i = 0; i < 10; i++){
                    axios.get(`http://localhost:5000/getRecipe?recipeId=${recommendations[i]}`)
                        .then(res => {
                            recommendationsList.push(res.data);
                    });
                }
                this.props.addRecommendationsAction(recommendationsList);
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    Please enter a recipe ID&nbsp;
                    <input type="text" value={this.state.recipeId} onChange={this.handleChange}></input><br/>
                    <input type="submit" value="Get Recommendations"></input><br/>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    addRecommendationsAction
};

const mapStateToProps = state => {
    return {
        user: state.user,
        recipeList: state.recipeList
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations)
