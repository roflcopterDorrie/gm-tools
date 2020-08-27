import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import Location from './Location';
import Character from './Character';
import _ from "lodash";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { isCompositeComponent } from "react-dom/test-utils";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const components = {
  Location: Location,
  Character: Character
};

class Grid extends React.Component {

  constructor(props) {
    super(props);
    const layout = JSON.parse(localStorage.getItem('gm-tools-layout')) || [{
      grid: {
        i: 'n1',
        x: 0,
        y: 0,
        w: 6,
        h: 3,
      },
      component: {id:"1", type:"Location"}
    }];
    this.state = {
      layout: layout,
      keyCounter: layout ? layout.length + 1 : 2,
      data: this.props.data
    };
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 6, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 100,
      draggableHandle: ".card-header"
    };
  }

  createCard = el => {
    const Component = components[el.component.type];
    const data = this.props.getData(el.component.type, el.component.id);
    const allData = this.props.getAllData();
    if (Component !== undefined) {
      return (
        <div key={el.grid.i} data-grid={el.grid}>
          <Component
            data={data}
            allData={allData}
            showCard={this.showCard}
            newCard={this.newCard}
            deleteCard={this.deleteCard}
            updateData={this.props.updateData}
            getAllDataByType={this.props.getAllDataByType}
          />
          <span className="card-close" onClick={(e) => this.closeCard(el.grid.i)}><i className="fas fa-times"></i></span>
        </div>
      );
    }
  }

  showCard = (type, id) => {
    const Component = components[type];
    if (Component !== undefined) {
      this.setState({
        layout: this.state.layout.concat({
          grid: {
            i: 'n' + this.state.keyCounter,
            x: 0,
            y: 0,
            w: 1,
            h: 3,
          },
          component: {id:id, type:type}
        }),
        keyCounter: this.state.keyCounter + 1,
      });
    }
  }

  newCard = (type, parentId) => {
    this.showCard(type, this.props.addData(type, parentId));
  }

  deleteCard = (type, id) => {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.layout = _.reject(stateCopy.layout, function(o) { return o.component.id === id; });
    this.setState(stateCopy);
    this.props.deleteData(type, id);
  }

  closeCard = (i) => {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.layout = _.reject(stateCopy.layout, function(o) { return o.grid.i === i; });
    this.setState(stateCopy);
  }

  onLayoutChange = layout => {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    for (let i in layout) {
      stateCopy.layout[i].grid = {...stateCopy.layout[i].grid, ...layout[i]};
    }
    this.setState(stateCopy);
    localStorage.setItem("gm-tools-layout", JSON.stringify(stateCopy.layout));
  }

  render() {
    return (
      <ResponsiveReactGridLayout
          {...this.props}
          onLayoutChange={this.onLayoutChange}
        >
          {_.map(this.state.layout, el => this.createCard(el))}
      </ResponsiveReactGridLayout>
    )
  }
}

export default Grid;
