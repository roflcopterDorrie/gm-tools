import React from "react";
import Select from 'react-select';

class MonsterList extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {selectedMonsters: this.props.selectedMonsters || []};
    this.updateData = this.updateData.bind(this);
  }

  getMonsterList = (selectedId, delta, count) => {
    let selected = {};
    const options = this.props.monsterList.map((monster) => {
      const option = {value: parseInt(monster.id), label: monster.name};
      if (monster.id == selectedId) {
        selected = option;
      }
      return option;
    });

    return <div>
      <Select onChange={(selectedOption) => {this.updateData(delta, selectedOption.value)}} defaultValue={selected} options={options}/> x&nbsp;
      <input type="number" className="monster-count" value={count} onChange={(e) => {this.updateData(delta, null, e.target.value)}}/>
      &nbsp;
      <button className="link" onClick={(e) => {this.deleteMonster(delta)}}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  }

  updateData = (deltaId, monsterId, count) => {
    let selectedMonsters = this.state.selectedMonsters.map((monster, delta) => {
      if (deltaId === delta) {
        return {
          id: monsterId || monster.id,
          count: count || monster.count
        }
      }
      return monster;
    });
    this.setState({selectedMonsters: selectedMonsters});
    this.props.updateData(this.props.parentId, 'Encounter', 'monsters', selectedMonsters);
  };

  addMonster = () => {
    const selectedMonsters = this.state.selectedMonsters.concat({id:1,count:1});
    this.setState({selectedMonsters:selectedMonsters})
    this.props.updateData(this.props.parentId, 'Encounter', 'monsters', selectedMonsters);
  }

  deleteMonster = (delta) => {
    const selectedMonsters = this.state.selectedMonsters.reduce(( acc, monster, index ) => {
      if (index !== delta) {
        acc.push(monster);
      }
      return acc;
    },[]);
    this.setState({selectedMonsters: selectedMonsters});
    this.props.updateData(this.props.parentId, 'Encounter', 'monsters', selectedMonsters);
  }

  render() {

    let selectedMonsters = this.props.selectedMonsters ? this.props.selectedMonsters.map((monster, delta) => {
      return this.getMonsterList(monster.id, delta, monster.count);
    }) : [];

    // If some locations are found, show them.
    return (
      <div>
        <h3>Monsters
          <button className="link" onClick={this.addMonster}>
            <i className="fas fa-spider"></i>
          </button>
        </h3>
        {selectedMonsters}
      </div>
    );
  }
}

export default MonsterList;
