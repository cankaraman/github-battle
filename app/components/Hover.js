import React from "react";

export default class Hover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    };
    this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
  }

  handleOnMouseOver() {
    this.setState({ hovering: true });
  }

  handleOnMouseOut() {
    this.setState({ hovering: false });
  }

  render() {
    const { children } = this.props;
    const { hovering } = this.state;

    return (
      <div
        onMouseOut={this.handleOnMouseOut}
        onMouseOver={this.handleOnMouseOver}
      >
        {children(hovering)}
      </div>
    );
  }
}
