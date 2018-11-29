import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Typography from "@material-ui/core/Typography/Typography";
import axios from "axios";

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }
}

TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
);

let counter = 0;
function createData(name, calories, fat) {
    counter += 1;
    return { id: counter, name, calories, fat };
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar,
});

class Candids extends React.Component {
    state = {
        rows: [
            createData('Cupcake', 305, 3.7),
            createData('Donut', 452, 25.0),
            createData('Eclair', 262, 16.0),
            createData('Frozen yoghurt', 159, 6.0),
            createData('Gingerbread', 356, 16.0),
            createData('Honeycomb', 408, 3.2),
            createData('Ice cream sandwich', 237, 9.0),
            createData('Jelly Bean', 375, 0.0),
            createData('KitKat', 518, 26.0),
            createData('Lollipop', 392, 0.2),
            createData('Marshmallow', 318, 0),
            createData('Nougat', 360, 19.0),
            createData('Oreo', 437, 18.0),
        ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
        page: 0,
        rowsPerPage: 10,
        error: null,
        candids: [],
    };

    componentDidMount() {
        this.getCandids();
        if (!this.pollInterval) {
            this.pollInterval = setInterval(this.getCandids, 10000);
        }
    }

    componentWillUnmount() {
        if (this.pollInterval) clearInterval(this.pollInterval);
        this.pollInterval = null;
    }

    getCandids = () => {
        axios.get('api/candids')
            .then(result => this.setState({
                candids: [...result.data.candids],
            }))
            .catch(error => this.setState({
                error,
            }));
        console.log(this.state.candids);
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { rows, rowsPerPage, page, candids } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, candids.length - page * rowsPerPage);

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Typography variant="h4" gutterBottom component="h2">
                    Candidates
                </Typography>
                <div className={classes.tableContainer}>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableBody>
                            {candids.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(candid => {
                                return (
                                    <TableRow key={candid.cuid} hover>
                                        <TableCell component="th" scope="row">
                                            {candid.fullName}
                                        </TableCell>
                                        <TableCell numeric>{candid.phoneNumber}</TableCell>
                                        <TableCell numeric>{candid.matchedTech}</TableCell>
                                        <TableCell numeric>{candid.socialScore}</TableCell>
                                        <TableCell numeric>{candid.score}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={5}
                                    count={candids.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
                </div>
            </main>
        );
    }
}

Candids.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Candids);
