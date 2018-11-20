import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import axios from 'axios';


class Recipe extends Component {
    constructor() {
        super();
        this.state = {
             recipes: []
        }
    }

    renderRecipeIDField(field) {
        return(
            <div className="form-group">
                <label style ={{paddingRight: '10px'}}>Enter Recipe ID</label>
                <input
                    className ="form-control"
                    type="text"
                    {...field.input}
                />
                {field.meta.touched ? field.meta.error: ''}
                </div>
        )
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

    render() {
        const {handleSubmit} = this.props;
        const displayStyle = {
            style: "center"
        }
        const recipes = this.state.recipes.map(e => (
            <React.Fragment>
                <h3 style={displayStyle}>{e.name}</h3>
                <a href={e.url}><img style={displayStyle} src={e.image} alt="img"></img></a>
                <p style={displayStyle}>{listIngredients(e)}</p>
            </React.Fragment>
        ));
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        name="RecipeID"
                        component={this.renderRecipeIDField}
                    />
                    <button type="submit" className ="btn btn-primary">Get Recommendations</button>
                    {this.state.recipes.length > 0 ? <h2>Click on a recipe's picture for more information.</h2> : <h2></h2>}
                </form>
                <div>
                    {recipes}
                </div>
            </div>
        )
    }
}

function listIngredients(recipe) {
    let ingredients = "";
    for (var i = 0; i < recipe.ingredients.length; i++) {
        ingredients += i + 1
        ingredients += ": "
        ingredients += recipe.ingredients[i].text;
        ingredients += " ";
    }
    return ingredients;
}

function validate(values) {
    const errors = {};
    if(values.recipeID > 1000 || values.recipeID < 0) {
        errors.recipeID = "Please enter a recipe between 1 and 1000";
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'RecipeID'
})(Recipe);
