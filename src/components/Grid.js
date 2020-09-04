import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import Location from 'components/Location';
import Character from 'components/Character';
import Quest from 'components/Quest';
import Encounter from 'components/Encounter';
import Search from 'components/Search';
import PlayerStats from 'components/PlayerStats';
import Toolbar from "components/Toolbar";
import _ from "lodash";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const dataComponents = {
  Location: Location,
  Character: Character,
  Quest: Quest,
  Encounter: Encounter
};
const toolboxComponents = {
  Search: Search,
  PlayerStats: PlayerStats
}

class Grid extends React.Component {

  constructor(props) {
    super(props);
    const layout = JSON.parse(localStorage.getItem('gm-tools-layout')) || {
      layout: [{
        grid: {
          i: 'n1',
          x: 0,
          y: 0,
          w: 6,
          h: 3,
        },
        component: {id:"1", type:"Location"}
      }],
      keyCounter: 2
    };
    this.state = {
      layout: layout
    };
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 8, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 100,
      draggableHandle: ".card-header"
    };
  }

  createCard = el => {
    let Component = dataComponents[el.component.type];
    if (Component !== undefined) {
      const data = this.props.getData(el.component.type, el.component.id);
      const allData = this.props.getAllData();
      const staticData = this.props.getStaticData();
      return (
        <div key={el.grid.i} data-grid={el.grid}>
          <Component
            data={data}
            allData={allData}
            staticData={staticData}
            showCard={this.showCard}
            newCard={this.newCard}
            deleteCard={this.deleteCard}
            updateData={this.props.updateData}
            getAllDataByType={this.props.getAllDataByType}
            getData={this.props.getData}
            addData={this.props.addData}
            open={this.props.open}
          />
          <span className="card-close" onClick={(e) => this.closeCard(el.grid.i)}><i className="fas fa-times"></i></span>
        </div>
      );
    }

    Component = toolboxComponents[el.component.type];
    if (Component !== undefined) {
      const allData = this.props.getAllData();
      return (
        <div key={el.grid.i} data-grid={el.grid}>
          <Component
            allData={allData}
            showCard={this.showCard}
            getData={this.props.getData}
            getDataStoreTypes={this.props.getDataStoreTypes}
            updateData={this.props.updateData}
            deleteData={this.props.deleteData}
            addData={this.props.addData}
          />
          <span className="card-close" onClick={(e) => this.closeCard(el.grid.i)}><i className="fas fa-times"></i></span>
        </div>
      );
    }
  }

  showCard = (type, id) => {
    let Component = dataComponents[type];
    if (Component !== undefined) {
      this.setState({
        layout: {
          layout: this.state.layout.layout.concat({
            grid: {
              i: 'n' + this.state.layout.keyCounter,
              x: 0,
              y: 0,
              w: 2,
              h: 4,
            },
            component: {id:id, type:type}
          }),
          keyCounter: this.state.layout.keyCounter + 1
        }
      });
      return;
    }

    Component = toolboxComponents[type];
    if (Component !== undefined) {
      this.setState({
        layout: {
          layout: this.state.layout.layout.concat({
            grid: {
              i: 'n' + this.state.layout.keyCounter,
              x: 0,
              y: 0,
              w: 2,
              h: 4,
            },
            component: {type:type}
          }),
          keyCounter: this.state.layout.keyCounter + 1
        }
      });
      return;
    }

  }

  newCard = (type, parentId, parentType) => {
    this.showCard(type, this.props.addData(type, parentId, parentType));
  }

  deleteCard = (type, id) => {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.layout.layout = _.reject(stateCopy.layout.layout, function(o) { return o.component.id === id; });
    this.setState(stateCopy);
    this.props.deleteData(type, id);
  }

  closeCard = (i) => {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.layout.layout = _.reject(stateCopy.layout.layout, function(o) { return o.grid.i === i; });
    this.setState(stateCopy);
  }

  onLayoutChange = layout => {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    for (let i in layout) {
      stateCopy.layout.layout[i].grid = {...stateCopy.layout.layout[i].grid, ...layout[i]};
    }
    this.setState(stateCopy);
    localStorage.setItem("gm-tools-layout", JSON.stringify(stateCopy.layout));
  }

  render() {
    return (
      <div className="frame">
        <div className="grid">
          <ResponsiveReactGridLayout
              {...this.props}
              onLayoutChange={this.onLayoutChange}
            >
              {_.map(this.state.layout.layout, el => this.createCard(el))}
          </ResponsiveReactGridLayout>
        </div>
        <Toolbar
          newCard={this.newCard}
          showCard={this.showCard}
        />
      </div>
    )
  }
}

export default Grid;
