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
          <button className="icon" onClick={() => this.props.newCard('Location', this.props.data.id, this.componentName)}><i className="fas fa-fw fa-globe-americas"></i></button>
        );
      } else if (tools[type] === 'add-character') {
        toolbar.push(
          <button className="icon" onClick={() => this.props.newCard('Character', this.props.data.id, this.componentName)}><i className="fas fa-fw fa-user-alt"></i></button>
        );
      } else if (tools[type] === 'add-encounter') {
        toolbar.push(
          <button className="icon" onClick={() => this.props.newCard('Encounter', this.props.data.id, this.componentName)}><i className="fas fa-fw fa-skull-crossbones"></i></button>
        );
      } else if (tools[type] === 'delete') {
        toolbar.push(
          <button className="icon" onClick={() => this.props.deleteCard(this.componentName, this.props.data.id)}><i className="fas fa-fw fa-trash-alt"></i></button>
        );
      } else if (tools[type] === 'encounter-map') {
        if (this.props.data.map) {
          toolbar.push(
            <button className="icon" onClick={() => window.open('/encounter-map/' + this.props.data.id)}><i className="fas fa-fw fa-map"></i></button>
          );
        }
      } else if (tools[type] === 'encounter-tracker') {
        toolbar.push(
          <button className="icon" onClick={() => window.open('/encounter-tracker/' + this.props.data.id)}><i className="fas fa-fw fa-skull-crossbones"></i></button>
        );
      } else if (tools[type] === 'add-player-stat') {
        toolbar.push(
          <button className="icon" onClick={(e) => this.props.addData('PlayerStat')}><i className="fas fa-fw fa-plus"></i></button>
        );
      } else if (tools[type] === 'event-camp') {
        toolbar.push(
          <button className="icon" onClick={(e) => this.addEvent('camp')}><i className="fas fa-fw fa-campground"></i></button>
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