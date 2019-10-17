import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Autocomplete from "./Autocomplete";
import InputText from "./InputText";
import * as serviceWorker from './serviceWorker';

class Select extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <label>
        {this.props.label}
        <select>
          <option value="grapefruit">Grapefruit</option>
        </select>
      </label>
    );
  }
}

class Bet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deporte: "",
      country: "",
      competition: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);

  };

  handleSubmit(matchName) {
    let match = this.props.matches.find(match => match.name === matchName);
    this.setState(
      {
        deporte: match.sport,
        country: match.country,
        competition: match.competition
      }
    );
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
          <Select label="Mercado"/>
          <Select label="Pick"/>
          <Select label="Odds"/>
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

ReactDOM.render(
  <Bet matches={MATCHES} />,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
