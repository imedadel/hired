import React, { Component } from 'react';
import 'whatwg-fetch';
import CandidsList from './CandidsList';
import CandidsForm from './CandidsList';
import DATA from './data';


class OldCandids extends Component {
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

    onUpdateCandidateInfo = (cuid) => {
        const oldCandidateInfo = this.state.candids.find(c => c.cuid === cuid);
        if (!oldCandidateInfo) return;
        this.setState({
            fullName: oldCandidateInfo.fullName,
            updateId: cuid
        });
    }

    onDeleteCandid = (cuid) => {
        const i = this.state.candids.findIndex(c => c.cuid === cuid);
        const candids = [
            ...this.state.candids.slice(0, i),
            ...this.state.candids.slice(i + 1),
        ];
        this.setState({ candids });
        fetch(`api/candids/${cuid}`, { method: 'DELETE' })
            .then(res => res.json()).then((res) => {
            if (!res.success) this.setState({ error: res.error });
        });
    }

    submitCandidate= (e) => {
        e.preventDefault();
        const { fullName, updateId } = this.state;
        // if (!author || !text) return;
        if (updateId) {
            this.submitUpdatedCandid();
        } else {
            this.submitNewCandid();
        }
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

    submitUpdatedCandid = () => {
        const { fullName, updateId } = this.state;
        fetch(`/api/candids/${updateId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName }),
        }).then(res => res.json()).then((res) => {
            this.setState({ fullName: '', updateId: null });
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
                            <a onClick={() => { this.onUpdateCandidateInfo(candid.cuid); }}>update</a>
                            <a onClick={() => { this.onDeleteCandid(candid.cuid); }}>delete</a>
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

export default OldCandids;