import React, {Component} from 'react';
import {Field, reduxForm, values} from 'redux-form';
import axios from 'axios';

class Recipe extends Component {
renderRecipeIDField(field){
    return(
        <div className="form-group">
            <label style ={{paddingRight: '10px'}}>Enter Recipe Number</label>
            <input
            className ="form-countrol"
            type="text"
            {...field.input}
            />
            {field.meta.touched ? field.meta.error: ''}
        </div>
    )
}
onSubmit(values){
    console.log(values.RecipeID)
    var recipes = [];
    axios.get(`http://localhost:5000/getRecommendations?recipeId=${values.RecipeID}`)
        .then(res => {
          recipes = res.data;
          for ( var i = 0; i < recipes.length; i++){
            axios.get(`http://localhost:5000/getRecipe?recipeId=${i}`)
            .then(ans => {
                return(
                    <div>
                        <img src={require(ans.data.image)} alt="product" />
                    </div>
                )      
            })
        }
    })
}

    render () {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                name= "RecipeID"
                component={this.renderRecipeIDField}
                />
            <button type='submit' className ="btn btn-primary">Login</button>
            </form>
            
        )
    }
}
function validate(values) {
    const errors = {};
    if(values.recipeID > 1000 || values.recipeID < 0)
    {
        errors.recipeID = 'Please enter a recipe between 1 and 1000';
    }

    return errors;
}
export default reduxForm({
    validate,
    form: 'RecipeID'
})(Recipe);