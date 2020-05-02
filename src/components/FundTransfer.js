import React from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios';

/* Mini Satement component */
class FundTransfer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beneficiaries: []
        }
        this.userId = this.props.match.params.userId
    }

    componentDidMount() {
                axios.get(
                    `http://localhost:3000/users/${this.userId}/beneficiaries`
                )
                .then((response) => {
                    this.setState({beneficiaries: response.data})
                    }
                )
    }

    render() {
        return (
            <div>
                <h2>FundTransfer</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Beneficiaries Name</th>
                        <th>Amount</th>
                        <th>Transfer to</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.beneficiaries.map( (data) => (
                            <tr>
                                <td>{data.userId}</td>
                                <td>{data.fullName}</td>
                                <td><input type="text" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                        ))}
                        
                    </tbody>
                </Table>
            </div>
        )
    }
}

  export default FundTransfer;