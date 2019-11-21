import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = {
      abortEarly: false
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};

    error.details.forEach(e => {
      errors[e.path[0]] = e.message;
    });

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = {
      [name]: value
    };

    const schema = {
      [name]: this.schema[name]
    };

    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors: errors || {} });
  };

  renderButton = label => {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={this.validate()}
      >
        {label ? label : "Submit"}
      </button>
    );
  };

  renderInput = (name, label, type) => {
    const { data, errors } = this.state;

    return (
      <div className="form-group">
        <Input
          type={type}
          label={label}
          name={name}
          value={data[name]}
          error={errors[name]}
          onChange={this.handleChange}
        />
      </div>
    );
  };

  renderSelect = (name, label, items) => {
    const { data, errors } = this.state;

    return (
      <div className="form-group">
        <Select
          options={items}
          label={label}
          name={name}
          value={data[name]}
          error={errors[name]}
          onChange={this.handleChange}
        />
      </div>
    );
  };
}

export default Form;
