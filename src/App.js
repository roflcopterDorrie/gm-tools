import React from "react";
import Grid from './components/Grid';
import _ from "lodash";
import '@fortawesome/fontawesome-free/js/all.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(localStorage.getItem('gm-tools-data')) || {
        locations: [],
        characters: [],
        quests: [],
        nextId: 1
      }
    };
    this.getData = this.getData.bind(this);
    this.getAllDataByType = this.getAllDataByType.bind(this);
    this.updateData = this.updateData.bind(this);
    this.getAllData = this.getAllData.bind(this);
    this.addData = this.addData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  getDataStore = (type) => {
    if (type === 'Location') {
      return 'locations';
    }
    return '';
  }

  getAllData = () => {
    return this.state.data;
  }

  getData = (type, id) => {
    let dataStore = this.getDataStore(type);
    for (const delta in this.state.data[dataStore]) {
      if (this.state.data[dataStore][delta].id === id) {
        return this.state.data[dataStore][delta];
      }
    }
  }

  getAllDataByType = (type) => {
    let dataStore = this.getDataStore(type);
    return this.state.data[dataStore];
  }

  updateData = (id, type, name, value) => {
    let dataStore = this.getDataStore(type);
    for (const delta in this.state.data[dataStore]) {
      if (this.state.data[dataStore][delta].id === id) {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.data[dataStore][delta][name] = value;
        this.setState(stateCopy);
        localStorage.setItem("gm-tools-data", JSON.stringify(stateCopy.data));
        return;
      }
    }
  }

  deleteData = (type, id) => {
    let dataStore = this.getDataStore(type);
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.data[dataStore] = _.reject(stateCopy.data[dataStore], function(o) { return o.id === id; });
    this.setState(stateCopy);
    localStorage.setItem("gm-tools-data", JSON.stringify(stateCopy.data));
  }

  addData = (type, parentId) => {
    let dataStore = this.getDataStore(type);
    let nextId = this.state.data[dataStore].length + 1;
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.data[dataStore].push({
      id: nextId,
      parentId: parentId ? parentId : null,
      name: 'New ' + type
    });
    this.setState(stateCopy);
    localStorage.setItem("gm-tools-data", JSON.stringify(stateCopy.data));
    return nextId;
  }

  render() {
      return (
        <main>
          <Grid
            getData={this.getData}
            getAllDataByType={this.getAllDataByType}
            updateData={this.updateData}
            getAllData={this.getAllData}
            addData={this.addData}
            deleteData={this.deleteData}
          />
        </main>
    );

  }
}

export default App;
