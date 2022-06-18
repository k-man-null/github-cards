import React, { useCallback, useState } from "react";
import axios from "axios";

//TODO: convert class components into functional components

// Handle unavailable github username

// Handle poor network or response taking too long

// Handle any other error 

const CardList = (props) => (
  //maps the data array to an array of Card components
  <div>
    {props.profiles.map(px => <Card {...px} key={px.id} />)}
  </div>
)

// class Card extends React.Component {
//   render() {
//     const profile = this.props;
//     return (
//       <div className="github-profile">
//         <img src={profile.avatar_url} />
//         <div className="info">
//           <div className="name">{profile.name}</div>
//           <div className="company">{profile.company}</div>
//         </div>
//       </div>
//     );
//   }
// }

function Card(props) {

  return (
    <div className="github-profile" >
      <img src={props.avatar_url} />
      <div className="info">
        <div className="name">{props.name}</div>
        <div className="company">{props.company}</div>
      </div>
    </div>
  );
}

// class Form extends React.Component {

//   state = { userName : ''}
//   handleSubmit = async (event) => {
//     event.preventDefault();
//     const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
//     this.props.onSubmit(resp.data)
//     this.setState({ userName: ''})
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <input
//           type="text"
//           value={ this.state.userName }
//           onChange={event => this.setState({ userName: event.target.value })}
//           placeholder="Github Username"
//           required
//         />
//         <button> Add card</button>
//       </form>
//     )
//   }
// }

function Form(props) {

  const [userName, setUsername] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${userName}`);
    props.onSubmit(resp.data);
    setUsername('')
    event.target.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(event) =>  {setUsername(event.target.value)}}
        placeholder="Github Username"
        required
      />
      <button> Add card</button>
    </form>
  )
}


// class App extends React.Component {
//   //replacing with class fields.
//   // constructor(props) {
//   //   super(props);

//   //   this.state = {
//   //     profiles: testData
//   //   }
//   // }
//   state = {
//     profiles: []
//   }

//   addNewProfile = (profileData) => {
//     //console.log('App',profileData)
//     //inbuilt method setState that takes the previous state
//     // and chages it to the provided state
//     this.setState(prevState => ({
//       profiles: [...prevState.profiles,profileData]
//       //equivalent to concat
//     }))
//   }

//   render() {
//     return (
//       <div>
//         <div className = "header" > {this.props.title} </div>
//         <Form onSubmit = {this.addNewProfile} />
//         <CardList profiles = {this.state.profiles} />
//       </div>
//     )
//   }
// }


function App() {

  const [profiles, setProfiles] = useState([]);

  const title = "Github Cards App";

  const addNewProfile = (profileData) => {
    setProfiles(profiles.concat(profileData))
  }

  return (
    <div>
      <div className="header" > {title} </div>
      <Form onSubmit={addNewProfile} />
      <CardList profiles={profiles} />
    </div>
  )
}
export default App;
