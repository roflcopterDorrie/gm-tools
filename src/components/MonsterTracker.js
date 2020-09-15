import React from "react";
import ContentEditable from "components/ContentEditable";

class MonsterTracker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {maxHp: 50, hp: 50}
  }

  update = () => {
    this.setState({
      maxHp: document.getElementById("track-" + this.props.id + "-maxhp").value,
      hp: document.getElementById("track-" + this.props.id + "-hp").value
    });
  }

  scroll = (e) => {
  }

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
        <div className="monster-tracker__id">{this.props.counter}</div>
        <input className={"monster-tracker__hp monster-tracker--" + hpStatus} type="number" id={"track-" + this.props.id + "-hp"} value={this.state.hp} onChange={this.update}/>
        <input
          className="monster-tracker__adjust-value"
          id={"track-" + this.props.id + "-adjust"}
          type="number"
          onWheel={(e) => {this.scroll(e)}}
          defaultValue="0"
          onChange={(e) => {this.adjustColour(e)}}
        />
        <button className="monster-tracker__adjust-accept link" onClick={(e) => {this.adjust("track-" + this.props.id + "-adjust")}}><i className="fas fa-check"></i></button>
        <input className="monster-tracker__hpmax" type="number" id={"track-" + this.props.id + "-maxhp"} value={this.state.maxHp} onChange={this.update}/>
      </div>
    )
  }
}

export default MonsterTracker;
