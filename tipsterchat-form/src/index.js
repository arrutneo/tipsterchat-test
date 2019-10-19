import React from 'react';
import ReactDOM from 'react-dom';
import './custom.scss';
import Bet from "./Bet";
import * as serviceWorker from './serviceWorker';

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
  <div className="container">
    <Bet matches={MATCHES} countries={COUNTRIES} bookies={BOOKIES} />
  </div>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
