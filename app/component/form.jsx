import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import ErrorMessage from './errorMessage.jsx'
import Label from './label.jsx'

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            nickName: '',
            age: '',
            email: '',
            formErrors: { name: '', age: '', email: '' },
            nameValid: false,
            ageValid: false,
            emailValid: false,
            formValid: false
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            nickName: '',
            age: '',
            email: '',
            formErrors: { name: '', email: '', age: '' },
            nameValid: false,
            ageValid: false,
            emailValid: false,
            formValid: false
        });
    };

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let ageValid = this.state.ageValid;
        let emailValid = this.state.emailValid;
        let emailPattern = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

        switch (fieldName) {
            case 'nickName':
                nameValid = value.length >= 2;
                fieldValidationErrors.name = nameValid ? '' : 'name is too short (min. 2 signs)';
                break;
            case 'age':
                ageValid = value >= 18;
                fieldValidationErrors.age = ageValid ? '' : 'minimal age is 18';
                break;
            case 'email':
                emailValid = emailPattern.test(value);
                fieldValidationErrors.email = emailValid ? '' : 'incorrect email address format';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            nameValid: nameValid,
            ageValid: ageValid,
            emailValid: emailValid
        }, this.validateForm);
    }

    validateForm = () => {
        this.setState({ formValid: this.state.nameValid && this.state.ageValid && this.state.emailValid });
    }

    render() {
        return (
            <form className="registrationForm" onSubmit={this.handleSubmit}>
                <Label htmlFor='nickName' value='Nickname:' />
                <input type="text" name="nickName" className="inputField" placeholder="nick" value={this.state.nickName} onChange={this.handleChange}></input>

                <Label htmlFor='age' value='Your age:' />
                <input type="number" name="age" className="inputField" placeholder="age" value={this.state.age} onChange={this.handleChange}></input>
                <Label htmlFor='email' value='Your e-mail address:' />
                <input type="email" name="email" className="inputField" placeholder="email" value={this.state.email} onChange={this.handleChange}></input>
                <button type="submit" disabled={!this.state.formValid} >Sign up</button>
                <ErrorMessage formErrors={this.state.formErrors}></ErrorMessage>
            </form>
        )
    }
}

ReactDOM.render(<Form />, document.getElementById('root'));

export default Form;