import React from "react";

class CharacterList extends React.PureComponent {

  render() {
    const characters = JSON.parse(localStorage.getItem('characters'));

    const characterList = Object.keys(characters).map(id =>
      <li key={id}>
        <span class="fa-li"><i class="fas fa-user-alt"></i></span>
        <button
          onClick={() => this.props.open('Character', id)}>
            {characters[id].name}
        </button>
      </li>
    )

    return (
      <div>
        <h2>Characters</h2>
        <ul className="button-list fa-ul">{characterList}</ul>
      </div>
    );

  }
}

export default CharacterList;
