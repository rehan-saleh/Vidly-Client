import React from "react";

const Select = ({ name, label, error, options, ...rest }) => {
  options = [{ name: "--Select--" }, ...options];
  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <select name={name} className="form-control" {...rest}>
        {options.map((item, index) => (
          <option key={index} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
};

export default Select;
