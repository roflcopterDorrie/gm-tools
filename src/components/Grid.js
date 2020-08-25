import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import Location from './Location';
import Character from './Character';
import _ from "lodash";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const components = {
  Location: Location,
  Character: Character
};

class Grid extends React.Component {

  constructor(props) {
    super(props);
    const layout = JSON.parse(localStorage.getItem('layout'));
    this.state = {
      layout: layout || [{
        grid: {
          i: 'n1',
          x: 0,
          y: 0,
          w: 6,
          h: 3,
        },
        component: {id:"1", type:"Location"}
      }],
      keyCounter: layout ? layout.length + 1 : 2
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

  createGridItem = el => {
    const removeStyle = {
      position: "absolute",
      right: "14px",
      top: '8px',
      cursor: "pointer",
      color: 'white'
    };
    const Component = components[el.component.type];
    if (Component !== undefined) {
      return (
        <div key={el.grid.i} data-grid={el.grid}>
          <Component id={el.component.id} add={this.add}/>
          <span onClick={(e) => this.close(el.grid.i)}><i className="fas fa-times" style={removeStyle}></i></span>
        </div>
      );
    }
  }

  add = (type,id) => {
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

  close = (i) => {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.layout = _.reject(stateCopy.layout, function(o) { return o.grid.i === i; });
    this.setState(stateCopy);
  }

  onLayoutChange = layout => {
    console.log('change');
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    for (let i in layout) {
      stateCopy.layout[i].grid.x = layout[i].x;
      stateCopy.layout[i].grid.y = layout[i].y;
      stateCopy.layout[i].grid.w = layout[i].w;
      stateCopy.layout[i].grid.h = layout[i].h;
    }
    this.setState(stateCopy);
    localStorage.setItem("layout", JSON.stringify(stateCopy.layout));
  }

  render() {
    return (
      <ResponsiveReactGridLayout
          {...this.props}
          onLayoutChange={this.onLayoutChange}
        >
          {_.map(this.state.layout, el => this.createGridItem(el))}
      </ResponsiveReactGridLayout>
    )
  }
}

export default Grid;
