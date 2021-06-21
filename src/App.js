import React from 'react';
import './App.css';
import Drink from './Drink';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cartItems: [],
      drinks: [
        {drinkname: 'Hansa', drinkprice: 78 },
        {drinkname: 'Lervig', drinkprice: 79 },
        {drinkname: 'Frydenlund', drinkprice: 84 },
        {drinkname: 'Tuborg', drinkprice: 77 },
        {drinkname: 'Tou', drinkprice:  76},
        {drinkname: 'Ringnes', drinkprice: 80 },
        {drinkname: 'Whiskey', drinkprice: 109 },
        {drinkname: 'Gin & Tonic', drinkprice: 94 },
        {drinkname: 'White Russian', drinkprice: 104 },
        {drinkname: 'Old Fashioned', drinkprice: 103}
      ],
      totalPrice: 0
    };
    this.addDrink = this.addDrink.bind(this);
  }

  addDrink(drink, e){
    var newItem = {
      name: drink.drinkname, price: drink.drinkprice, key: Date.now()
    };
    this.setState((prevState) => {
      return {
        cartItems: prevState.cartItems.concat(newItem)
      };
    });
    this.setState((state) => ({
      totalPrice: state.totalPrice + drink.drinkprice
    }));
    console.log(this.state.cartItems);
  }

  applyDiscount(discount){
    const discountMultiplier =  (100 - discount) / 100;
    this.setState((state) => ({
      totalPrice: state.totalPrice * discountMultiplier
    }));
  }

  handlePayment(e){
    this.setState((state) => ({
      totalPrice: 0,
      cartItems: []
    }));

  }

  render(){
    return (
      <div className="App">
        <div className="Container">
        {this.state.drinks.map((drink, index) => (
          <Drink key={index} onClick={e => this.addDrink(drink, e)} drinkname={drink.drinkname} drinkprice={drink.drinkprice} ></Drink>
        ))}
        </div>
        <div className="Container">
          <div className="Cart">
            <DrinkList entries={this.state.cartItems}/>
            <div id="totalPrice">{this.state.totalPrice}</div>
          </div>
          <div className="Container" id="buttonContainer">
            <Popup trigger={<div className="ClickableButton" id="discountsbutton">Discounts</div>} modal>
              {close => (
                <div className='Modal'>
                  <div className='ClickableButton' onClick={() => {this.applyDiscount(50); close();}}>50%</div>
                  <div className='ClickableButton' onClick={() => {this.applyDiscount(25); close();}}>25%</div>
                </div>
              )}
            </Popup>
            <Popup trigger={<div className="ClickableButton" id="purchasebutton">Payment</div>} modal>
              {close => (
                <div className='Modal'>
                  <div className="ClickableButton" onClick={() => {
                    this.handlePayment();
                    close();
                  }}>Cash</div>
                  <div className="ClickableButton">Card</div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </div>
  )}
}

class DrinkList extends React.Component{
  createDrinks(drink){
    return <li key={drink.key}>{drink.name}, {drink.price}</li>
  }
  render(){
    var drinkEntries = this.props.entries;
    var listItems = drinkEntries.map(this.createDrinks);

    return(
      <ul className="CartItems">
        {listItems}
      </ul>
    );
  }
}

export default App;
