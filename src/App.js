import React, { Component } from "react";
import "./App.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      password: null,
      passwordConfirm: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        passwordConfirm: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if(formValid(this.state.formErrors)){
      console.log(`
      --SUBMITING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        User Name: ${this.state.username}
        Password: ${this.state.password}
        Confirm password: ${this.state.passwordConfirm}
      `)
    } else{
      console.error('Invalid form - DISPLAY ERROR MESSAGE');
    }
  };

  
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
     
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 2 ? "minimum 2 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 2 ? "minimum 2 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "username":
        formErrors.username =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "passwordConfirm":
        formErrors.passwordConfirm =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (<div className="wrapper">
      <div className="form-wrapper">
        <h1>Create Account</h1>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="firstName">
            <label htmlFor="firstName">First Name</label>
            <input type="text" className="" placeholder="First Name" type="text" name="firstName" noValidate onChange={this.handleChange} />
            {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
          </div>
          <div className="lastName">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" className="" placeholder="Last Name" type="text" name="lastName" noValidate onChange={this.handleChange} />
            {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
          </div>
          <div className="email">
            <label htmlFor="email">E-mail</label>
            <input type="email" className="" placeholder="E-mail" type="text" name="email" noValidate onChange={this.handleChange} />
            {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
          </div>
          <div className="username">
            <label htmlFor="username">Username</label>
            <input type="text" className="" placeholder="Username" type="text" name="username" noValidate onChange={this.handleChange} />
            {formErrors.username.length > 0 && (
                <span className="errorMessage">{formErrors.username}</span>
              )}
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input type="password" className="" placeholder="Password" type="text" name="password" noValidate onChange={this.handleChange} />
            {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
          </div>
          <div className="passwordConfirm">
            <label htmlFor="passwordConfirm">Confirm password</label>
            <input type="password" className="" placeholder="Confirm password" type="text" name="passwordConfirm" noValidate onChange={this.handleChange} />
            {formErrors.passwordConfirm.length > 0 && (
                <span className="errorMessage">{formErrors.passwordConfirm}</span>
              )}
          </div>

          <div className="createAccount">
            <button type="submit">Create Account</button>
            <small>Already have an Account</small>
          </div>
        </form>
      </div>
    </div>
    );
  }
}

export default App;
