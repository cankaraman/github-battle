import React, { useState } from "react";

export default function useHover() {
  const [hovering, setHovering] = useState(false);

  const handleOnMouseOver = () => {
    setHovering(true);
  };

  const handleOnMouseOut = () => {
    setHovering(false);
  };
  const attrs = {
    onMouseOver: handleOnMouseOver,
    onMouseOut: handleOnMouseOut,
  };

  return [hovering, attrs];
}

class Hover extends React.Component {
  state = {
    hovering: false,
  };

  handleOnMouseOver = () => {
    this.setState({ hovering: true });
  };

  handleOnMouseOut = () => {
    this.setState({ hovering: false });
  };

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
