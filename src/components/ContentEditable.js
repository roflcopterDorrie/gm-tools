import React from "react";

class ContentEditable extends React.Component {

  onBlur = (evt) => {
    this.props.onBlur(this.props.id || null, this.props.name, evt.target.innerText.trim());
  };

  render() {
    const Element = `${this.props.tag}`;
    return (
      <Element
        contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={this.onBlur}
        placeholder={this.props.placeholder}
        className={this.props.className}>
          {this.props.content||''}
      </Element>
    );
  }
}

export default ContentEditable;
