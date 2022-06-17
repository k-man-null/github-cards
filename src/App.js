import React from "react";

class Card extends React.Component {
  render() {
    return (
      <div className="github-profile">
        One Github Profile...
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Card />
      </div>
    )
  }
}

export default App;
