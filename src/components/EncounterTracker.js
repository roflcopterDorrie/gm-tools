import React from "react";

class EncounterTracker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: this.props.getData('Encounter', this.props.id)};
    document.body.classList.add('encounter-tracker');
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default EncounterTracker;
