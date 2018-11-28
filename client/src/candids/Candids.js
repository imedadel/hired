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
            error: null
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
                        isLoaded: true,
                        error
                    });
                })
    }

    render() {
        const { candids } = this.state;
        return (
            <div>
                {
                    candids.map(candid => (
                        <p key={candid.cuid}>
                            {candid.fullName} {candid.dateAdded}
                        </p>
                    ))
                }
            </div>
        );
    }
}

export default Candids;