import React, {Component} from 'react';
import { connect } from "react-redux";

class RecipeList extends Component {
    render() {
        return (
            <div>
                {this.props.user.username}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, null)(RecipeList)
