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

    onSubmit(values){
        this.setState({recipes: []});
        axios.get(`http://localhost:5000/getRecommendations?recipeId=${values.RecipeID}`)
            .then(res => {
            this.setState({recommendations: res.data})
            for ( var i = 0; i < 10; i++){
                axios.get(`http://localhost:5000/getRecipe?recipeId=${this.state.recommendations[i]}`)
                    .then(res => {
                    // Either this gets super huge or recipes is always empty so no need to concat
                    var newData = this.state.recipes.concat([res.data])
                    this.setState({recipes: newData});
                })
            }
        })
    }

    handleChange(event) {
        this.setState({recipeId: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        var recommendationsList = [];
        axios.get(`http://localhost:5000/getRecommendations?recipeId=${this.state.recipeId}`)
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

function validate(values) {
    const errors = {};
    if(values.recipeID > 1000 || values.recipeID < 0) {
        errors.recipeID = "Please enter a recipe between 1 and 1000";
    }
    return errors;
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
