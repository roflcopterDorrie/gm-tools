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
import '@fortawesome/fontawesome-free/css/all.min.css';
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
        events: [],
        nextId: 1
      },
      config: JSON.parse(localStorage.getItem('gm-tools-config')) || {
        datetime: {
          minute: 0,
          hour: 0,
          day: 1,
          month: 1,
          year: 1370
        }
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
    this.updateConfig = this.updateConfig.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.getDataStore = this.getDataStore.bind(this);
  }

  reloadFromStorage = () => {
    this.setState({
      data: JSON.parse(localStorage.getItem('gm-tools-data')) || {
        locations: [],
        characters: [],
        quests: [],
        encounters: [],
        interactions: [],
        playerStats: [],
        events: [],
        nextId: 1
      },
      config: JSON.parse(localStorage.getItem('gm-tools-config')) || {
        datetime: {
          minute: 0,
          hour: 0,
          day: 1,
          month: 1,
          year: 1370
        }
      }
    });
  }

  getDataStore = (type) => {
    const stores = this.getDataStoreTypes();
    for (let store in stores) {
      if (stores[store].component === type) {
        return stores[store];
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
      {component: 'Timeline', store: 'events', icon: 'fa-clock'},
    ];
  }

  getAllData = () => {
    return this.state.data;
  }

  getConfig = () => {
    return this.state.config;
  }

  getData = (type, id) => {
    id = parseInt(id);
    let dataStore = this.getDataStore(type);
    if (dataStore) {
      for (const delta in this.state.data[dataStore.store]) {
        if (this.state.data[dataStore.store][delta].id === id) {
          return this.state.data[dataStore.store][delta];
        }
      }
    }
  }

  getStaticData = () => {
    return {"monsters": monsters};
  }

  getAllDataByType = (type) => {
    let dataStore = this.getDataStore(type).store;
    return this.state.data[dataStore];
  }

  updateData = (id, type, name, value) => {
    this.setState((state, props) => {
      id = parseInt(id);
      let dataStore = this.getDataStore(type).store;
      for (let delta in state.data[dataStore]) {
        if (state.data[dataStore][delta].id === id) {
          let stateCopy = JSON.parse(JSON.stringify(state));
          stateCopy.data[dataStore][delta][name] = value;
          localStorage.setItem("gm-tools-data", JSON.stringify(stateCopy.data));
          return stateCopy;
        }
      }
    });
  }

  deleteData = (type, id) => {
    this.setState((state, props) => {
      let dataStore = this.getDataStore(type).store;
      let stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.data[dataStore] = _.reject(stateCopy.data[dataStore], function(o) { return o.id === id; });
      localStorage.setItem("gm-tools-data", JSON.stringify(stateCopy.data));
      return stateCopy;
    });
  }

  addData = (type, parentId, parentType, data, callback) => {
    this.setState((state, props) => {
      let dataStore = this.getDataStore(type).store;
      let stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.data.nextId++;
      const dataInit = {
        id: stateCopy.data.nextId,
        parentId: parentId ? parentId : null,
        parentType: parentType ? parentType : null,
        name: 'New ' + type
      };
      const dataMerged = {...dataInit, ...data};
      stateCopy.data[dataStore].push(dataMerged);
      localStorage.setItem("gm-tools-data", JSON.stringify(stateCopy.data));
      if (callback) {
        callback(stateCopy.data.nextId);
      }
      return stateCopy;
    });
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

  updateConfig = (name, value) => {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.config[name] = value;
    this.setState(stateCopy);
    localStorage.setItem("gm-tools-config", JSON.stringify(stateCopy.config));
  }

  addEvent = (parentId, parentType) => {
    this.addData('Timeline', parentId, parentType, {datetime: this.state.config.datetime});
  }

  render() {
    return (
      <main>
        <Router>
          <Switch>
          path={}
            <Route path={process.env.PUBLIC_URL + "/encounter-map/:id"} children={<EncounterMapRoute getData={this.getData} updateData={this.updateData}/>}/>
            <Route path={process.env.PUBLIC_URL + "/encounter-tracker/:id"} children={<EncounterTrackerRoute getData={this.getData} updateData={this.updateData} getStaticData={this.getStaticData}/>}/>
            <Route path={process.env.PUBLIC_URL + "/"}>
              <Grid
                getData={this.getData}
                getAllDataByType={this.getAllDataByType}
                updateData={this.updateData}
                getAllData={this.getAllData}
                getStaticData={this.getStaticData}
                addData={this.addData}
                deleteData={this.deleteData}
                getDataStoreTypes={this.getDataStoreTypes}
                getDataStore={this.getDataStore}
                open={this.open}
                getConfig={this.getConfig}
                updateConfig={this.updateConfig}
                addEvent={this.addEvent}
                reloadFromStorage={this.reloadFromStorage}
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
      getStaticData={props.getStaticData}
      id={id}
    />
  );
}

export default App;
