import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from '@material-ui/core/Grid';
import JobsCards from "./JobsCards";
import AddJob from "./AddJob";

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        // height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
    fab: {
        margin: theme.spacing.unit,
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
});

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            error: null,
        };
    }

    componentDidMount() {
        this.getJobs();
        if(!this.pollInterval) {
            this.pollInterval = setInterval(this.getJobs, 30000);
        }

        // axios.get('api/jobs')
        //     .then(result => this.setState({
        //         jobs: result.data.jobs,
        //     }))
        //     .catch(error => this.setState({
        //         error,
        //     }));
        // console.log(this.state.jobs);
    }

    componentWillUnmount() {
        if (this.pollInterval) clearInterval(this.pollInterval);
        this.pollInterval = null;
    }

    getJobs = () => {
        axios.get('api/jobs')
            .then(result => this.setState({
                jobs: result.data.jobs,
            }))
            .catch(error => this.setState({
                error,
            }));
        console.log(this.state.jobs);
    }


    render() {
        const {classes} = this.props;
        const { jobs } = this.state;
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Typography variant="h4" gutterBottom component="h2">
                    Job Board
                </Typography>

                <div className={classes.tableContainer}>
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                        spacing={8}
                    >
                        {
                            jobs.map(job => (
                                <JobsCards key={job.cuid} title={job.role} description={job.description} />
                            ))
                        }
                    </Grid>
                </div>
                <AddJob/>
            </main>
        );
    }
}


// const Jobs = () => (
//     <main>
//         hello!
//     </main>
// );

Jobs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Jobs);