import React, { Fragment } from "react";

class InputText extends React.Component {
  render() {
    return (
      <Fragment>
        <label>{this.props.label}</label>
        <input
          type="text"
          className="form-control"
          value={this.props.value}
          placeholder=""
          readOnly
          name={this.props.name}
        />
      </Fragment>
    );
  }
}

export default InputText;
