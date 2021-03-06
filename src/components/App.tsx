import * as React from "react";
import { hot } from "react-hot-loader";
import { GlobalHotKeys, HotKeys } from "react-hotkeys";

import "./../assets/scss/App.scss";

type CalculatorState = {
  formula: string,
  result: string
}

class App extends React.Component<{}, CalculatorState> {

  private keyMap;
  private handlers;

  constructor(props) {
    super(props);
    this.state = {
      result: "",
      formula: ""
    };
    this.keyMap = {
      Digit: ['1','2','3','4','5','6','7','8','9','0','.','shift+=','shift+_'],
      Clear: ['c'],
      Equals: ['=','enter'],
    };

    this.handlers = {
      Digit: (e) => {
        //console.log(e.key);
        this.onClick(e.key);
      },
      Clear: () => {
        //console.log('clear');
        this.clear();
      },
      Equals: () => {
        console.log('=');
        this.calculate();
      }
    };

  }

  onClick = button => {

    if (button === "C") {
      this.clear();
    }

    else if (button === "=") {
      this.calculate();
    }

    else {


      if(this.state.formula.length && (button === '+' || button === '-')){
        if(this.state.formula.charAt(this.state.formula.length - 1) == "-"){
          button = '';
        }
        if(this.state.formula.charAt(this.state.formula.length - 1) == "+"){
          button = '';
        }
      }

      if(this.state.formula.length && button === '.'){
        if(this.state.formula.charAt(this.state.formula.length - 1) == "."){
          button = '';
        }
      }

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
      result: (eval(checkFormula) || "ERR")
    })
  }

  clear = () => {
    this.setState({
      formula: "",
      result: ""
    })
  }

  onInputchange() {

  }


  render() {
    return (

      <GlobalHotKeys keyMap={this.keyMap} handlers={this.handlers}>
        <div className="container-fluid vertical-center">
          <div className="container">
            <div className="jumbotron">
              <h2 className="col-12">Calculator Assignment</h2>
              <div className="col-12">
                <h4>
                  {this.state.formula}
                </h4>
                <h3>
                  {this.state.result}
                </h3>

              </div>

              <div className="btn-group-vertical col-12" role="group">
                <div className="btn-group btn-group-lg" role="group">
                  <button name="7" className="btn btn-secondary col-3 form-control" onClick={e => this.onClick(e.target['name'])}>7</button>
                  <button name="8" className="btn btn-secondary col-3 form-control" onClick={e => this.onClick(e.target['name'])}>8</button>
                  <button name="9" className="btn btn-secondary col-3 form-control" onClick={e => this.onClick(e.target['name'])}>9</button>
                  <button name="C" className="btn btn-primary col-3 form-control" onClick={e => this.onClick(e.target['name'])}>C</button>

                </div>
                <div className="btn-group btn-group-lg" role="group">
                  <button name="4" className="btn btn-secondary  col-3 form-control" onClick={e => this.onClick(e.target["name"])}>4</button>
                  <button name="5" className="btn btn-secondary  col-3 form-control" onClick={e => this.onClick(e.target["name"])}>5</button>
                  <button name="6" className="btn btn-secondary  col-3 form-control" onClick={e => this.onClick(e.target["name"])}>6</button>
                  <button name="+" className="btn btn-primary col-3 form-control" onClick={e => this.onClick(e.target["name"])}>+</button>

                </div>
                <div className="btn-group btn-group-lg" role="group">
                  <button name="1" className="btn btn-secondary col-3 form-control" onClick={e => this.onClick(e.target["name"])}>1</button>
                  <button name="2" className="btn btn-secondary col-3 form-control" onClick={e => this.onClick(e.target["name"])}>2</button>
                  <button name="3" className="btn btn-secondary col-3 form-control" onClick={e => this.onClick(e.target["name"])}>3</button>
                  <button name="-" className="btn btn-primary col-3 form-control" onClick={e => this.onClick(e.target["name"])}>-</button>

                </div>
                <div className="btn-group btn-group-lg" role="group">
                  <button name="0" className="btn btn-secondary col-6 form-control" onClick={e => this.onClick(e.target["name"])}>0</button>
                  <button name="." className="btn btn-secondary col-3 form-control" onClick={e => this.onClick(e.target["name"])}>.</button>
                  <button name="=" className="btn btn-primary col-3 form-control" onClick={e => this.onClick(e.target["name"])}>=</button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </GlobalHotKeys>

    )

  }

}

declare let module: Record<string, unknown>;

export default hot(module)(App);
