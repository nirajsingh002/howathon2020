import React, { Component } from 'react'
// react bootstrap components
import Container from 'react-bootstrap/Container'

// User created components
// import Signinform from './Signinform';
import Header from './Header';
// import Signupform from './Signupform';
// import Dashboard from './Dashboard';
import Main from './Main';

class App extends Component {

    render() {
        return (
            <Container>
                <Header></Header>
                <Main></Main>
                {/* <Signupform></Signupform>
                <Dashboard></Dashboard> */}
            </Container>
        )
    }
}

export default App;