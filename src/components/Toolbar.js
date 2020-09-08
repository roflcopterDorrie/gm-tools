import React from "react";

class Toolbar extends React.PureComponent {

  render() {

    return <section className="toolbar">
      <span className="title"><i className="fas fa-fw fa-toolbox"></i></span>
      <button className="icon" onClick={() => this.props.showCard('Search')}><i className="fas fa-fw fa-search"></i></button>
      <button className="icon" onClick={() => this.props.newCard('Location', null)}><i className="fas fa-fw fa-globe-americas"></i></button>
      <button className="icon" onClick={() => this.props.newCard('Character', null)}><i className="fas fa-fw fa-user-alt"></i></button>
      <button className="icon" onClick={() => this.props.newCard('Quest', null)}><i className="fas fa-fw fa-scroll"></i></button>
      <button className="icon" onClick={() => this.props.newCard('Encounter', null)}><i className="fas fa-fw fa-skull-crossbones"></i></button>
      <button className="icon" onClick={() => this.props.showCard('PlayerStats', null)}><i className="fas fa-fw fa-users"></i></button>
      <button className="icon" onClick={() => this.props.showCard('Timeline', null)}><i className="fas fa-fw fa-clock"></i></button>
    </section>;
  }
}

export default Toolbar;