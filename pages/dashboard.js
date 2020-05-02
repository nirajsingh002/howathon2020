import React, { Component } from 'react';

// react bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
// import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true
        }

        console.log('loc_state', this.props.location.state)
    }

    signOut = () => {
        this.setState({ loggedIn : false })
    }

    render() {
        const { loggedIn } = this.state;
        const { fullName } = this.props.location.state
        return (
            
            loggedIn ? 
            <>
                <Row>
                    <Col sm={4}>
                    <h1>{fullName}</h1>
                        <button className="Signout" onClick={this.signOut} >Sign Out</button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <h1>List of actions</h1>
                        <ul>
                            <li>Mini Statement</li>
                            <li>Fixed Deposite Summary</li>
                            <li>Recurring Deposite Summary</li>
                        </ul>
                    </Col>
                    <Col sm={8}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                        </Table>
                    </Col>
                </Row>
            </>
                : null
        )
    }
}

// export default Dashboard;