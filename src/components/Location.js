import React from "react";
import Card from "components/Card";
import ContentEditable from "components/ContentEditable";
import LocationList from 'components/LocationList.js';

class Location extends Card {

  render() {
    console.log(this.props.data);
    return (
      <section className="card">
        <div className="card-header">
          <span className="card__type"><i className="fas fa-globe-americas"></i> {this.props.data.name || ''}</span>
        </div>
        <div className="card-body">
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
