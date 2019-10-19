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
    if (!Number.isNaN(Number(value))) {
      let oddsValue = this.state.match.bets.map(bet => this.findBookieName(bet.bookieId) + " - " + bet.odds.find(odd => odd.id === value).value);
      oddsValue.unshift("Select your odd");
      this.setState({
        oddsValue: oddsValue
      });
    } else {
      this.setState({
        oddsValue: ["Please select a pick"]
      });
    }
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
  }

  render() {
    return (
      <Fragment>
        <div className="row p-3">
          <form className="col" onSubmit={this.handleSubmit}>
            <fieldset>
              <legend className="h1">Apuesta</legend>
              <fieldset className="form-group">
                <label>Partido</label>
                <Autocomplete suggestions={this.props.matches.map(a => a.name)} handler={this.handleMatchFilter}/>
              </fieldset>
              <fieldset className="form-group">
                <div className="row">
                  <div className="col">
                    <InputText name="sport" value={this.state.deporte} label="Deporte"/>
                  </div>
                  <div className="col">
                    <InputText name="country" value={this.state.country} label="País"/>
                  </div>
                  <div className="col">
                    <InputText name="competition" value={this.state.competition} label="Torneo"/>
                  </div>
                </div>
              </fieldset>
              <fieldset className="form-group">
                <legend className="h5">Pick</legend>
                <div className="row">
                  <div className="col">
                    <Select name="mercado" options={this.state.markets} label="Mercado"/>
                  </div>
                  <div className="col">
                    <Select name="pick" options={this.state.picks} label="Pick" onChange={this.handlePickChange}/>
                  </div>
                  <div className="col">
                    <Select name="odds" options={this.state.oddsValue} label="Odds"/>
                  </div>
                </div>
              </fieldset>
              <input className="btn btn-outline-success btn-block" type="submit" tabIndex="-1" />
            </fieldset>
          </form>
        </div>
        <div className="row p-3">
          <div className="col">
            <h2>JSON to send</h2>
            <pre><code>{this.state.json}</code></pre>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Bet;
