import React from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios';

/* Mini Satement component */
class MiniStatement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            miniStatement: []
        }
        this.userId = this.props.match.params.userId
    }

    componentDidMount() {
                axios.get(
                    `http://localhost:3000/users/${this.userId}/history`
                )
                .then((response) => {
                    this.setState({miniStatement: response.data})
                    }
                )
    }

    render() {
        
        return (
            <div>
                <h2>MiniStatement</h2>
                <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.miniStatement.map( (data) => (
                            <tr>
                                <td>{data.id}</td>
                                <td>02/05/2020</td>
                                <td>{data.amount} <span style={{color: 'green'}}>{data.type}</span></td>
                            </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </div>
        )
    }
}

export default MiniStatement;