import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Signinform from './Signinform';
import Signupform from './Signupform';
import Dashboard from './Dashboard';

class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Signinform}/>
                <Route path='/signupform' component={Signupform}/>
                <Route path='/dashboard' component={Dashboard}/>
            </Switch>
        )
    }
}

export default Main;