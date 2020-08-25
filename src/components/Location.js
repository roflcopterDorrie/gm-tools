import React from "react";
import ContentEditable from "./ContentEditable";
import LocationList from './LocationList.js';

class Location extends React.PureComponent {

  constructor(props) {
    super(props);
    this.locations = JSON.parse(localStorage.getItem('locations'));
  };

  change = (value, name) => {
    this.locations[this.props.id][name] = value;
    localStorage.setItem('locations', JSON.stringify(this.locations));
  };

  render() {
    let location = this.locations[this.props.id];

    if (location !== null) {
      return (
        <section style={this.props.style} className={["card", this.props.className].join(' ')} key={this.props.key} data-grid={this.props.dataGrid}>
          <div className="card-header">
            <span className="card__type"><i className="fas fa-globe-americas"></i> Location</span>
          </div>
          <div className="card-body">
            <ContentEditable tag="h2" onChange={this.change} name="name" content={location.name} placeholder="Name" className="card-title"/>
            <ContentEditable tag="p" onChange={this.change} name="description" content={location.description} placeholder="Description" />
            <LocationList parentId={this.props.id} add={this.props.add}/>
          </div>
          {this.props.children}
        </section>
      );
    } else {
      return <div>Something went wrong.</div>;
    }

  }
}

export default Location;
