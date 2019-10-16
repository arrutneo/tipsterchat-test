import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchGame extends React.Component {
  render() {
    return (
        <label>Partido
          <input type="text" placeholder="Search..." />
        </label>
    );
  }
}

class InputText extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <label>
          {this.props.label}
          <input type="text" placeholder="" />
        </label>
    );
  }
}

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
  render() {
    return (
      <form>
        <SearchGame />
        <InputText label="Deporte"/>
        <InputText label="País"/>
        <InputText label="Torneo"/>
        <Select label="Mercado"/>
        <Select label="Pick"/>
        <Select label="Odds"/>
        <ProductTable products={this.props.products} />
      </form>
    );
  }
}


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

const matches = [
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
  <Bet products={PRODUCTS} />,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
