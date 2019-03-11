import { connect } from 'react-redux';
import React, { Component } from 'react';
import './Winners.scss';

import { validateWinnersAction, selectWinnersAction, addParticipationAction } from '../Actions/winnerActions';

class Winners extends Component {
  constructor() {
    super(); 
    // je récupère ici le state number
    this.state = {
      number: 3,
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.selectNewWinners()
  }

  handleChangeNumber = (event) => {
    this.setState({
      number: event.target.value
    })
  }

  onSelectWinner = () => {
    this.props.selectNewWinners(this.state.number);
  }
  
  onValidateWinner = () => {
    this.props.validateWinners();
    this.props.addParticipation();
  }
  
    render() {
        return (
            <div className="c-winners">
              <h2 className="c-winners__subtitle">Choisis le nombre de participants</h2>  
             <form onSubmit = {this.handleSubmit}> 
                <fieldset className="c-winners__fieldset">
                  <input className="c-winners__form-text" id="number" type="number" min="1" value={this.state.number} onChange={this.handleChangeNumber}/>
                </fieldset>
              </form> 
             <h2 className="c-winners__subtitle">Et les gagnants sont ...</h2> 
                  {!!this.props.winnersContainer && this.props.winnersContainer.winners.map(winner => (
                    <div key={winner.id}>  
                        <div className="c-winners__input">
                          {winner.nom_prenom}
                        </div>
                    </div>  
                  )) }
              <button className="c-winners__buttonSelect"  onClick={this.onSelectWinner} >Sélectionne des gagnants</button>
             {!!this.props.winnersContainer && !this.props.winnersContainer.alreadyMailed &&
                <button className="c-winners__buttonValidate" onClick={this.onValidateWinner}>Préviens les gagnants</button>
              }
            </div>
        )
    }
}
  
const mapStateToProps = state => ({
    winnersContainer: state.winnersByWeek.length > 0 ? state.winnersByWeek[state.winnersByWeek.length - 1] : undefined,
})


const mapDispatchToProps = {
  selectNewWinners: selectWinnersAction,
  validateWinners: validateWinnersAction,
  addParticipation: addParticipationAction,
}

export default connect(mapStateToProps, mapDispatchToProps )(Winners);
