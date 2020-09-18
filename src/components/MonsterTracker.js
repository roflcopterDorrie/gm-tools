import React from "react";

const conditions = [
  'Blinded',
  'Charmed',
  'Diseased',
  'Fatigued',
  'Frightened',
  'Grappled',
  'Incapacitated',
  'Invisible',
  'Paralysed',
  'Petrified',
  'Poisoned',
  'Prone',
  'Restrained',
  'Stunned',
  'Unconcious'
];

class MonsterTracker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {maxHp: 50, hp: 50, conditions:[], showConditions: false};
  }

  setMaxHp = () => {
    document.getElementById("track-" + this.props.id + "-hp").value = document.getElementById("track-" + this.props.id + "-maxhp").value;
    this.update();
  }

  update = () => {
    this.setState({
      maxHp: document.getElementById("track-" + this.props.id + "-maxhp").value,
      hp: document.getElementById("track-" + this.props.id + "-hp").value
    });
  }

  scroll = (e) => {}

  adjust = (e) => {
    let adjustValue = document.getElementById(e).value;
    this.setState({
      maxHp: document.getElementById("track-" + this.props.id + "-maxhp").value,
      hp: parseInt(document.getElementById("track-" + this.props.id + "-hp").value) + parseInt(adjustValue)
    });
    document.getElementById(e).value = 0;
    this.adjustColour({target: document.getElementById(e)});
  }

  adjustColour = (e) => {
    if (parseInt(e.target.value) < 0) {
      e.target.classList.add("monster-tracker__adjust-value--negative");
      e.target.classList.remove("monster-tracker__adjust-value--positive");
    } else if (parseInt(e.target.value) > 0) {
      e.target.classList.remove("monster-tracker__adjust-value--negative");
      e.target.classList.add("monster-tracker__adjust-value--positive");
    } else {
      e.target.classList.remove("monster-tracker__adjust-value--negative");
      e.target.classList.remove("monster-tracker__adjust-value--positive");
    }
  }

  toggleCondition = (condition) => {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    let index = stateCopy.conditions.findIndex((element) => {
      return element == condition;
    });
    if (index > -1) {
      stateCopy.conditions.splice(index,1);
    } else {
      stateCopy.conditions.push(condition);
    }
    this.setState(stateCopy);
  }

  showHideConditions = () => {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.showConditions = !stateCopy.showConditions;
    this.setState(stateCopy);
  }

  render() {
    let hpStatus;

    const percHp = (this.state.hp / this.state.maxHp) * 100;

    if (percHp > 50) {
      hpStatus = 'healthy';
    } else if (percHp > 25) {
      hpStatus = 'injured';
    } else if (percHp > 1) {
      hpStatus = 'nearly-dead';
    } else {
      hpStatus = 'dead';
    }

    return (
      <div className="monster-tracker">
        <div className="monster-tracker__header">
          <span>{this.props.counter}</span>
          <span>{this.props.data.name}</span>
        </div>
        <input className={"monster-tracker__hp monster-tracker--" + hpStatus} type="number" id={"track-" + this.props.id + "-hp"} value={this.state.hp} onChange={this.update}/>
        <input
          className="monster-tracker__adjust-value"
          id={"track-" + this.props.id + "-adjust"}
          type="number"
          onWheel={(e) => {this.scroll(e)}}
          defaultValue="0"
          onBlur={(e) => {this.adjust("track-" + this.props.id + "-adjust")}}
          onChange={(e) => {this.adjustColour(e)}}
        />
        <div className="monster-tracker__conditions-toggle">
          <input className="monster-tracker__hpmax" type="tel" id={"track-" + this.props.id + "-maxhp"} value={this.state.maxHp} onChange={this.setMaxHp}/>
          <button className="link" style={{display: 'block', width: '100%', textAlign: 'center'}} onClick={this.showHideConditions}><i className="fas fa-diagnoses"></i></button>
        </div>
        <div className="monster-tracker__conditions" style={{display: (this.state.showConditions) ? 'flex' : 'none'}}>
          {conditions.map((condition) => {
            return <button className={"monster-tracker__condition " + (this.state.conditions.includes(condition) ? 'active' : '')} onClick={(e) => this.toggleCondition(condition)}>{condition.substr(0,4)}</button>
          })}
        </div>
      </div>
    )
  }
}

export default MonsterTracker;
