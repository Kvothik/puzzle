import React from "react";
import Util from "./util.js";

export default App;

function App() {
  return (
    /* Each of these components will generate a hidden code if they are solved
   correctly. Submit each code to its corresponding solution endpoint (/reactSolution/:index)
   where index starts from 0, and proceeds in the order the problems are in. */
    <div>
      <SimpleStateComponent /> // Index 0
      <SimplePropsComponent propName={true} uuid={"kelly.cromeans"} /> // Index 1
      <Clock /> // Index 2
      <ArrayComponent /> // Index 3
      <br />
      <Counter /> <br />// Index 4
    </div>
  );
}

class SimpleStateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateValue: true,
      uuid: "kelly.cromeans"
    };
  }

  render() {
    return Util.renderStateComponent(this.state);
  }
}

class SimplePropsComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return Util.renderPropsComponent(this.props);
  }
}

// Make this count as the seconds hand of a wall clock would
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0
    };
  }

  componentDidMount() {
    this.setState({ timer: 0 });
  }

  componentDidUpdate() {
    if (this.state.timer < 11) {
      setTimeout(() => {
        this.setState(previousState => ({ timer: previousState.timer + 1 }));
      }, 50);
    }
  }

  render() {
    return Util.renderClock(this.state.timer);
  }
}

class ArrayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.setState({ items: Util.generateRandomizedAlphabet()});

  }

  componentDidUpdate() {
    /* Implement this function so that the UI displays the items in the array
       rotating to the left (<-- this way) to get the hidden code
    */
    // 
    // let revealCode = this.state.items
    this.state.items.push(this.state.items.shift());
    // revealCode.unshift(revealCode.pop());
    setTimeout(() => {
      this.setState({ items: this.state.items });
    }, 50);
  }

  render() {
    /* Fix itemsJSX to render items */
    // const itemsJSX = [<span key="shouldHaveBeenItems">{this.state.items.map(item => (<span>{item}</span>))}</span>];
    const itemsJSX = [<span key="shouldHaveBeenItems">{this.state.items.map(item => (<span>{item}</span>))}</span>];
    return Util.renderFirstTenItems(itemsJSX);
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      globalCount: 0
    }
  }
  componentDidMount() {
    this.setState({ globalCount: 0 });
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.setState(previousState => ({ globalCount: previousState.globalCount + 1 }));
    }, 1);
  }

  render() {
    /* Refactor this code so the UI displays a 4-digit counter to find the hidden code
       (EX: 0,000...0,001...0,002......9,999)
    */

    const globalCountString = this.state.globalCount.toString().length < 4 ? this.state.globalCount.toString().padStart(4, '0') : this.state.globalCount.toString();
    return Util.renderCounter(
      <span>
        <Digit count={globalCountString[0]} />
        <span>,</span>
        <Digit count={globalCountString[1]} />
        <Digit count={globalCountString[2]} />
        <Digit count={globalCountString[3]} />
      </span>

    );
  }
}
class Digit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.count
    };
  }

  render() {
    return <span>{this.props.count ? this.props.count : 0}</span>;
  }
}

