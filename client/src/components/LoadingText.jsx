import React from "react";


class LoadingText extends React.Component {
  render() {
    return (
      <div className="spinner">
        <h1 style={{ fontSize: "80px", fontWeight: "normal", color: "#5ECE7B" }}>Loading...</h1>
      </div>
    );
  }
}

export default LoadingText;
