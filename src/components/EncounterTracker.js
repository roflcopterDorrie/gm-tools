import React from "react";
import MonsterTracker from 'components/MonsterTracker';
import _ from "lodash";
import logo from '../images/dnd-beyond-logo.svg'; // Tell webpack this JS file uses this image

import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

class EncounterTracker extends React.Component {

  constructor(props) {
    super(props);
    const data = this.props.getData('Encounter', this.props.id);
    this.monsters = this.props.getStaticData()['monsters'];
    this.keyCounter = 1;
    document.body.classList.add('encounter-tracker');

    let layout = [];
    data.monsters.map((monster, index) => {
      const monsterData = this.getMonsterData(monster.id);
      for (var i=0; i<monster.count; i++) {
        layout.push({grid: {
          i: 'n' + this.keyCounter,
          x: 0,
          y: 0,
          w: 2,
          h: 1,
        }, data: monsterData, id: index+':'+i,  counter: i+1});
        this.keyCounter++;
      }
    });

    this.state = {data: data, layout: layout};
  }

  getMonsterData = (id) => {
    for (const delta in this.monsters) {
      if (parseInt(this.monsters[delta].id) === parseInt(id)) {
        return this.monsters[delta];
      }
    }
  }

  createCard = el => {
    return (
      <div key={el.grid.i} data-grid={el.grid}>
        <MonsterTracker id={el.id} counter={el.counter} data={el.data}/>
      </div>
    );
  }

  onLayoutChange = layout => {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    for (let i in layout) {
      stateCopy.layout[i] = {...stateCopy.layout[i], ...layout[i]};
    }
    this.setState(stateCopy);
  }

  render() {
    return (
      <div>
        {this.state.data.monsters.map((monster, index) => {
          const monsterData = this.getMonsterData(monster.id);
          console.log(monsterData);
          return (
            <div className="encounter-tracker__monster">
              <h2>{monsterData.name} x {monster.count} &nbsp;
                <a href={monsterData.dndbeyond} target="_blank" rel="noopener noreferrer">
                  <img src={logo} className="dndbeyond-logo" alt="Open monster stat block in dndbeyond.com"/>
                </a>
              </h2>
            </div>
          );
        })}
        <ReactGridLayout
          className="layout"
          verticalCompact={false}
          cols={10}
          rowHeight={115}
          isResizable={false}
          draggableHandle=".monster-tracker__header"
          onLayoutChange={this.onLayoutChange}
        >
          {_.map(this.state.layout, el => this.createCard(el))}
        </ReactGridLayout>
      </div>
    )
  }
}

export default EncounterTracker;
