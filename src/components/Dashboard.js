import React, { Component } from 'react';

// react bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Redirect, Route } from 'react-router-dom';

// user created component
import AccountSummary from './AccountSummary';
import MiniStatement from './MiniStatement';
import FundTransfer from './FundTransfer';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true
        }

        // console.log('loc_state', this.props.location.state)
    }

    signOut = () => {
        this.setState({ loggedIn : false })
    }

    render() {
        const { loggedIn } = this.state;
        const { fullName, userId } = {fullName: 'Jordan Walky', userId: 1}//this.props.location.state
        return (
            
            loggedIn ? 
            <>
                <Row>
                    <Col sm={6}>
                        <h1>{fullName}</h1>
                    </Col>
                    <Col sm={6}>
                        <button className="Signout" onClick={this.signOut} style={{marginTop: '15px'}} >Sign Out</button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <ul>
                            <li>
                                <Link to={`/accountsummary/${userId}`}>Account Summary</Link>
                            </li>
                            <li>
                                <Link to={`/ministatement/${userId}`}>Mini Statement</Link>
                            </li>
                            <li>
                                <Link to={`/fundtransfer/${userId}`}>Fund Transfer</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col sm={8}>
                    {/* Route components are rendered if the path prop matches the current URL */}
                    <Route path="/accountsummary/:userId" component={AccountSummary} />
                    <Route path="/ministatement/:userId" component={MiniStatement} />
                    <Route path="/fundtransfer/:userId" component={FundTransfer} />
                    </Col>
                </Row>
            </>
                : <Redirect to="/" />
        )
    }
}

export default Dashboard;