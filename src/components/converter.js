import React, { Component } from "react";
import "./styles.css";

class Converter extends Component {
  state = {
    currencies: [],
    base: "USD",
    amount: "",
    convertTo: "BDT",
    result: "",
    date: ""
  };
async componentDidMount(){
    var response = await fetch(`https://free.currconv.com/api/v7/currencies?apiKey=c001d6438eef51e86961`)
    response = await response.json()
    var cs = Object.entries(response.results).map(item => item[0])
    cs.sort();
    this.setState({currencies: cs})
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    this.setState({date: date})
}
  handleSelect = e => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        result: null
      },
      this.calculate
    );
  };

  handleInput = e => {
    this.setState(
      {
        amount: e.target.value,
        result: null,
      },
      this.calculate
    );
  };

  calculate = () => {
    const amount = this.state.amount;
    if (amount === isNaN) {
      return;
    } else {
      fetch(`https://free.currconv.com/api/v7/convert?q=${this.state.base}_${this.state.convertTo}&compact=ultra&apiKey=c001d6438eef51e86961`)
        .then(res => res.json())
        .then(data => {
          var query = `${this.state.base}_${this.state.convertTo}` 
          const rate = data[query];
          console.log(rate);
          const result = (rate * amount).toFixed(4);
          this.setState({
            result
          });
        });
    }
  };

  handleSwap = e => {
    const base = this.state.base;
    const convertTo = this.state.convertTo;
    e.preventDefault();
    this.setState(
      {
        convertTo: base,
        base: convertTo,
        result: null
      },
      this.calculate
    );
  };
  render() {
    const { currencies, base, amount, convertTo, result, date } = this.state;
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card card-body">
              <h5>
                {amount} {base} is equivalent to
              </h5>
              <h2>
                {amount === ""
                  ? "0"
                  : result === null
                  ? "Calculating..."
                  : result}{" "}
                {convertTo}
              </h2>
              <p>As of  {date}</p>
              <div className="row">
                <div className="col-lg-10">
                  <form className="form-inline mb-4">
                    <input
                      type="number"
                      value={amount}
                      onChange={this.handleInput}
                      className="input form-control form-control-lg mx-3"
                    />
                    <select
                      name="base"
                      value={base}
                      onChange={this.handleSelect}
                      className="input form-control form-control-lg"
                    >
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </form>

                  <form className="form-inline mb-4">
                    <input
                      disabled={true}
                      value={
                        amount === ""
                          ? "0"
                          : result === null
                          ? "Calculating..."
                          : result
                      }
                      className="input form-control form-control-lg mx-3"
                    />
                    <select
                      name="convertTo"
                      value={convertTo}
                      onChange={this.handleSelect}
                      className="input form-control form-control-lg"
                    >
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>

                <div className="col-lg-2 align-self-center">
                  <h1 onClick={this.handleSwap} className="swap">
                    &#8595;&#8593;
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Converter;
