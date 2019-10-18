import React, {Fragment } from "react";
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
      competition: "",
      json: "{}"
    };
    this.handleMatchFilter = this.handleMatchFilter.bind(this);
    this.handlePickChange = this.handlePickChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  findCountry(countryCode) {
    return this.props.countries.find(country => country.id === countryCode).name
  }

  findBookieName(bookieID) {
    return this.props.bookies.find(bookie => bookie.id === bookieID).name;
  }

  handleMatchFilter(matchName) {
    let match = this.props.matches.find(match => match.name === matchName);
    let markets = match.bets.map(bet => bet.market);
    markets = Array.from(new Set(markets));
    markets.unshift("Select market");
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

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let formDataObject = {
      bet: {}
    };
    formData.forEach((value, key) => {formDataObject.bet[key] = value});
    let formDataJson = JSON.stringify(formDataObject, null, 2);
    this.setState({
      json: formDataJson
    })
    console.log(formDataJson);
  }

  render() {
    return (
      <Fragment>
        <div class="row p-3">
          <form class="col" onSubmit={this.handleSubmit}>
            <fieldset>
              <legend class="h1">Apuesta</legend>
              <fieldset class="form-group">
                <label>Partido</label>
                <Autocomplete suggestions={this.props.matches.map(a => a.name)} handler={this.handleMatchFilter}/>
              </fieldset>
              <fieldset class="form-group">
                <div class="row">
                  <div class="col">
                    <InputText name="sport" value={this.state.deporte} label="Deporte"/>
                  </div>
                  <div class="col">
                    <InputText name="country" value={this.state.country} label="País"/>
                  </div>
                  <div class="col">
                    <InputText name="competition" value={this.state.competition} label="Torneo"/>
                  </div>
                </div>
              </fieldset>
              <fieldset class="form-group">
                <legend class="h5">Pick</legend>
                <div class="row">
                  <div class="col">
                    <Select name="mercado" options={this.state.markets} label="Mercado"/>
                  </div>
                  <div class="col">
                    <Select name="pick" options={this.state.picks} label="Pick" onChange={this.handlePickChange}/>
                  </div>
                  <div class="col">
                    <Select name="odds" options={this.state.oddsValue} label="Odds"/>
                  </div>
                </div>
              </fieldset>
              <input class="btn btn-outline-success btn-block" type="submit" tabIndex="-1" />
            </fieldset>
          </form>
        </div>
        <div class="row p-3">
          <div class="col">
            <h2>JSON to send</h2>
            <p>
              <pre><code>{this.state.json}</code></pre>
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Bet;
