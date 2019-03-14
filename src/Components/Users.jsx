import React, { Component } from 'react';
import  { connect } from 'react-redux';
import './Users.scss';
import AddUser from './AddUser';

import { deleteUserAction, dispatchUsersAction } from '../Actions/userActions';

/** meme chose que dans AddUser, va dans utils */
function searchingFor(term){
  return function(x){
    return x.nom_prenom.toLowerCase().includes(term.toLowerCase()) || ! term;
  }
}

/** INDENTATION !! C'est le mega bordel dans ce composant :)*/
class Users extends Component {
    constructor() {
        super();
        this.state = {
          term:'',
        }
        /** pas besoin de mettre de bind(this) si tu transformes searchHandler en une fonction fléchée  */
        this.searchHandler = this.searchHandler.bind(this);
    }

    /** POINTS VIRGULES un peu partout, a la fin de tes setState en particulier  */
  
    searchHandler(event){
      this.setState({term:event.target.value}
      )}

    onClickDelete = (userId) => {
      this.props.deleteUser(userId)
    }

    render() {
      /** pourquoi cette syntaxe ? */
      const{term} = this.state;

      let filteredList = this.props.users.filter(searchingFor(term));

      return (
        <div>
          <div className="c-users">
          <form className="c-users__form">
            <input className="c-users__text" type="text"
              onChange={this.searchHandler}
              value={term}
            />
            <i className="fa fa-search"></i>
          </form>
                    { filteredList.length > 0 ?  <div className="c-card">{filteredList.map((item, index) => {
                        return (
                          <div key={index}>
                            <p className="ligne"><span className="c-card__item">{item.nom_prenom} </span> 
                              <span className="c-card__waste"><img src={process.env.PUBLIC_URL + '/assets/images/waste.svg' } onClick={() => this.onClickDelete(item.id) } width="15px" alt="Icones"/></span>
                              </p> 
                          </div>
                        )
                      })}</div> : <div><img className="c-card__coffee" src={process.env.PUBLIC_URL+'/assets/images/coffee-cup.svg'} width="80px"alt="Logo Smile" /> <p className="c-users__subtitle">Oups ! Essaie encore !!</p></div>
                        }
             <AddUser />
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = store => {
    return {
      users: store.users
    }
  }

   const mapDispatchToProps =  {
    deleteUser: deleteUserAction, 
    dispatchUsers:  dispatchUsersAction,
  }
 
  export default connect ( mapStateToProps, mapDispatchToProps)(Users);


