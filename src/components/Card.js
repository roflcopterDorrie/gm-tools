import React from "react";

class Card extends React.PureComponent {

  updateData = (id, name, value) => {
    this.props.updateData(this.props.data.id, this.componentName, name, value);
  };

  toolbar = tools => {
    let toolbar = [];
    tools = tools || ['add-location', 'add-character', 'add-encounter', 'delete'];
    for (let type in tools) {
      if (tools[type] === 'add-location') {
        toolbar.push(
          <button onClick={() => this.props.newCard('Location', this.props.data.id, this.componentName)}><i className="fas fa-globe-americas"></i></button>
        );
      } else if (tools[type] === 'add-character') {
        toolbar.push(
          <button onClick={() => this.props.newCard('Character', this.props.data.id, this.componentName)}><i className="fas fa-user-alt"></i></button>
        );
      } else if (tools[type] === 'add-encounter') {
        toolbar.push(
          <button onClick={() => this.props.newCard('Encounter', this.props.data.id, this.componentName)}><i className="fas fa-skull-crossbones"></i></button>
        );
      } else if (tools[type] === 'delete') {
        toolbar.push(
          <button onClick={() => this.props.deleteCard(this.componentName, this.props.data.id)}><i className="fas fa-trash-alt"></i></button>
        );
      } else if (tools[type] === 'encounter-map') {
        if (this.props.data.map) {
          toolbar.push(
            <button onClick={() => window.open('/encounter-map/' + this.props.data.id)}><i className="fas fa-map"></i></button>
          );
        }
      } else if (tools[type] === 'encounter-tracker') {
        toolbar.push(
          <button onClick={() => window.open('/encounter-tracker/' + this.props.data.id)}><i className="fas fa-skull-crossbones"></i></button>
        );
      } else if (tools[type] === 'add-player-stat') {
        toolbar.push(
          <button onClick={(e) => this.props.addData('PlayerStat')}><i className="fas fa-plus"></i></button>
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