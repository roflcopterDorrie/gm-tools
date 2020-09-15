import React from "react";
import Card from "components/Card";
import MonsterList from "components/MonsterList";
import ContentEditable from "components/ContentEditable";
import ImageUploader from 'react-images-upload';

class Encounter extends Card {

  constructor(props) {
    super(props);
    this.componentName = 'Encounter';
    this.state = {mapInput: false};
    this.onDrop = this.onDrop.bind(this);
  }

  changeMap = () => {
    this.setState({mapInput: !this.state.mapInput});
  }

  // Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
  onDrop = (picture, pictureDataURLs) => {
    const datas = pictureDataURLs[0];
    let wantedWidth = 200;
    let wantedHeight = 200;

    // We create an image to receive the Data URI
    var img = document.createElement('img');

    const id = this.props.data.id;
    const updateData = this.updateData;

    // When the event "onload" is triggered we can resize the image.
    img.onload = function() {
      if (img.width > img.height) {
        wantedHeight = wantedHeight * (img.height / img.width);
      } else {
        wantedWidth = wantedWidth * (img.width / img.height);
      }

      // We create a canvas and get its context.
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      // We set the dimensions at the wanted size.
      canvas.width = wantedWidth;
      canvas.height = wantedHeight;

      // We resize the image with the canvas method drawImage();
      ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

      updateData(id, 'map', canvas.toDataURL('image/jpeg', 60));
    };

    // We put the Data URI in the image's src attribute
    img.src = datas;
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
            <span className={!this.state.mapInput ? 'hidden' : ''}>
              <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={524288000}
                singleImage={true}
                withLabel={false}
                withIcon={false}
              />
            </span>
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
          Difficulty:
          <select defaultValue={this.props.data.difficulty} onChange={(e) => this.updateData(null, 'difficulty', e.target.value)}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
            <option>Deadly</option>
          </select>
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
          <h3>Treasure</h3>
          <ContentEditable
            tag="p"
            onBlur={this.updateData}
            name="treasure"
            content={this.props.data.treasure || ''}
            placeholder="none"
          />
          <h3>Outcome</h3>
          <ContentEditable
            tag="p"
            onBlur={this.updateDataLogEvent}
            name="outcome"
            content={this.props.data.outcome || ''}
            placeholder="none"
          />
        </div>
        <div className="card-footer">
          {this.toolbar(['encounter-map', 'encounter-tracker', 'delete'])}
        </div>
      </section>
    );

  }
}

export default Encounter;
