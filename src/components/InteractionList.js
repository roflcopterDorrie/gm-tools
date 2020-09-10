import React from "react";
import ContentEditable from "components/ContentEditable";

class InteractionList extends React.PureComponent {

  updateData = (id, name, value) => {
    this.props.updateData(id, "Interaction", name, value);
    this.logEvent(id);
  };

  logEvent = (id) => {
    let logEvent = true;
    for (const index in this.props.allData['events']) {
      if (this.props.allData['events'][index].parentId === id) {
        logEvent = false;
        break;
      }
    }
    if (logEvent) {
      this.props.addEvent(id, 'Interaction');
    }
  }

  addInteraction = () => {
    this.props.addData("Interaction", this.props.parentId, this.props.parentType);
  }

  deleteInteraction = (id) => {
    this.props.deleteData('Interaction', id);
  }

  render() {

    const filtered = this.props.allData['interactions'].reduce((accumulator, interaction, delta) => {
      if (interaction.parentId === this.props.parentId) {
        accumulator.push(
        <div style={{position: 'relative'}}>
          <ContentEditable
            tag="p"
            onBlur={this.updateData}
            name="name"
            content={interaction.name || ''}
            placeholder="name"
            id={interaction.id}
          />
          <button style={{position: 'absolute', right: 0, top: 0}} className="link" onClick={(e) => {this.deleteInteraction(interaction.id)}}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        );
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
