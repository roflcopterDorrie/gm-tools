import React from "react";
import ContentEditable from "./ContentEditable";

class Character extends React.PureComponent {

  constructor(props) {
    super(props);
    this.characters = JSON.parse(localStorage.getItem('characters'));
  };

  change = (value, name) => {
    this.characters[this.props.id][name] = value;
    localStorage.setItem('characters', JSON.stringify(this.characters));
  };

  render() {
    let character = this.characters[this.props.id];

    if (character !== null) {
      return (

        <section style={this.props.style} className={["card", this.props.className].join(' ')} key={this.props.key}>
          <div className="card-header">
            <span className="card__type"><i className="fas fa-user-alt"></i> Character</span>
          </div>
          <div className="card-body">
            <ContentEditable tag="h2" onChange={this.change} name="name" content={character.name} placeholder="Name" className="card-title"/>
            <ContentEditable tag="p" onChange={this.change} name="description" content={character.description} placeholder="Description" />
          </div>
          {this.props.children}
        </section>
      );
    } else {
      return <div>Something went wrong.</div>;
    }

  }
}

export default Character;
