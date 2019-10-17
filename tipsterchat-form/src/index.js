import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Autocomplete from "./Autocomplete";
import InputText from "./InputText";
import Select from "./Select";
import * as serviceWorker from './serviceWorker';

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

  setCountry(countryCode) {
    this.setState(
      {
        country: this.props.countries.find(country => country.id === countryCode).name
      }
    )
  }

  findBookieName(bookieID) {
    return this.props.bookies.find(bookie => bookie.id === bookieID).name;
  }

  handleSubmit(matchName) {
    let match = this.props.matches.find(match => match.name === matchName);
    this.setCountry(match.country);
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
      picks: picks
    });
  }

  handlePickChange(value) {
    let oddsValue = this.state.match.bets.map(bet =>
      {
        let optionValue = this.findBookieName(bet.bookieId) + " - " + bet.odds.find(odd => odd.id === value).value;
        return optionValue;
      }
    );
    console.log(oddsValue);
    let bookiesName = this.state.match.bets.map(bet => this.props.bookies.find(bookie => bookie.id === bet.bookieId));
    console.log(bookiesName);
    // let oddsValue = odds.map(odd => odd.value);
    oddsValue.unshift("Select your odd");
    this.setState({
      oddsValue: oddsValue
    })
  }

  render() {
    return (
      <form>
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

const MATCHES = [
  {
    name: 'Barcelona - Madrid',
    sport: 'Fútbol',
    country: 'es',
    competition: 'La Liga',
    bets: [
      {
        bookieId: 'bet365',
        market: '12',
        picks: ['1, 2'],
        odds: [
          {
            id: '1',
            value: 1.4
          },
          {
            id: '2',
            value: 3.4
          }
        ],
      },
      {
        bookieId: 'hill',
        market: '12',
        picks: ['1, 2'],
        odds: [
          {
            id: '1',
            value: 1.6
          },
          {
            id: '2',
            value: 3.6
          }
        ],
      },
    ],
  },
  {
    name: 'Nadal - Federer',
    sport: 'Tennis',
    country: 'fr',
    competition: 'Roland-Garros',
    bets: [
      {
        bookieId: 'bet365',
        market: '12',
        picks: ['1, 2'],
        odds: [
          {
            id: '1',
            value: 1.4
          },
          {
            id: '2',
            value: 1.4
          }
        ],
      },
      {
        bookieId: 'hill',
        market: '12',
        picks: ['1, 2'],
        odds: [
          {
            id: '1',
            value: 0.8
          },
          {
            id: '2',
            value: 0.9
          }
        ],
      },
    ],
  },
];

const COUNTRIES = [
  {
    id: 'fr',
    name: 'France'
 },
 {
   id: 'es',
   name: 'Spain'
 },
];

const BOOKIES = [
  {
    id: 'bet365',
    name: 'Bet 365'
  },
  {
    id: 'hill',
    name: 'William Hill'
  }
]

ReactDOM.render(
  <Bet matches={MATCHES} countries={COUNTRIES} bookies={BOOKIES} />,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
