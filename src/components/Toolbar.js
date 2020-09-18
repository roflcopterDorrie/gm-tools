import React from "react";
import ImageUploader from 'react-images-upload';

class Toolbar extends React.PureComponent {

  constructor(props) {
    super(props);
    this.uploadData = this.uploadData.bind(this);
  }

  exportData = () => {
    const dataObject = {
      'gm-tools-data': JSON.parse(localStorage.getItem('gm-tools-data')),
      'gm-tools-config': JSON.parse(localStorage.getItem('gm-tools-config')),
      'gm-tools-layout': JSON.parse(localStorage.getItem('gm-tools-layout'))
    };
    var data = new Blob([JSON.stringify(dataObject)], {type: 'text/plain'});
    var url = window.URL.createObjectURL(data);
    document.getElementById('export_data').href = url;
    document.getElementById('export_data').click();
  }

  uploadData = (event) => {
    var reader = new FileReader();
    const reloadFromStorage = this.props.reloadFromStorage;
    reader.onload = function(evt) {
      const data = JSON.parse(evt.target.result);
      localStorage.setItem("gm-tools-data", JSON.stringify(data['gm-tools-data']));
      localStorage.setItem("gm-tools-config", JSON.stringify(data['gm-tools-config']));
      localStorage.setItem("gm-tools-layout", JSON.stringify(data['gm-tools-layout']));
      reloadFromStorage();
    };
    reader.readAsText(event.target.files[0]);
  }

  render() {

    return <section className="toolbar">
      <span className="title"><i className="fas fa-fw fa-toolbox"></i></span>
      <button className="icon" onClick={() => this.props.showCard('Search')}><i className="fas fa-fw fa-search"></i></button>
      <button className="icon" onClick={() => this.props.newCard('Location', null)}><i className="fas fa-fw fa-globe-americas"></i></button>
      <button className="icon" onClick={() => this.props.newCard('Character', null)}><i className="fas fa-fw fa-user-alt"></i></button>
      <button className="icon" onClick={() => this.props.newCard('Quest', null)}><i className="fas fa-fw fa-scroll"></i></button>
      <button className="icon" onClick={() => this.props.newCard('Encounter', null)}><i className="fas fa-fw fa-skull-crossbones"></i></button>
      <button className="icon" onClick={() => this.props.showCard('PlayerStats', null)}><i className="fas fa-fw fa-users"></i></button>
      <button className="icon" onClick={() => this.props.showCard('Timeline', null)}><i className="fas fa-fw fa-clock"></i></button>
      <button className="icon" onClick={this.exportData}><i className="fas fa-fw fa-download"></i></button>
      <button className="icon" onClick={this.importData}><i className="fas fa-fw fa-upload"></i></button>
      <input type="file" name="file" onChange={this.uploadData}/>
      <a id="export_data" href="" download onClick={this.exportData} style={{display: 'none'}}>Export</a>
    </section>;
  }
}

export default Toolbar;