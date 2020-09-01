import React from "react";

class EncounterMap extends React.Component {

  constructor(props) {
    super(props);
    let data = this.props.getData('Encounter', this.props.id);
    if (!data.grid) {
      data.grid = {size: 130, items: [], mapWidth: 2000};
    }
    this.state = {
      data: data
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    document.body.classList.add('encounter-map')
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    if (!this.state.data.grid.items.length) {
      let cols = [];
      for (let i=0; i<window.innerWidth; i+=this.state.data.grid.size) {
        cols.push(<div className="encounter-grid__item" style={{width: this.state.data.grid.size + 'px', height: this.state.data.grid.size + 'px'}}></div>);
      }
      let rows = [];
      for (let i=0; i<window.innerHeight; i+=this.state.data.grid.size) {
        rows.push(<div className="encounter-grid__row">{cols}</div>);
      }

      let stateCopy = JSON.parse(JSON.stringify(this.state));
      stateCopy.data.grid.items = rows;
      this.setState(stateCopy);
    }
  }

  render() {
    return (
      <div
        className="encounter-grid"
        style={{
          backgroundImage: 'url('+this.state.data.map+')',
          backgroundSize: this.state.data.grid.mapWidth + 'px'
        }}
      >
        {this.state.data.grid.items}
      </div>
    )
  }
}

export default EncounterMap;