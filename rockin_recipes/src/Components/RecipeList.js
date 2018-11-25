import React, {Component} from 'react';
import { connect } from "react-redux";
import Likes from "./Likes.js";

class RecipeList extends Component {
    componentDidMount() {
        this.interval = setInterval(() => {this.forceUpdate()}, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const displayStyle = {
            style: "center",
        };
        const likesHeader = {
            fontSize: '35px',
            color: 'blue',
        }
        const dislikesHeader = {
            fontSize: '35px',
            color: 'red',
        }
        const recommendationsHeader = {
            fontSize: '35px',
            color: 'green',
        }
        
        const likes = this.props.likes.map(e => (
            <React.Fragment>
                <h3 style={displayStyle}>{e.name}</h3>
                <h3 style={displayStyle}>Recipe ID: {e.recipeId}</h3>
                <a href={e.url}><img style={displayStyle} src={e.image} alt="img"></img></a>
                <p style={displayStyle}>{listIngredients(e)}</p>
                <Likes>Like</Likes>
            </React.Fragment>
        ));
        const dislikes = this.props.dislikes.map(e => (
            <React.Fragment>
                <h3 style={displayStyle}>{e.name}</h3>
                <h3 style={displayStyle}>Recipe ID: {e.recipeId}</h3>
                <a href={e.url}><img style={displayStyle} src={e.image} alt="img"></img></a>
                <p style={displayStyle}>{listIngredients(e)}</p>
                <Likes></Likes>
            </React.Fragment>
        ));
        const recommendations = this.props.recommendations.map(e => (
            <React.Fragment>
                <h3 style={displayStyle}>{e.name}</h3>
                <img style={displayStyle} src={e.image} alt="img"></img>
                <div> <a href={e.url}>Click Here To Go To Recipe</a> </div>
                <p style={displayStyle}>{listIngredients(e)}</p>
            </React.Fragment>
        ));
        return (
        <div>
            
            <div>
                {this.props.user === "" ? <h2>Please log in</h2> : <h2>Welcome {this.props.user}!</h2>}
                {this.props.recommendations.length === 0 ? <h2></h2> : <h2 style={recommendationsHeader}>These are some recipes we would like to recommend</h2>}
                {recommendations}
                {this.props.likes.length === 0 ? <h2></h2> : <h2 style={likesHeader}>Recipes You've Liked</h2>}
                {likes}
                {this.props.dislikes.length === 0 ? <h2></h2> : <h2 style={dislikesHeader}>Recipes You've Disliked</h2>}
                {dislikes}
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

const mapStateToProps = state => {
    return {
        user: state.user,
        likes: state.recipeList.likes,
        dislikes: state.recipeList.dislikes,
        recommendations: state.recipeList.recommendations
    }
};

export default connect(mapStateToProps, null)(RecipeList)
