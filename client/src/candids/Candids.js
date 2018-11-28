import React, { Component } from 'react';
import 'whatwg-fetch';
import CandidsList from './CandidsList';
import CandidsForm from './CandidsList';
import DATA from './data';


class Candids extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candids: [],
            error: null,
            fullName: ''
        };
        this.pollInterval = null;
    }

    componentDidMount() {
        this.loadCandidsFromServer();
        if(!this.pollInterval) {
            this.pollInterval = setInterval(this.loadCandidsFromServer, 300000);
        }
    }

    componentWillUnmount() {
        if (this.pollInterval) clearInterval(this.pollInterval);
        this.pollInterval = null;
    }

    loadCandidsFromServer = () => {
        fetch('api/candids')
            .then(data => data.json())
            .then((res) => {
                this.setState({
                    candids: res.candids,
                });
                console.log(res.candids);
                console.log(this.state.candids.fullName);
            },
                (error) => {
                    this.setState({
                        error
                    });
                })
    }

    onChangeInfo = (e) => {
        const newState = { ...this.state };
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    submitNewCandid = (e) => {
        e.preventDefault();
        const { fullName } = this.state;
        if (!fullName) return;
        fetch('api/candids', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName }),
        })
            .then(res => res.json())
            .then((res) => {
            this.setState({ fullName: '' });
        });
    }

    render() {
        const { candids, fullName } = this.state;
        return (
            <div>
                {
                    candids.map(candid => (
                        <p key={candid.cuid}>
                            {candid.fullName} {candid.dateAdded}
                        </p>
                    ))
                }
                <form onSubmit={ this.submitNewCandid } >
                    <input
                        type="text"
                        name="fullName"
                        value={ fullName }
                        onChange={ this.onChangeInfo }
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Candids;