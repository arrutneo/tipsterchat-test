import React, {Fragment } from "react";

class Select extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  onChange = e => {
    this.setState({
      value: e.currentTarget.value
    }, () => this.props.onChange && this.props.onChange(this.state.value)
  )};

  render() {
    const {onChange} = this;
    return (
      <Fragment>
        <label>{this.props.label}</label>
        <select
          class="form-control"
          onChange={onChange}
          name={this.props.name}
          value={this.state.value}
        >
          {this.props.options && this.props.options.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </Fragment>
    );
  }
}

export default Select;
