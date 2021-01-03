import React, {Component} from 'react';
import Filter from './components/Filter';
import RecordTable from './components/RecordTable';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { order: "name" };
    this.filterBy = this.filterBy.bind(this);
  }

  filterBy(filterValue){
    this.setState({ order: filterValue });
  }

  render() {
    return (
      <div className="container-fluid">
        <center><h1>Birthday Records</h1></center>
        <Filter onChange={this.filterBy} selected={this.state.order}></Filter>
        <RecordTable order={this.state.order}></RecordTable>
      </div>
    );
  }
}

export default App;
