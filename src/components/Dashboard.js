import React, { Component } from 'react';

// react bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Redirect, Route, Switch} from 'react-router-dom';

// user created component
import AccountSummary from './AccountSummary';
import MiniStatement from './MiniStatement';
import FundTransfer from './FundTransfer';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true,
            fullName: this.props.location.state.fullName,
            userId: this.props.location.state.userId,
        }

        console.log('loc_state', this.props.location)
        // console.log('path', path, 'url', url);
        this.path = this.props.location.pathname;
    }

    signOut = () => {
        this.setState({ loggedIn : false })
    }


    render() {
        const { loggedIn, fullName, userId } = this.state;
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
                                <Link to={`${this.path}/accountsummary/${userId}`}>Account Summary</Link>
                            </li>
                            <li>
                                <Link to={`${this.path}/ministatement/${userId}`}>Mini Statement</Link>
                            </li>
                            <li>
                                <Link to={`${this.path}/fundtransfer/${userId}`}>Fund Transfer</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col sm={8}>
                    {/* Route components are rendered if the path prop matches the current URL */}
                    <Switch>
                        <Route exact path={`${this.path}`}>
                            <h3>Please select a action.</h3>
                        </Route>
                        <Route path={`${this.path}/accountsummary/:userId`} component={AccountSummary} />
                        <Route path={`${this.path}/ministatement/:userId`} component={MiniStatement} />
                        <Route path={`${this.path}/fundtransfer/:userId`} component={FundTransfer} />
                    </Switch>
                    </Col>
                </Row>
            </>
                : <Redirect to="/" />
        )
    }
}

export default Dashboard;