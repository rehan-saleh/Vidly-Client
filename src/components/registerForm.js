import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/userService";
import { toast } from "react-toastify";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),

    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),

    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    try {
      localStorage.clear();
      await auth.register(this.state.data);

      window.location = "/";

      toast.info("User registered successfully");
    } catch (ex) {}
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("username", "Username", "username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("Register")}
      </form>
    );
  }
}

export default RegisterForm;
