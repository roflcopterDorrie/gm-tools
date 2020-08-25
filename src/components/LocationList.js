import React from "react";

class LocationList extends React.PureComponent {

  render() {
    // Get locations data from local storage.
    const locations = JSON.parse(localStorage.getItem('locations'));

    // Filter the list of locations based on parentId.
    // If parentId is not defined, return the top level locations.
    const parentId = this.props.parentId;
    const filteredLocations = Object.keys(locations).reduce(function(r, e) {
      if (locations[e].parentId === parentId) {
        r[e] = locations[e];
      }
      return r;
    }, {});

    // Create a list of the locations that can be clicked to open details about it.
    const locationsList = Object.keys(filteredLocations).map(id =>
      <li key={id}>
        <span className="fa-li"><i className="fas fa-globe-americas"></i></span>
        <button
          className="location"
          onClick={() => this.props.add('Location', id)}>
            {filteredLocations[id].name}
        </button>
      </li>
    );

    // If some locations are found, show them.
    if (locationsList.length) {
      return (
        <div>
          <p className="locations__title">Locations</p>
          <ul className="button-list fa-ul">{locationsList}</ul>
        </div>
      );
    }

    // If not return nothing.
    return '';

  }
}

export default LocationList;
