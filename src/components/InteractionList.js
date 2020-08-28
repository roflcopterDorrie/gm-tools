import React from "react";
import ContentEditable from "components/ContentEditable";

class InteractionList extends React.PureComponent {

  updateData = (id, name, value) => {
    console.log(id + name + value);
    this.props.updateData(id, "Interaction", name, value);
  };

  addInteraction = () => {
    this.props.addData("Interaction", this.props.parentId, this.props.parentType);
  }

  render() {

    const filtered = this.props.allData['interactions'].reduce((accumulator, interaction, delta) => {
      if (interaction.parentId === this.props.parentId) {
        accumulator.push(<ContentEditable
          tag="p"
          onBlur={this.updateData}
          name="name"
          content={interaction.name || ''}
          placeholder="name"
          id={interaction.id}
        />);
      }
      return accumulator;
    }, []);

    // If some locations are found, show them.
    return (
      <div>
        <h3>Interactions
          <button className="link" onClick={this.addInteraction}>
            <i className="fas fa-user-plus"></i>
          </button>
        </h3>

        {filtered}
      </div>
    );
  }
}

export default InteractionList;
