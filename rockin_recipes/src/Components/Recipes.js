import React, {Component} from 'react';
import {Field, reduxForm, values} from 'redux-form';
import axios from 'axios';


class Recipe extends Component {
    constructor()
    {
    super();
    this.state = {
         rtest: []
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
    this.setState({rtest: []});
    axios.get(`http://localhost:5000/getRecommendations?recipeId=${values.RecipeID}`)
        .then(res => {
          console.log(res.data)
          //recipeID = res.data;
          this.setState({recipeID: res.data})
          for ( var i = 0; i < 10; i++){
            axios.get(`http://localhost:5000/getRecipe?recipeId=${i}`)
            .then(res => {
                console.log(res.data)

                var test=''
                for(var j = 0; j < res.data.ingredients.length; ++j){
                    test=test+" "+(j+1)+": "+res.data.ingredients[j].text
                }
                res.data.ingredients = test
                var newData = this.state.rtest.concat([res.data])
                this.setState({rtest: newData});
                
                console.log(test)

              })
            }
        })
    }
    
    render () {
        //const {recipe} = this.state;
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

                <div>
                    {this.state.rtest.map(e =>(
                        <ul><h3>{e.name}</h3> 
                        <ul><img src={e.image} alt="img" ></img></ul>
                        <ul>{e.ingredients}</ul>
                        </ul>
                        

                    ))}
                </div>
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