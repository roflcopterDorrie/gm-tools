import React from "react";

class EncounterList extends React.PureComponent {

  render() {

    const filtered = this.props.encounters.reduce((accumulator, encounter, delta) => {
      if (encounter.parentId === this.props.parentId) {
        accumulator.push(<li key={delta}>
          <span className="card-minor-minor">{encounter.type}</span>
          <i className="fas fa-skull-crossbones"></i>&nbsp;
          <button
            className="link"
            onClick={() => this.props.showCard('Encounter', encounter.id)}>
              {encounter.name}
          </button>
        </li>);
      }
      return accumulator;
    }, []);

    // If some locations are found, show them.
    if (filtered.length) {
      return (
        <div>
          <h3>Encounters</h3>
          <ul className="link-list">
            {filtered}
          </ul>
        </div>
      );
    } else {
      return '';
    }
  }
}

export default EncounterList;
