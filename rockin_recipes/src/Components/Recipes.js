import React, {Component} from 'react';
import {Field, reduxForm, values} from 'redux-form';
import axios from 'axios';

class Recipe extends Component {
    constructor()
    {
    super();
    this.state = {
        recipe: [
            {
                recipeName: '',
                recipeIngredients: {},
                recipeImage: '',
            }
        ]

      }
    }
    

renderRecipeIDField(field) {
    return(
        <div className="form-group">
            <label style ={{paddingRight: '10px'}}>Enter Recipe Number</label>
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
    console.log('hello');
    axios.get(`http://localhost:5000/getRecommendations?recipeId=${values.RecipeID}`)
        .then(res => {
          //recipeID = res.data;
          this.setState({recipeID: res.data})
          for ( var i = 0; i < this.state.recipeID.length; i++){
            axios.get(`http://localhost:5000/getRecipe?recipeId=${i}`)
            .then(res => {
                this.setState({recipeName: res.data.name})
                this.setState({recipeIngredients: res.data.ingredients})
                this.setState({recipeImage: res.data.image})
                console.log(this.state);
              })
            }
        })
    }


    render () {
        const {handleSubmit} = this.props;
        return (
            <div>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                name= "RecipeID"
                component={this.renderRecipeIDField}
                />
            <button type='submit' className ="btn btn-primary">Login</button>
            </form>
            {/* <ul>
                {
                    this.state.recipe.map((dynamic,i) =>
                    <div>
                        <li key={dynamic.recipeName}> {dynamic.recipeName}</li>)}
                        { <p>{dynamic.recipeIngredients}</p> }
                    </div>
                    )
                }
            </ul> */}
            </div>
            
    
            
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