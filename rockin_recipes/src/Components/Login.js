import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class Login extends Component {
renderEmailField(field){
    return(
        <div className="form-group">
            <label style ={{paddingRight: '10px'}}>Login with Email</label>
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
    console.log(values);

}
    render () {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                name= "email"
                component={this.renderEmailField}
                />
            <button type='submit' className ="btn btn-primary">Login</button>
            </form>

        )
    }
}
function validate(values) {
    const errors = {};
    if(!values.email)
    {
        errors.email = 'Please enter an email';
    }

    return errors;
}
export default reduxForm({
    validate,
    form: 'Login'
})(Login);
