import React from "react";
import axios from "axios";

const CardList = (props) => (

  <div>
    {props.profiles.map(px => <Card {...px} />)}
  </div>
)

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {

  state = { userName : ''}
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data)
    this.setState({ userName: ''})
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={ this.state.userName }
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="Github Username"
          required
        />
        <button> Add card</button>
      </form>
    )
  }
}

class App extends React.Component {
  //replacing with class fields.
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     profiles: testData
  //   }
  // }
  state = {
    profiles: []
  }
  
  addNewProfile = (profileData) => {
    console.log('App',profileData)
  
    this.setState(prevState => ({
      profiles: [...prevState.profiles,profileData]
      //equivalent to concat
    }))
  }

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    )
  }
}

export default App;
