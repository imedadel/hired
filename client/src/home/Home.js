import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from '@material-ui/core/Grid';
import SimpleLineChart from "./SimpleLineChart";
import SimpleTable from "./SimpleTable";
import QuickActionsCards from "./QuickActionsCards";

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
});

class Home extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {classes} = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Typography variant="h4" gutterBottom component="h2">
                    Submissions
                </Typography>
                <Typography component="div" className={classes.chartContainer}>
                    <SimpleLineChart/>
                </Typography>
                <Typography variant="h4" gutterBottom component="h2">
                    Quick Actions
                </Typography>
                <div className={classes.tableContainer}>
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                        spacing='8'
                    >
                        <QuickActionsCards title="Review Candidates" description="See the full list of candidates"
                                               image="./undraw_programming_2svr.png" link="/candids"/>
                        <QuickActionsCards title="Manage Jobs"
                                                      description="Edit, add, and delete jobs"
                                                      image="./undraw_add_user_ipe3.png" link="/jobs"/>
                        <QuickActionsCards title="Statistics"
                                                      description="See insights about candidates and employees"
                                                      image="./undraw_pie_chart_6efe.png" link="/stats"/>
                        <QuickActionsCards title="Explore GitHub"
                                                       description="Find local professionals on GitHub"
                                                       image="./undraw_people_search_wctu.png" link="/explore"/>

                    </Grid>
                </div>
            </main>
        );
    }
}


// const Jobs = () => (
//     <main>
//         hello!
//     </main>
// );

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);