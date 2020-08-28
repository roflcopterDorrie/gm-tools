import React from "react";
import Card from "components/Card";
import ContentEditable from "components/ContentEditable";
import LocationList from 'components/LocationList.js';
import CharacterList from 'components/CharacterList.js';

class Location extends Card {

  constructor(props) {
    super(props);
    this.componentName = 'Location';
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
          <span className="card__type"><i className="fas fa-globe-americas"></i> Location</span>
        </div>
        <div className="card-body">
          <ContentEditable
            tag="span"
            onBlur={this.updateData}
            name="type"
            content={this.props.data.type || ''}
            placeholder="Type"
            className="card-minor"
          />
          {parentLocation}
          <ContentEditable
            tag="h2"
            onBlur={this.updateData}
            name="name"
            content={this.props.data.name || ''}
            placeholder="Name"
            className="card-title"
          />
          <ContentEditable
            tag="p"
            onBlur={this.updateData}
            name="description"
            content={this.props.data.description || ''}
            placeholder="Description"
          />
          <LocationList
            locations={this.props.allData['locations']}
            showCard={this.props.showCard}
            parentId={this.props.data.id}
            parentType="Location"
          />
          <CharacterList
            characters={this.props.allData['characters']}
            showCard={this.props.showCard}
            parentId={this.props.data.id}
            parentType="Location"
          />
        </div>
        <div className="card-footer">
          {this.toolbar()}
        </div>
      </section>
    );

  }
}

export default Location;
