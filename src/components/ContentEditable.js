import React from "react";

class ContentEditable extends React.Component {

  onInput = (evt) => {
    this.props.onChange(evt.target.innerText.trim(), this.props.name);
  };

  render() {
    const Element = `${this.props.tag}`;
    return (
      <Element
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={(evt) => this.onInput(evt)}
        placeholder={this.props.placeholder}
        className={this.props.className}>
          {this.props.content||''}
      </Element>
    );
  }
}

export default ContentEditable;
