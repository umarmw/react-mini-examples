import React, {Component} from 'react';
import {usersJSON} from '../data';

export default class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: usersJSON,
			sort: this.props.sort
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.sort !== this.props.sort) {
			this.compareByType(nextProps.sort);
			this.setState({sort: nextProps.sort});
		}
	}

	compareByType(type){
		switch(type){
			case "age":
				let sortedAge = this.state.users.sort(this.compareByAge);
				this.setState({
					users: sortedAge
				});
			break;

			case "name":
				let sortedName = this.state.users.sort(this.compareByName);
				this.setState({
					users: sortedName
				});
			break;

			case "points":
				let sortedPoints = this.state.users.sort(this.compareByPoints);
				this.setState({
					users: sortedPoints
				});
			break;

			case "rank":
				let sortedRank = this.state.users.sort(this.compareByRank);
				this.setState({
					users: sortedRank
				});
			break;

			default:

			break;
		}
	}

    // complete the comparators
	compareByAge(a, b) {
		return parseInt(a.age, 10) - parseInt(b.age, 10);	
	}

	compareByName(a, b) {
		var nameA = a.name.toUpperCase(); // ignore upper and lowercase
		var nameB = b.name.toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return -1; //nameA comes first
		}
		if (nameA > nameB) {
			return 1; // nameB comes first
		}
		return 0;  // names must be equal
	}

	compareByPoints(a, b) {
		return parseInt(a.points,10) - parseInt(b.points,10);	
	}

	compareByRank(a, b) {
		return parseInt(a.rank,10) - parseInt(b.rank,10);
	}

	render() {
 
		return (<div>
			<table className="table table-striped">
				<thead>
					<tr key="head">
						<th>Age</th>
						<th>Name</th>
						<th>Points</th>
						<th>Rank</th>
					</tr>
				</thead>
				<tbody>
					{ this.state.users.map(user => {
						return <tr key={[user.name, user.rank].join("-")}><td>{user.age}</td><td>{user.name}</td><td>{user.points}</td><td>{user.rank}</td></tr>
					})}
				</tbody>
			</table>
		</div>)
	}
}
