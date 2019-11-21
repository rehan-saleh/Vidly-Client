import React from "react";

const Input = ({ label, name, error, ...rest }) => {
  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
};

export default Input;
