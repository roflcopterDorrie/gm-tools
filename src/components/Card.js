import React from "react";

class Card extends React.PureComponent {

  updateData = (id, name, value) => {
    this.props.updateData(this.props.data.id, this.componentName, name, value);
  };

  updateDataLogEvent = (id, name, value) => {
    this.updateData(id, name, value);
    this.logEvent();
  };

  logEvent = () => {
    let logEvent = true;
    for (const index in this.props.allData['events']) {
      if (this.props.allData['events'][index].parentId === this.props.data.id) {
        logEvent = false;
        break;
      }
    }
    if (logEvent) {
      this.props.addEvent(this.props.data.id, this.componentName);
    }
  }

  toolbar = tools => {
    let toolbar = [];
    tools = tools || ['delete'];
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
        toolbar.push(
          <button className="icon" onClick={() => window.open(process.env.PUBLIC_URL + '/encounter-map/' + this.props.data.id)}><i className="fas fa-fw fa-map"></i></button>
        );
      } else if (tools[type] === 'encounter-tracker') {
        toolbar.push(
          <button className="icon" onClick={() => window.open(process.env.PUBLIC_URL + '/encounter-tracker/' + this.props.data.id)}><i className="fas fa-fw fa-skull-crossbones"></i></button>
        );
      } else if (tools[type] === 'add-player-stat') {
        toolbar.push(
          <button className="icon" onClick={(e) => this.props.addData('PlayerStat')}><i className="fas fa-fw fa-plus"></i></button>
        );
      } else if (tools[type] === 'event-rest-long') {
        toolbar.push(
          <button className="icon" onClick={(e) => this.props.addEvent(-1, 'Long rest')}><i className="fas fa-fw fa-campground"></i>L</button>
        );
      } else if (tools[type] === 'event-rest-short') {
        toolbar.push(
          <button className="icon" onClick={(e) => this.props.addEvent(-1, 'Short rest')}><i className="fas fa-fw fa-campground"></i>S</button>
        );
      } else if (tools[type] === 'event-travel') {
        toolbar.push(
          <button className="icon" onClick={(e) => this.props.addEvent(-1, 'Travel')}><i className="fas fa-fw fa-route"></i></button>
        );
      } else if (tools[type] === 'event-location-arrive') {
        toolbar.push(
          <button className="icon" onClick={(e) => this.props.addEvent(this.props.data.id, 'Location')}><i className="fas fa-fw fa-map-marked-alt"></i></button>
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