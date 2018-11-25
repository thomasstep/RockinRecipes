import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { addRecommendationsAction } from "../redux/actions.js"

class Recommendations extends Component {
    constructor() {
        super();
        this.state = {
            recipes: [],
            recipeId: "",
            foodType: "",
            foodSelection: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSelectSubmit = this.handleSelectSubmit.bind(this);
    }

    onSubmit(values) {
        this.setState({ recipes: [] });
        axios.get(`http://localhost:5000/getRecommendations?recipeId=${values.RecipeID}`)
            .then(res => {
                this.setState({ recommendations: res.data })
                for (var i = 0; i < 10; i++) {
                    axios.get(`http://localhost:5000/getRecipe?recipeId=${this.state.recommendations[i]}`)
                        .then(res => {
                            // Either this gets super huge or recipes is always empty so no need to concat
                            var newData = this.state.recipes.concat([res.data])
                            this.setState({ recipes: newData });
                        })
                }
            })
    }

    handleChange(event) {
        this.setState({ recipeId: event.target.value });
    }

    handleSelectChange(event) {
        this.setState({ foodSelection: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        var recommendationsList = [];
        axios.get(`http://localhost:5000/getRecipe?recipeId=${this.state.recipeId}`)
            .then(res => {
                recommendationsList.push(res.data);
        });
        axios.get(`http://localhost:5000/getIdRecommendations?recipeId=${this.state.recipeId}`)
            .then(res => {
                var recommendations = res.data;
                for (var i = 0; i < 10; i++) {
                    axios.get(`http://localhost:5000/getRecipe?recipeId=${recommendations[i]}`)
                        .then(res => {
                            recommendationsList.push(res.data);
                        });
                }
                this.props.addRecommendationsAction(recommendationsList);
            });
    }

    handleSelectSubmit(event) {
        event.preventDefault();
        var foodRecommendationsList = [];
        if(this.state.foodSelection != ""){
            axios.get(`http://localhost:5000/getSearchResults?query=${this.state.foodSelection}`)
                .then(res => {
                    var recommendations = res.data;
                    for (var i = 0; i < 10; i++) {
                        axios.get(`http://localhost:5000/getRecipe?recipeId=${recommendations[i]}`)
                            .then(res => {
                                foodRecommendationsList.push(res.data);
                            });
                    }
                    this.props.addRecommendationsAction(foodRecommendationsList);
                });
        }
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    Please enter a recipe ID&nbsp;
                    <input type="text" value={this.state.recipeId} onChange={this.handleChange}></input><br />
                    <input type="submit" value="Get Recommendations"></input><br />
                </form>
                <form onSubmit={this.handleSelectSubmit}>
                    <label>
                        Pick your Food Genre:
                        <select value={this.state.foodSelection} onChange={this.handleSelect}>
                            <option value="" selected> -- Select an Option --</option>
                            <option value="American">American</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Italian">Italian</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Beans">Beans</option>
                            <option value="Beef">Beef</option>
                            <option value="Chicken">Chicken</option>
                            <option value="Pork">Pork</option>
                            <option value="Rice">Rice</option>
                            <option value="Tofu">Tofu</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit"></input><br />
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