import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        e.preventDefault();
        let action = e.currentTarget.ariaLabel;
        this.props.onChange(action);
    }

    render() {
        return (
        <div className="checkboxes">
            <Checkbox 
            checked={(this.props.selected==="name")?true:false} 
            onChange={this.handleChange}
            inputProps={{ 'aria-label': 'name', 'name':'name' }}/>
            <label>Name</label>
            <Checkbox checked={(this.props.selected!=="name")?true:false} 
            onChange={this.handleChange}
            inputProps={{ 'aria-label': 'age', 'name':'age'}}/>
            <label>Age</label>
        </div>
        );
    }
}

export default Filter;