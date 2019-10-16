import React from 'react';

class InputText extends React.Component {
  constructor(props) {
    super(props);
  }

  setValue(value) {
    this.setState({value: value});
  }

  render() {
    return (
        <label>
          {this.props.label}
          <input type="text" value={this.state.value} placeholder="" readonly />
        </label>
    );
  }
}

export default InputText;
