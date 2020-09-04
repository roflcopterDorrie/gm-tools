import React from "react";
import Card from "components/Card";
import PlayerStat from 'components/PlayerStat';

class PlayerStats extends Card {

  constructor(props) {
    super(props);
    this.componentName = 'PlayerStats';
  }

  render() {

    const data = this.props.allData['playerStats'];
    let playerStats = data.map((player, delta) => {
      return <PlayerStat data={player} updateData={this.props.updateData} deleteData={this.props.deleteData}/>
    });

    return (
      <section className="card">
        <div className="card-header">
          <span className="card__type">
            <i className="fas fa-user-alt"></i> Player stats
          </span>
        </div>
        <div className="card-body">
          <table className="playerStats">
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>PP</th>
                <th>AC</th>
                <th>Proficiencies</th>
                <th>Languages</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{playerStats}</tbody>
          </table>
        </div>
        <div className="card-footer">
          {this.toolbar(['add-player-stat'])}
        </div>
      </section>
    );

  }
}

export default PlayerStats;
