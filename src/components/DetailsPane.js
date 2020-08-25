import React from "react";
import Location from './Location.js';
import Character from './Character.js';

const components = {
  Location: Location,
  Character: Character
};

class DetailsPane extends React.PureComponent {

  render() {
    const Component = components[this.props.type];
    if (Component !== undefined) {
      return <Component id={this.props.id} open={this.props.open}/>
    }
    return <div>Empty</div>;
  }
}

export default DetailsPane;
