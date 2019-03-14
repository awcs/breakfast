import React, { Component } from 'react';
import './App.scss';

import Winners from './Components/Winners';
import Users from './Components/Users';
import AddUser from './Components/AddUser'

import axios from 'axios';
import { Switch, NavLink, Route } from 'react-router-dom';
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

  /**
   * suppression de BrowserRouter ici car tu l'as déjà déclaré dans ton index.js 
   * il encapsule donc deja tout tes composants
   * 
   * Ici le problème ce sont les nommages de tes class css, pour te donner un exemple :
   * c-header --> app-header ou encore c-header__user --> app-header-user
   * 
   * ce sera bcp plus lisible comme ça, aussi assez généralement fait attention a l'indentation et les espaces qui se baladent 
   * un peu partout, mets des espaces par contre autour de tes opérateurs type "+, -, =" etc...
   */

  render() {
    return (
      <main className="c-app">
        <div className="c-header">
          <NavLink to="/">
            <img className="c-header__logo" src={process.env.PUBLIC_URL + '/assets/images/donut.svg'} width="8%" alt="Logo donut" />
          </NavLink>
          <NavLink to="/Users">
            <img className="c-header__user" src={process.env.PUBLIC_URL + '/assets/images/users.svg'} width="30px" alt="icon users" />
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
    );
  }
}

/** ici tu n'as pas besoin de mettre un return */
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

