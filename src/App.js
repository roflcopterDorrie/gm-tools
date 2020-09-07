import React from "react";
import Grid from 'components/Grid';
import EncounterMap from 'components/EncounterMap';
import EncounterTracker from 'components/EncounterTracker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import _ from "lodash";
import monsters from 'data/monsters.json';
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
        encounters: [],
        interactions: [],
        playerStats: [],
        nextId: 1
      }
    };
    this.getData = this.getData.bind(this);
    this.getAllDataByType = this.getAllDataByType.bind(this);
    this.updateData = this.updateData.bind(this);
    this.getAllData = this.getAllData.bind(this);
    this.addData = this.addData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.open = this.open.bind(this);
    this.getDataStoreTypes = this.getDataStoreTypes.bind(this);
  }

  getDataStore = (type) => {
    const stores = this.getDataStoreTypes();
    for (let store in stores) {
      if (stores[store].component === type) {
        return stores[store].store;
      }
    }
    return null;
  }

  getDataStoreTypes = () => {
    return [
      {component: 'Location', store: 'locations', icon: 'fa-globe-americas'},
      {component: 'Character', store: 'characters', icon: 'fa-user-alt'},
      {component: 'Quest', store: 'quests', icon: 'fa-scroll'},
      {component: 'Encounter', store: 'encounters', icon: 'fa-skull-crossbones'},
      {component: 'Interaction', store: 'interactions', icon: 'fa-people-arrows'},
      {component: 'PlayerStat', store: 'playerStats', icon: 'fa-users'},
    ];
  }

  getAllData = () => {
    return this.state.data;
  }

  getData = (type, id) => {
    id = parseInt(id);
    let dataStore = this.getDataStore(type);
    for (const delta in this.state.data[dataStore]) {
      if (this.state.data[dataStore][delta].id === id) {
        return this.state.data[dataStore][delta];
      }
    }
  }

  getStaticData = () => {
    return {"monsters":monsters};
  }

  getAllDataByType = (type) => {
    let dataStore = this.getDataStore(type);
    return this.state.data[dataStore];
  }

  updateData = (id, type, name, value) => {
    id = parseInt(id);
    let dataStore = this.getDataStore(type);
    for (let delta in this.state.data[dataStore]) {
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

  addData = (type, parentId, parentType) => {
    let dataStore = this.getDataStore(type);
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.data.nextId++;
    stateCopy.data[dataStore].push({
      id: stateCopy.data.nextId,
      parentId: parentId ? parentId : null,
      parentType: parentType ? parentType : null,
      name: 'New ' + type
    });
    this.setState(stateCopy);
    localStorage.setItem("gm-tools-data", JSON.stringify(stateCopy.data));
    return stateCopy.data.nextId;
  }

  open = (style, type, id, field) => {
    if (style === 'image') {
      const imageData = this.getData(type, id);
      if (imageData) {
        let w = window.open('about:blank');
        let image = new Image();
        image.src = imageData[field];
        image.style = "width: 100%";
        setTimeout(function(){
          w.document.write(image.outerHTML);
        }, 0);
      }
    }
  }

  render() {
    return (
      <main>
        <Router>
          <Switch>
            <Route path="/encounter-map/:id" children={<EncounterMapRoute getData={this.getData} updateData={this.updateData}/>}/>
            <Route path="/encounter-tracker/:id" children={<EncounterTrackerRoute getData={this.getData} updateData={this.updateData}/>}/>
            <Route path="/">
              <Grid
                getData={this.getData}
                getAllDataByType={this.getAllDataByType}
                updateData={this.updateData}
                getAllData={this.getAllData}
                getStaticData={this.getStaticData}
                addData={this.addData}
                deleteData={this.deleteData}
                getDataStoreTypes={this.getDataStoreTypes}
                open={this.open}
              />
            </Route>
          </Switch>
        </Router>
      </main>
    );

  }
}

function EncounterMapRoute(props) {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <EncounterMap
      getData={props.getData}
      updateData={props.updateData}
      id={id}
    />
  );
}

function EncounterTrackerRoute(props) {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <EncounterTracker
      getData={props.getData}
      updateData={props.updateData}
      id={id}
    />
  );
}


export default App;
