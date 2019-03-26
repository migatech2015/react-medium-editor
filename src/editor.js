import React from "react";
import ReactDOM from "react-dom";

if (typeof window !== "undefined") {
  var MediumEditor = require("medium-editor");
}

export default class ReactMediumEditor extends React.Component {
  static defaultProps = {
    tag: "div"
  };

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this);

    this.text = this.props.text;
    this.medium = new MediumEditor(dom, this.props.options);
    this.medium.subscribe("editableInput", e => {
      this.change(dom.innerHTML);
    });
  }

  componentDidUpdate() {
    if (this.text !== this.props.text) {
      this.text = this.props.text;
      this.medium.setContent(this.text);
    }
    this.medium.restoreSelection();
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  render() {
    const {
      options,
      text,
      tag,
      contentEditable,
      dangerouslySetInnerHTML,
      ...props
    } = this.props;
    props.dangerouslySetInnerHTML = { __html: text };

    if (this.medium) {
      this.medium.saveSelection();
    }

    return React.createElement(tag, props);
  }

  change(text) {
    this.text = text;
    if (this.props.onChange) this.props.onChange(text, this.medium);
  }
}
