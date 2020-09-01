import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = {
      result: "",
      formula: ""
    }
  }

  onClick = button => {

    if (button === "C") {
      this.clear();
    }

    else if (button === "=") {
      this.calculate();
    }

    else {

      this.setState({
        result: this.state.result,
        formula: this.state.formula + button
      })
    }

  }

  simplify = (formula) => {

    // this could be done with regex to make it simpler
    if (formula.length > 0) {
      while (formula.includes("++")) {
        formula = formula.replace("++", "+");
      }

      while (formula.includes("--")) {
        formula = formula.replace("--", "-");
      }

      while (formula.includes("..")) {
        formula = formula.replace("..", ".");
      }

      if (formula.charAt(0) == "+" || formula.charAt(0) == "-") {
        formula = formula.substr(1, formula.length);
      }

      if (formula.charAt(formula.length - 1) == "-"
        || formula.charAt(formula.length - 1) == "+"
        || formula.charAt(formula.length - 1) == ".") {
        formula = formula.substr(0, formula.length - 1);
      }

    }


    return formula;
  }

  calculate = () => {
    var checkFormula = this.simplify(this.state.formula);

    this.setState({
      formula: checkFormula,
      result: (eval(checkFormula) || "")
    })
  }

  clear = () => {
    this.setState({
      formula: "",
      result: ""
    })
  }

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="container-fluid vertical-center">
        <div className="container">
          <div className="jumbotron">
            <h2 className="col-12">Calculator Assignment</h2>
            <div className="input-group col-12">
              <input className="form-control"
                id="formula" type="text"
                value={this.state.formula} onChange={this.onInputchange} />
            </div>
            <div className="input-group col-12">
              <input className="form-control pull-right input-sm"
                id="results" type="text"
                value={this.state.result} onChange={this.onInputchange} />
            </div>
            <div className="btn-group-vertical col-12" role="group">
              <div className="btn-group btn-group-lg" role="group">
                <button name="7" className="btn btn-secondary col-3 form-control" onClick={e => this.onClick(e.target.name)}>7</button>
                <button name="8" className="btn btn-secondary col-3 form-control" onClick={e => this.onClick(e.target.name)}>8</button>
                <button name="9" className="btn btn-secondary col-3 form-control" onClick={e => this.onClick(e.target.name)}>9</button>
                <button name="C" className="btn btn-primary col-3 form-control" onClick={e => this.onClick(e.target.name)}>C</button>

              </div>
              <div className="btn-group btn-group-lg" role="group">
                <button name="4" className="btn btn-lg btn-secondary  col-3 form-control" onClick={e => this.onClick(e.target.name)}>4</button>
                <button name="5" className="btn btn-lg btn-secondary  col-3 form-control" onClick={e => this.onClick(e.target.name)}>5</button>
                <button name="6" className="btn btn-lg btn-secondary  col-3 form-control" onClick={e => this.onClick(e.target.name)}>6</button>
                <button name="+" className="btn btn-primary col-3 form-control" onClick={e => this.onClick(e.target.name)}>+</button>

              </div>
              <div className="btn-group btn-group-lg" role="group">
                <button name="1" className="btn btn-lg btn-secondary col-3 form-control" onClick={e => this.onClick(e.target.name)}>1</button>
                <button name="2" className="btn btn-lg btn-secondary col-3 form-control" onClick={e => this.onClick(e.target.name)}>2</button>
                <button name="3" className="btn btn-lg btn-secondary col-3 form-control" onClick={e => this.onClick(e.target.name)}>3</button>
                <button name="-" className="btn btn-primary col-3 form-control" onClick={e => this.onClick(e.target.name)}>-</button>

              </div>
              <div className="btn-group btn-group-lg" role="group">
                <button name="0" className="btn btn-lg btn-secondary col-6 form-control" onClick={e => this.onClick(e.target.name)}>0</button>
                <button name="." className="btn btn-lg btn-secondary col-3 form-control" onClick={e => this.onClick(e.target.name)}>.</button>
                <button name="=" className="btn btn-primary col-3 form-control" onClick={e => this.onClick(e.target.name)}>=</button>
              </div>
            </div>

          </div>
        </div>

      </div>

    )

  }

}

export default App;
