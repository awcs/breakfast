import  React, { Component } from 'react';
import './AddUser.scss';

import  { connect } from 'react-redux';
import {toastr} from 'react-redux-toastr'

import { addUsersAction } from '../Actions/userActions';

const toastrOptions = {
  timeOut: 3000, // by setting to 0 it will prevent the auto close
  onCloseButtonClick: () => console.log('Close button was clicked'),
  showCloseButton: false, // true by default
}
 
class Adduser extends Component {
  constructor(){
    super();
    this.state = {
      nom_prenom:"",
      email:"",
    }
    this.disableSubmitButton = true;
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addUsers(this.state,this.state.email)
    toastr.success('Confirmation', 'Un mail a bien été envoyé au nouvel inscrit', toastrOptions)
  }

  render() {
      if(this.state.email.length > 0 &&
        this.state.nom_prenom.length > 0) {
          this.disableSubmitButton = false;
        } else {
        this.disableSubmitButton = true;
        }
        return (
          <div>
          <h2 className="c-addUser__subtitle">Nouveau participant</h2>
          <div className="c-addUser">
            <div className="c-card"> 
              <form onSubmit = {this.handleSubmit}> 
                <fieldset className="c-card__fieldset">
                  <input className="c-card__form-text" id="nom_prenom" type="text" placeholder="Nom Prénom" onChange={this.handleChange}/>
                </fieldset>
                <fieldset className="c-card__fieldset">
                  <input className="c-card__email" type="email" id="email" placeholder="prenom.nom@smile.fr" onChange={this.handleChange}/>
                </fieldset>  
                <fieldset className="c-card__fieldset">
                  <button  className="c-card__submit" value="Envoyer" >Envoyer</button>
                </fieldset>
              </form>
            </div>
          </div>
          </div>
        )
    }
}

const mapStateToProps = store=> ({
  users: store.users,
});

const mapDispatchToProps = {
 addUsers: addUsersAction
}

export default connect (mapStateToProps, mapDispatchToProps)(Adduser); 