import React from "react";

import './inputbox.css'

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
   		type: props.type,
      active: (props.locked && props.active) || false,
      value: props.value || "",
      error: props.error || "",
      label: props.label || "Label",
      id: props.id || "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // Lifting state up from parents methods
  // which should be passed through props
  handleChange(e){
  	const value = e.target.value;
  	this.props.onValueChange(value);
    this.setState({ value, error: "" });
  }
  
  changeValue(event) {
    const value = event.target.value;
    this.setState({ value, error: "" });
  }

  handleKeyPress(event) {
    if (event.which === 13) {
      this.setState({ value: this.props.predicted });
    }
  }

  render() {

   	// Make parent component the single source of thruth
   	const value = this.props.value;

    const { type, active, error, label, id } = this.state;
    const { predicted, locked } = this.props;
    const fieldClassName = `${this.props.class} field ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"}`;

    return (
      <div className={fieldClassName} style={this.props.style}>
        {active &&
          value &&
          predicted &&
          predicted.includes(value) && <p className="predicted">{predicted}</p>}
        <input
          id={id}
          type={type}
          value={value}
          placeholder={label}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
        />
        <label htmlFor={1} className={error && "error"}>
          {error || label}
        </label>
      </div>
    );
  }
}
