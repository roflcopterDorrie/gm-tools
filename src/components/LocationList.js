import React from "react";

class LocationList extends React.PureComponent {

  render() {

    const filteredLocations = this.props.locations.reduce((accumulator, location, delta) => {
      if (location.parentId === this.props.parentId) {
        accumulator.push(<li key={delta}>
          <span className="card-minor-minor">{location.type}</span>
          <i className="fas fa-globe-americas"></i>&nbsp;
          <button
            className="link"
            onClick={() => this.props.showCard('Location', location.id)}>
              {location.name}
          </button>
        </li>);
      }
      return accumulator;
    }, []);

    // If some locations are found, show them.
    if (filteredLocations.length) {
      return (
        <div>
          <h3>Locations</h3>
          <ul className="link-list">
            {filteredLocations}
          </ul>
        </div>
      );
    } else {
      return '';
    }
  }
}

export default LocationList;
