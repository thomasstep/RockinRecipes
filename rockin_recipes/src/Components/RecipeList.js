import React, {Component} from 'react';
import { connect } from "react-redux";

class RecipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: [],
            dislikes: [],
            recommendations: []
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {this.forceUpdate()}, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const displayStyle = {
            style: "center"
        };
        const likes = this.props.likes.map(e => (
            <React.Fragment>
                <h3 style={displayStyle}>{e.name}</h3>
                <a href={e.url}><img style={displayStyle} src={e.image} alt="img"></img></a>
                <p style={displayStyle}>{listIngredients(e)}</p>
            </React.Fragment>
        ));
        const dislikes = this.props.dislikes.map(e => (
            <React.Fragment>
                <h3 style={displayStyle}>{e.name}</h3>
                <a href={e.url}><img style={displayStyle} src={e.image} alt="img"></img></a>
                <p style={displayStyle}>{listIngredients(e)}</p>
            </React.Fragment>
        ));
        const recommendations = this.props.recommendations.map(e => (
            <React.Fragment>
                <h3 style={displayStyle}>{e.name}</h3>
                <a href={e.url}><img style={displayStyle} src={e.image} alt="img"></img></a>
                <p style={displayStyle}>{listIngredients(e)}</p>
            </React.Fragment>
        ));
        return (
            <div>
                {this.props.user === "" ? <h2>Please log in</h2> : <h2>Logged in as {this.props.user}</h2>}
                {this.props.recommendations.length === 0 ? <h2></h2> : <h2>Recommendations</h2>}
                {recommendations}
                {this.props.likes.length === 0 ? <h2></h2> : <h2>Likes</h2>}
                {likes}
                {this.props.dislikes.length === 0 ? <h2></h2> : <h2>Dislikes</h2>}
                {dislikes}
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
