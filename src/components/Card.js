import React from "react";

class Card extends React.PureComponent {

  updateData = (name, value) => {
    this.props.updateData(this.props.data.id, 'Location', name, value);
  };

  toolbar = tools => {
    let toolbar = [];
    tools = tools || ['add-location', 'add-character', 'delete'];
    for (let type in tools) {
      if (tools[type] === 'add-location') {
        toolbar.push(
          <button onClick={() => this.props.newCard('Location', this.props.data.id)}><i className="fas fa-globe-americas"></i></button>
        );
      } else if (tools[type] === 'add-character') {
        toolbar.push(
          <button onClick={() => this.props.newCard('Character', this.props.data.id)}><i className="fas fa-user-alt"></i></button>
        );
      } else if (tools[type] === 'delete') {
        toolbar.push(
          <button onClick={() => this.props.deleteCard('Location', this.props.data.id)}><i className="fas fa-trash-alt"></i></button>
        );
      }
    }
    return toolbar;
  };

  render() {
    return <section></section>;
  }
}

export default Card;