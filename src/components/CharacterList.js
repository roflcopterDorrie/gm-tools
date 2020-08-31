import React from "react";

class CharacterList extends React.PureComponent {

  render() {

    const filtered = this.props.characters.reduce((accumulator, character, delta) => {
      if (character.parentId === this.props.parentId && character.parentType === this.props.parentType) {
        accumulator.push(<li key={delta}>
          <span className="card-minor-minor">{character.role}</span>
          <i className="fas fa-user-alt"></i>&nbsp;
          <button
            className="link"
            onClick={() => this.props.showCard('Character', character.id)}>
              {character.name}
          </button>
        </li>);
      }
      return accumulator;
    }, []);

    // If some locations are found, show them.
    if (filtered.length) {
      return (
        <div>
          <h3>Characters</h3>
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

export default CharacterList;
