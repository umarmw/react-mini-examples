import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class RecordTable extends Component {
    constructor(props) {
        super(props);

        this.people = [
            {
                name: "Veronica Mize",
                dob: "11/29/2011"
            }, {
                name: "Cecilia Olsson",
                dob: "09/16/1992"
            }, {
                name: "Peter Parker",
                dob: "01/16/1992"
            }, {
                name: "Jimmy Shergil",
                dob: "12/12/2001"
            }, {
                name: "Alexander Alfred",
                dob: "02/09/1891"
            }, {
                name: "Janice Shroyer",
                dob: "12/01/1982"
            }, {
                name: "Ralph White",
                dob: "11/30/2011"
            }, {
                name: "Deborah T. Decker",
                dob: "10/31/1999"
            }
        ];

        this.state = {"order": this.props.order};
        // initial sort
        this.sortBy(this.props.order);
    }

    //refresh component when props has changed
    componentDidUpdate(prevProps) {
        if(prevProps.order !== this.props.order) {
          this.setState({order: this.props.order});
          this.sortBy(this.props.order);
        }
      }

    sortBy(sortType){
        if(sortType === "name"){

            this.people = this.people.sort(function(a, b){ 

                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1; //nameA comes first
                }
                if (nameA > nameB) {
                    return 1; // nameB comes first
                }
                return 0;  // names must be equal

            });

        } else {

            this.people = this.people.sort(function(a, b){ 

                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA > nameB) {
                    return -1; //nameB comes first
                }
                if (nameA < nameB) {
                    return 1; // nameA comes first
                }
                return 0;  // names must be equal

            });
        }
    }

    render() {
        return (
            <Paper className="width">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header">Name</TableCell>
                            <TableCell className="table-header">Date of Birth</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.people.map(item => {
                                return <TableRow key={[item.name, item.dob].join("-")}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.dob}</TableCell>
                                </TableRow>
                            })
                        }  
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default RecordTable;
