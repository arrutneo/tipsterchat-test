import React from 'react';

class Select extends React.Component {

  onChange = e => {
    this.setState({
      value: e.currentTarget.value
    }, () => this.props.onChange && this.props.onChange(this.state.value)
  )};

  render() {
    const {onChange} = this;
    return (
      <label>
        {this.props.label}
        <select onChange={onChange}>
          {this.props.value && this.props.value.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
    );
  }
}

export default Select;
