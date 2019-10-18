import React from 'react';
import './bet.scss';
import Autocomplete from "./Autocomplete";
import InputText from "./InputText";
import Select from "./Select";

class Bet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: "",
      deporte: "",
      country: "",
      competition: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePickChange = this.handlePickChange.bind(this);
  };

  findCountry(countryCode) {
    return this.props.countries.find(country => country.id === countryCode).name
  }

  findBookieName(bookieID) {
    return this.props.bookies.find(bookie => bookie.id === bookieID).name;
  }

  handleSubmit(matchName) {
    let match = this.props.matches.find(match => match.name === matchName);
    let markets = match.bets.map(bet => bet.market);
    markets = Array.from(new Set(markets));
    markets.unshift("Select the market");
    let picks = match.bets[0].picks[0].split(",").map(pick => pick.trim());
    picks.unshift("Select your pick");
    this.setState({
      match: match,
      deporte: match.sport,
      competition: match.competition,
      markets: markets,
      picks: picks,
      country: this.findCountry(match.country)
    });
  }

  handlePickChange(value) {
    let oddsValue = this.state.match.bets.map(bet => this.findBookieName(bet.bookieId) + " - " + bet.odds.find(odd => odd.id === value).value);
    oddsValue.unshift("Select your odd");
    this.setState({
      oddsValue: oddsValue
    })
  }

  render() {
    return (
      <form>
        <legend>
          <h1 class="container">Apuesta</h1>
        </legend>
        <fieldset>
          <label>Partido</label>
          <Autocomplete suggestions={this.props.matches.map(a => a.name)} onSubmit={this.handleSubmit}/>
        </fieldset>
        <fieldset>
          <InputText value={this.state.deporte} label="Deporte"/>
          <InputText value={this.state.country} label="País"/>
          <InputText value={this.state.competition} label="Torneo"/>
        </fieldset>
        <fieldset>
          <legend>Pick</legend>
          <Select value={this.state.markets} label="Mercado"/>
          <Select onChange={this.handlePickChange} value={this.state.picks} label="Pick"/>
          <Select value={this.state.oddsValue} label="Odds"/>
        </fieldset>
      </form>
    );
  }
}

export default Bet;
