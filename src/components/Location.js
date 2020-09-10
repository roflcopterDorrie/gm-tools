import React from "react";
import Card from "components/Card";
import ContentEditable from "components/ContentEditable";
import LocationList from 'components/LocationList.js';
import CharacterList from 'components/CharacterList.js';
import InteractionList from "components/InteractionList";

class Location extends Card {

  constructor(props) {
    super(props);
    this.componentName = 'Location';
    this.state = {mapInput: false};
  }

  changeMap = () => {
    this.setState({mapInput: !this.state.mapInput});
  }

  render() {

    let parentLocation = '';

    if (this.props.data) {
      const parentLocationData = this.props.getData('Location', this.props.data.parentId);

      if (parentLocationData) {
        parentLocation = <span class="card-minor" style={{float: 'right'}}>
          <i className="fas fa-globe-americas"></i>
          &nbsp;
          <button
            className="link"
            onClick={() => this.props.showCard('Location', parentLocationData.id)}>
              {parentLocationData.name}
          </button>
        </span>
      }
    }

    let mapPreview = this.props.data.map ? <button className="link" onClick={(e) => this.props.open('image', 'Location', this.props.data.id, 'map')}><img src={this.props.data.map} className="map-preview"/></button> : '';

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
          {mapPreview}
          <div>
            <button className="link" onClick={this.changeMap}>
              <i className="fas fa-map"></i> Map
            </button>
            <ContentEditable
              tag="p"
              onBlur={this.updateData}
              name="map"
              content={this.props.data.map || ''}
              placeholder="Image URL"
              className={["single-line", !this.state.mapInput ? 'hidden' : '']}
            />
          </div>
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
          <InteractionList
            parentId={this.props.data.id}
            parentType={this.componentName}
            updateData={this.props.updateData}
            deleteData={this.props.deleteData}
            addData={this.props.addData}
            allData={this.props.allData}
            addEvent={this.props.addEvent}
          />
        </div>
        <div className="card-footer">
          {this.toolbar(['add-location', 'add-character', 'add-encounter', 'event-location-arrive', 'delete'])}
        </div>
      </section>
    );

  }
}

export default Location;
