import React from "react";

const FormField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  floating = false,
  labelIcon = null,
}) => {
  if (floating) {
    return (
      <div className="form-floating mb-3">
        <input
          type={type}
          id={id}
          className="form-control form-control-lg auth-input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <label htmlFor={id}>
          {labelIcon && <i className={`bi bi-${labelIcon} me-1`}></i>}
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-bold text-charcoal">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="form-control form-control-lg auth-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormField;