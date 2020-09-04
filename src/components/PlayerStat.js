import React from "react";
import ContentEditable from "components/ContentEditable";

class PlayerStat extends React.PureComponent {

  updateData = (id, name, value) => {
    this.props.updateData(this.props.data.id, 'PlayerStat', name, value);
  }

  render() {

    return (
      <tr>
        <td>
          <ContentEditable
            tag="span"
            name="name"
            content={this.props.data.name || ''}
            placeholder="Name"
            onBlur={this.updateData}
          />
        </td>
        <td>
          <ContentEditable
            tag="span"
            name="class"
            content={this.props.data.class || ''}
            placeholder="Class"
            onBlur={this.updateData}
          />
        </td>
        <td>
          <ContentEditable
            tag="span"
            name="pp"
            content={this.props.data.pp || ''}
            placeholder="PP"
            onBlur={this.updateData}
          />
        </td>
        <td>
          <ContentEditable
            tag="span"
            name="ac"
            content={this.props.data.ac || ''}
            placeholder="AC"
            onBlur={this.updateData}
          />
        </td>
        <td>
          <ContentEditable
            tag="span"
            name="proficiencies"
            content={this.props.data.proficiencies || ''}
            placeholder="Proficiencies"
            onBlur={this.updateData}
          />
        </td>
        <td>
          <ContentEditable
            tag="span"
            name="languages"
            content={this.props.data.languages || ''}
            placeholder="Languages"
            onBlur={this.updateData}
          />
        </td>
        <td>
          <button className="link" onClick={(e) => {this.props.deleteData('PlayerStat', this.props.data.id)}}>
            <i className="fas fa-times"></i>
          </button>
        </td>
      </tr>
    );

  }
}

export default PlayerStat;
