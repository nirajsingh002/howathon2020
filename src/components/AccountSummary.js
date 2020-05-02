import React from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios';
/* Account summary component */
class AccountSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountSummary: []
        }
        this.userId = this.props.match.params.userId
    }

    componentDidMount() {
                axios.get(
                    `http://localhost:3000/users/${this.userId}/accounts`
                )
                .then((response) => {
                    this.setState({accountSummary: response.data})
                    }
                )
    }
    render() {
        const {id = 1, availableBalance = 1000} = this.state.accountSummary.length && this.state.accountSummary[0];
        return (
            <div>
                <h2>AccountSummary</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Account Balance</th>
                            <th>Fixed Deposites</th>
                            <th>Recurring Deposites</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{id}</td>
                            <td>{availableBalance}</td>
                            <td>500</td>
                            <td>500</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default AccountSummary;