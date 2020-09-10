import React from "react";
import Card from "components/Card";

class Search extends Card {

  constructor(props) {
    super(props);
    this.componentName = 'Search';
    this.state = {
      search: ''
    }
  }

  search = (e) => {
    this.setState({search: e.target.value});
  }

  render() {
    let filtered = [];
    const dataStoreTypes = this.props.getDataStoreTypes();
    for (let key in dataStoreTypes) {
      if (!['Interaction', 'PlayerStat', 'Timeline'].includes(dataStoreTypes[key].component)) {
        if (this.props.allData[dataStoreTypes[key].store]) {
          filtered.push(this.props.allData[dataStoreTypes[key].store].reduce((accumulator, item, delta) => {
            if (item.name.toLowerCase().includes(this.state.search.toLowerCase())) {
              accumulator.push(<li key={delta}>
                <span className="fa-li"><i className={[dataStoreTypes[key].icon, 'fa'].join(' ')}></i></span>
                <span className="card-minor-minor">{item.type || item.role}</span>
                <button
                  className="link"
                  onClick={() => this.props.showCard(dataStoreTypes[key].component, item.id)}>
                    {item.name}
                </button>
              </li>);
            }
            return accumulator;
          }, []));
        }
      }
    }

    return (
      <section className="card">
        <div className="card-header">
          <span className="card__type"><i className="fas fa-search"></i> Search</span>
        </div>

        <div className="card-top">
            <input type="text" onChange={this.search} placeholder="Search"/>
          </div>
        <div className="card-body card-body--with-top">

          <ul className="fa-ul search-results">
            {filtered}
          </ul>
        </div>
      </section>
    );

  }
}

export default Search;
