import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Redirect } from "react-router-dom";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      await auth.login(this.state.data);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {}
  };

  render() {
    if (auth.getCurrentUser().name) return <Redirect to="/" />;

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
