import React from "react";

class ContentEditable extends React.Component {

  onBlur = (evt) => {
    if (this.props.onBlur) {
      this.props.onBlur(this.props.hasOwnProperty('id') ? this.props.id : null, this.props.name, evt.target.innerText.trim());
    }
  };

  render() {
    const Element = `${this.props.tag}`;
    return (
      <Element
        contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={this.onBlur}
        placeholder={this.props.placeholder}
        className={this.props.className ? this.props.className.join(' ') : ''}>
          {this.props.content||''}
      </Element>
    );
  }
}

export default ContentEditable;
