import React, { Component } from 'react';
import './App.scss';

import Winners from './Components/Winners';
import Users from './Components/Users';
import AddUser from './Components/AddUser'


import axios from 'axios';
import { BrowserRouter, Switch, NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { dispatchUsersAction  } from './Actions/userActions';
import { selectWinnersAction } from '././Actions/winnerActions';


class App extends Component {

  onSelectWinner = () => {
    this.props.selectNewWinners();
  }

  async componentDidMount() {
    const result = await axios.get('http://localhost:6998/users');
    this.props.dispatchUsers(result.data);
  }

  render() {
    
    return (
      <BrowserRouter>
      <main className="c-app">
        <div className="c-header">
          <NavLink to="/">
            <img className=  "c-header__logo" src={process.env.PUBLIC_URL+'/assets/images/donut.svg'} width="8%" alt="Logo donut" />
          </NavLink>
          <NavLink to="/Users">
            <img className="c-header__user" src={process.env.PUBLIC_URL+'/assets/images/users.svg'} width="30px" alt="icon users" />
          </NavLink>
          </div>
        <div className="c-content">
          <h1 className="c-content__title">BREAKFAST TIME</h1>
            <Switch>
              <Route exact path="/" component={Winners} />
              <Route path="/Users" component={Users} />
              <Route path ="/AddUser" component={AddUser} />
            </Switch>
         </div>
      </main>
      </BrowserRouter>  
    );
  }
}

const mapStateToProps = store => {
  return {
    users: store.users,
  }
}
const mapDispatchToProps = {
  dispatchUsers:  dispatchUsersAction,
  selectNewWinners: selectWinnersAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

