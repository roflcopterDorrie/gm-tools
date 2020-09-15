import React from "react";
import MonsterTracker from 'components/MonsterTracker';
import logo from '../images/dnd-beyond-logo.svg'; // Tell webpack this JS file uses this image

class EncounterTracker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: this.props.getData('Encounter', this.props.id), monsters: this.props.getStaticData()['monsters'], iframes: []};
    document.body.classList.add('encounter-tracker');
  }

  getMonsterData = (id) => {
    for (const delta in this.state.monsters) {
      if (parseInt(this.state.monsters[delta].id) === parseInt(id)) {
        return this.state.monsters[delta];
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.data.monsters.map((monster, index) => {
          const monsterData = this.getMonsterData(monster.id);
          let monsterTrackers = [];
          for (var i=0; i<monster.count; i++) {
            monsterTrackers.push(
              <MonsterTracker id={index+':'+i} counter={i+1}/>
            );
          }
          return (
            <div className="encounter-tracker__monster">
              <h2>{monsterData.name} x {monster.count} &nbsp;
                <a href={monsterData.dndbeyond} target="_blank" rel="noopener noreferrer">
                  <img src={logo} className="dndbeyond-logo" alt="Open monster stat block in dndbeyond.com"/>
                </a>
              </h2>
              {monsterTrackers}
            </div>
          );
        })}
      </div>
    )
  }
}

export default EncounterTracker;
