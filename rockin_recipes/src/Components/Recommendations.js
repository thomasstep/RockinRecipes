import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
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
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSelectSubmit = this.handleSelectSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ recipeId: event.target.value });
    }

    handleSelectChange(event) {
        this.setState({ foodSelection: event.target.value });
    }

    handleSearchChange(event) {
        this.setState({foodType: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        var recommendationsList = [];
        axios.get(`http://localhost:5000/getRecipe?recipeId=${this.state.recipeId}`)
            .then(res => {
                recommendationsList.push(res.data);
        });
        axios.get(`http://localhost:5000/getIdRecommendations?recipeId=${this.state.recipeId}&userId=${this.props.user}`)
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
        if(this.state.foodSelection !== ""){
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

    handleSearchSubmit(event) {
        event.preventDefault();
        var foodRecommendationsList = [];
        axios.get(`http://localhost:5000/getSearchResults?query=${this.state.foodType}`)
            .then(res => {
                var recommendations = res.data;
                for ( var i = 0; i < 10; i++){
                    axios.get(`http://localhost:5000/getRecipe?recipeId=${recommendations[i]}`)
                        .then(res => {
                            foodRecommendationsList.push(res.data);
                    });
                }
                this.props.addRecommendationsAction(foodRecommendationsList);
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    Please enter a recipe ID&nbsp;
                    <input type="text" value={this.state.recipeId} onChange={this.handleChange}></input><br />
                    <input type="submit" value="Get Recommendations"></input><br />
                </form>
                <div style={{paddingTop: '15px', paddingBottom: '15px'}}>
                <form onSubmit={this.handleSelectSubmit}>
                    <label>
                        Pick your Food Genre:
                        <select value={this.state.foodSelection} onChange={this.handleSelectChange}>
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
                <form onSubmit={this.handleSearchSubmit}>
                    Please enter a food&nbsp;
                    <input type="text" value={this.state.foodType} onChange={this.handleSearchChange}></input><br/>
                    <input type="submit" value="Get Food Recomendations"></input><br/>
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
