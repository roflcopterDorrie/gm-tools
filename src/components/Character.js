import React from "react";
import Card from "components/Card";
import ContentEditable from "components/ContentEditable";

class Character extends Card {

  render() {
    return (
      <section className="card">
        <div className="card-header">
          <span className="card__type"><i className="fas fa-user-alt"></i> Character</span>
        </div>
        <div className="card-body">
          <ContentEditable
            tag="h2"
            onBlur={this.updateData}
            name="name"
            content={this.props.data.name}
            placeholder="Name"
            className="card-title"
          />
          <ContentEditable
            tag="p"
            onBlur={this.updateData}
            name="description"
            content={this.props.data.description}
            placeholder="Description"
          />
        </div>
      </section>
    );

  }
}

export default Character;
