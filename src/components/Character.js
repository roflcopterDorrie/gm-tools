import React from "react";
import Card from "components/Card";
import InteractionList from "components/InteractionList";
import ContentEditable from "components/ContentEditable";

class Character extends Card {

  constructor(props) {
    super(props);
    this.componentName = 'Character';
  }

  render() {

    const location = this.props.getData('Location', this.props.data.parentId);
    let parentLocation = '';
    if (location) {
      parentLocation = <span class="card-minor" style={{float: 'right'}}>
        <i className="fas fa-globe-americas"></i>
        &nbsp;
        <button
          className="link"
          onClick={() => this.props.showCard('Location', location.id)}>
            {location.name}
        </button>
      </span>
    }

    return (
      <section className="card">
        <div className="card-header">
          <span className="card__type"><i className="fas fa-user-alt"></i> Character</span>
        </div>
        <div className="card-body">

          <ContentEditable
            tag="span"
            onBlur={this.updateData}
            name="role"
            content={this.props.data.role || ''}
            placeholder="Job/role"
            className={["card-minor"]}
          />
          {parentLocation}
          <ContentEditable
            tag="h2"
            onBlur={this.updateData}
            name="name"
            content={this.props.data.name || ''}
            placeholder="Name"
            className={["card-title"]}
          />
          <ContentEditable
            tag="p"
            onBlur={this.updateData}
            name="description"
            content={this.props.data.description || ''}
            placeholder="Description"
          />
          <h3>Motivations</h3>
          <ContentEditable
            tag="p"
            onBlur={this.updateData}
            name="motivations"
            content={this.props.data.motivations || ''}
            placeholder="none"
          />
          <h3>Weaknesses</h3>
          <ContentEditable
            tag="p"
            onBlur={this.updateData}
            name="weaknesses"
            content={this.props.data.weaknesses || ''}
            placeholder="none"
          />
          <InteractionList
            parentId={this.props.data.id}
            parentType={this.componentName}
            updateData={this.props.updateData}
            deleteData={this.props.deleteData}
            addData={this.props.addData}
            allData={this.props.allData}
          />
        </div>
        <div className="card-footer">
          {this.toolbar(['delete'])}
        </div>
      </section>
    );

  }
}

export default Character;
