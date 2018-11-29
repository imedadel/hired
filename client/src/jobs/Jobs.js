import React, {Component} from 'react';
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
    }


    render() {
        const {classes} = this.props;
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
                        spacing='8'
                    >
                        <JobsCards title="React Developer" description="ReactJS, ExpressJS, NodeJS, MongoDB"
                                           link="/candids"/>
                        <JobsCards title="Graphic Designer"
                                           description="Photoshop, Illustrator, inVision Studio"
                                           link="/jobs"/>
                        <JobsCards title="Data Scientist"
                                           description="Machine Learning, Tensorflow, ..."
                                           link="/stats"/>
                        <JobsCards title="Copy Writer"
                                           description="Markdown, Word, English Language"
                                           link="/explore"/>

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