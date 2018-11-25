import React from 'react';
import axios from 'axios';
//Idea create an array with each recipe id assigned to 0. change to -1 for dislike and 1 for like
//use axios based on each value in this array[recipeId:value]
class Likes extends React.Component {

  constructor(props){

    super(props);
    this.state = {
      likes: 0,
      //updated: false
      status: ""
    };

  }
 liked =() =>
 {
     this.setState((prevState,props)=>
     {
         return{
            likes: 1,
            status: "Liked"

         };            
         
     });
     axios.get(`http://localhost:5000/addLike?recipeId=${this.props.recipeid}&userId=${this.props.userid}`)
             .then(res => {
               // console.log("sucess in disliking")
             // Either this gets super huge or recipes is always empty so no need to concat
             //var newData = this.state.recipes.concat([res.data])
             //this.setState({recipes: newData});
         })
 }
 disliked =() =>
 {
     this.setState((prevState,props)=>
     {
         return{
             likes: -1,
             status: "Disliked"
         };
        
     }) 
     axios.get(`http://localhost:5000/addDislike?recipeId=${this.props.recipeid}&userId=${this.props.userid}`)
         .then(res => {
             //console.log("sucess in disliking")
         // Either this gets super huge or recipes is always empty so no need to concat
         //var newData = this.state.recipes.concat([res.data])
         //this.setState({recipes: newData});
     });
 }
 /*updateLikes = () => {

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
  }*/

  render(){

    return(
      <div>
        <button type="button" onClick={this.liked}>Like</button>
        <button type="button" onClick={this.disliked}>Dislike</button>
        <p>{this.state.status}</p>
      </div>
    );
  }
}

export default Likes;