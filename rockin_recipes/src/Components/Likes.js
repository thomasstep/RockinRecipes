import React from 'react';
//Idea create an array with each recipe id assigned to 0. change to -1 for dislike and 1 for like
//use axios based on each value in this array[recipeId:value]
class Likes extends React.Component {

  constructor(props){

    super(props);
    this.state = {
      likes: 0,
      updated: false
    };

  }

  updateLikes = () => {

    if(!this.state.updated) {
      this.setState((prevState, props) => {
        return {
          likes: prevState.likes + 1,
          updated: true
        };
      });

    } else {

      this.setState((prevState, props) => {
        return {
          likes: prevState.likes - 1,
          updated: false
        };
      });

    }
  }

  render(){

    return(
      <div>
        <p onClick={this.updateLikes}>Like</p>
        <p>{this.state.likes}</p>
      </div>
    );
  }
}

export default Likes;