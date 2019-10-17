import React from 'react';

class InputText extends React.Component {
  render() {
    return (
        <label>
          {this.props.label}
          <input type="text" value={this.props.value} placeholder="" readOnly/>
        </label>
    );
  }
}

export default InputText;
