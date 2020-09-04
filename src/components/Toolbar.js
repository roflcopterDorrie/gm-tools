import React from "react";

class Toolbar extends React.PureComponent {

  render() {

    return <section className="toolbar">
      <button onClick={() => this.props.showCard('Search')}><i className="fas fa-fw fa-search"></i></button>
      <button onClick={() => this.props.newCard('Location', null)}><i className="fas fa-fw fa-globe-americas"></i></button>
      <button onClick={() => this.props.newCard('Character', null)}><i className="fas fa-fw fa-user-alt"></i></button>
      <button onClick={() => this.props.newCard('Quest', null)}><i className="fas fa-fw fa-scroll"></i></button>
      <button onClick={() => this.props.newCard('Encounter', null)}><i className="fas fa-fw fa-skull-crossbones"></i></button>
      <button onClick={() => this.props.showCard('PlayerStats', null)}><i className="fas fa-fw fa-users"></i></button>
    </section>;
  }
}

export default Toolbar;