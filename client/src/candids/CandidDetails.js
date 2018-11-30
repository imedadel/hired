import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from '@material-ui/core/Grid';
import SchoolIcon from '@material-ui/icons/School';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';

// TODO: Add real data
const data = [
    { subject: 'Matched Tech', A: 100, fullMark: 100 },
    { subject: 'Score', A: 50, fullMark: 100 },
    { subject: 'Social Score', A: 100, fullMark: 100 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 100 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 100 },
    { subject: 'History', A: 65, B: 85, fullMark: 100 },
];

const CandidIsStudent = () => {
    return (
        <Tooltip title="Student">
            <SchoolIcon/>
        </Tooltip>
    );
};

const CandidIsEmployed = () => {
    return (
        <Tooltip title="Employed">
            <BusinessCenterIcon/>
        </Tooltip>
    );
};

const CandidIsIntern = () => {
    return (
        <Tooltip title="Intern">
            <RoomServiceIcon/>
        </Tooltip>
    );
};

const CandidIsInvited = () => {
    return (
        <Tooltip title="Invited">
            <DoneIcon/>
        </Tooltip>
    );
};

const CandidIsConfirmed = () => {
    return (
        <Tooltip title="Confirmed">
            <DoneAllIcon/>
        </Tooltip>
    );
};

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
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
});

class CandidDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidDetail: [],
            error: null,
            isLoading: true,
        };
    }

    componentDidMount() {
        console.log(this.props.match.params.cuid);
        const URL = `/api/candids/${ this.props.match.params.cuid }`;
            axios.get(URL)
                .then(result => this.setState({
                    candidDetail: result.data.candid,
                    isLoading: false,
                }))
                .catch(error => this.setState({
                    error,
                }));
            console.log(this.state.candidDetail);
    }


    render() {
        const {classes} = this.props;
        const { candidDetail } = this.state;
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Typography variant="h2" gutterBottom component="h2">
                    { candidDetail.fullName } {candidDetail.isStudent ? <CandidIsStudent /> : null} {candidDetail.hasInternship ? <CandidIsIntern /> : null} {candidDetail.hasJob ? <CandidIsEmployed /> : null} {candidDetail.isInvited ? <CandidIsInvited /> : null} {candidDetail.isConfirmed ? <CandidIsConfirmed /> : null}
                </Typography>
                <Grid container spacing={16} justify="center">
                    <Grid item>
                        <Paper className={classes.root} elevation={1}>
                            <Typography variant="h3" gutterBottom>
                                University
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                { candidDetail.universitiesName }
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className={classes.root} elevation={1}>
                            <Typography variant="h3" gutterBottom>
                                Clubs
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                { candidDetail.clubsName }
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className={classes.root} elevation={1}>
                            <Typography variant="h3" gutterBottom>
                                Contacts
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                Email
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                { candidDetail.email }
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                Number
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                { candidDetail.phoneNumber }
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                Social Links
                            </Typography>
                            <Typography variant="button" gutterBottom>
                                <p><a href={ this.state.isLoading ? null : candidDetail.socialLinks[0] } >GitHub</a></p>
                            </Typography>
                            <Typography variant="button" gutterBottom>
                                <p><a href={ this.state.isLoading ? null : candidDetail.socialLinks[1] } >LinkedIn</a></p>
                            </Typography>
                            <Typography variant="button" gutterBottom>
                                <p><a href={ this.state.isLoading ? null : candidDetail.socialLinks[2] } >StackOverFlow</a></p>
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className={classes.root} elevation={1}>
                            <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis/>
                                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                            </RadarChart>
                        </Paper>
                    </Grid>
                </Grid>
            </main>
        );
    }
}


CandidDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CandidDetails);