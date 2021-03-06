import React from 'react';
import './App.css';
import 'h8k-components';

import Articles from './components/Articles';

const title = "Sorting Articles";

function compareUpvotes(a, b) {
  const A = a.upvotes;
  const B = b.upvotes;

  let comparison = 0;
  if (A > B) {
    comparison = 1;
  } else if (A < B) {
    comparison = -1;
  }
  return comparison;
}

function compareDates(a, b) {
  const A = (new Date(a.date)).getTime();
  const B = (new Date(b.date)).getTime();

  let comparison = 0;
  if (A > B) {
    comparison = 1;
  } else if (A < B) {
    comparison = -1;
  }
  return comparison;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {lartik: this.props.articles};
    this.mostUpvoted = this.mostUpvoted.bind(this);
    this.mostRecent = this.mostRecent.bind(this);
  }

  mostUpvoted(e){
    e.preventDefault();
    let lk = this.state.lartik.sort(compareUpvotes).reverse();
    this.setState({lartik: JSON.parse(JSON.stringify(lk))});
  }

  mostRecent(e){
    e.preventDefault();
    let lk = this.state.lartik.sort(compareDates).reverse();
    this.setState({lartik: JSON.parse(JSON.stringify(lk))});
  };

  render() {
    return (
      <div className="App">
        <h8k-navbar header={title}></h8k-navbar>
        <div className="layout-row align-items-center justify-content-center my-20 navigation">
          <label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
          <button data-testid="most-upvoted-link" className="small" onClick={this.mostUpvoted}>Most Upvoted</button>
          <button data-testid="most-recent-link" className="small" onClick={this.mostRecent}>Most Recent</button>
        </div>
        {this.state.lartik && <Articles articles={this.state.lartik}/>}
      </div>
    );
  }
}

export default App;
