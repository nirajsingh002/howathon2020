import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';

class Form extends Component {
    constructor() {
        super();

        this.state = {
            value: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { value } = event.target;
        this.setState(() => {
            return {
                value
            };
        });
    }

    render() {
        return (
            <>
            <Button>Click me</Button>
            <h3>Form</h3>
            <form>
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </form>
            </>
        )
    }
}

export default Form;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Form />, wrapper) : false;