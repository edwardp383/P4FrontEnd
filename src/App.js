import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Header from './Header';
import Register from './Register'
import AnimeSearch from './AnimeSearch'
import MyAnime from './MyAnime'
import { Route, Switch} from 'react-router-dom'



const My404 = () => {
  return (
    <div className="App">
      404 You're lost!
    </div>
  )
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      logged: false,
      username: "",
      id: null
    }
  }
  userLogin = (username, id) => {
    this.setState({
      logged: true,
      username: username,
      id: id
    });
    console.log(this.state.username);
  }
  userLogout = () => {
    this.setState({
      logged: false,
      username: "",
      id: null
    });
  }
  render(){  
    return (
      <div className="App">
        <main>
        <Header user={this.state} userLogout={this.userLogout} />
          <Switch>
            { this.state.logged ?
              <Route exact path="/MyAnime" component={ () => <MyAnime id={this.state.id} /> } />
/*              <Route exact path="/" component={ MyAccount } />*/
              :
              [
                <Route key="key1" exact path="/" component={ () => <Login userLogin={this.userLogin} /> } />,
                <Route key="key2" exact path="/register" component={ () => <Register userLogin={this.userLogin} /> } />
              ]
            }
            <Route exact path="/animesearch" component={ () => <AnimeSearch id={this.state.id} /> } />
            <Route component={ My404 } />          
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
