import React from "react";
import Card from "components/Card";
import MonsterList from "components/MonsterList";
import ContentEditable from "components/ContentEditable";

class Encounter extends Card {

  constructor(props) {
    super(props);
    this.componentName = 'Encounter';
    this.state = {mapInput: false};
  }

  changeMap = () => {
    this.setState({mapInput: !this.state.mapInput});
  }

  render() {
    let mapPreview = this.props.data.map ? <button className="link" onClick={(e) => this.props.open('image', 'Encounter', this.props.data.id, 'map')}><img src={this.props.data.map} className="map-preview"/></button> : '';

    return (
      <section className="card">
        <div className="card-header">
          <span className="card__type"><i className="fas fa-skull-crossbones"></i> Encounter</span>
        </div>
        <div className="card-body">
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
          <MonsterList
            parentId={this.props.data.id}
            parentType={this.componentName}
            updateData={this.props.updateData}
            addData={this.props.addData}
            allData={this.props.allData}
            selectedMonsters={this.props.data.monsters}
            monsterList={this.props.staticData['monsters']}
          />
          <h3>Tactics</h3>
          <ContentEditable
            tag="p"
            onBlur={this.updateData}
            name="tactics"
            content={this.props.data.tactics || ''}
            placeholder="none"
          />
          <h3>Environmental</h3>
          <ContentEditable
            tag="p"
            onBlur={this.updateData}
            name="environmental"
            content={this.props.data.environmental || ''}
            placeholder="none"
          />
        </div>
        <div className="card-footer">
          {this.toolbar(['encounter-map', 'delete'])}
        </div>
      </section>
    );

  }
}

export default Encounter;
