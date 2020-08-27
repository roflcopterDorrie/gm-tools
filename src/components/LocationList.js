import React from "react";

class LocationList extends React.PureComponent {

  render() {

    const filteredLocations = this.props.locations.reduce((accumulator, location, delta) => {
      if (location.parentId === this.props.parentId) {
        accumulator.push(<li key={delta}>
          <span className="fa-li"><i className="fas fa-globe-americas"></i></span>
          <button
            className="location"
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
          <h2 className="locations__title">Locations</h2>
          <ul className="button-list fa-ul">
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
