import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    fab: {
        margin: theme.spacing.unit,
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    margin: theme.spacing.unit,
    dialogAction: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        marginTop: 2*theme.spacing.unit,
        marginBottom: 2*theme.spacing.unit,
    }
});

class AddJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            gender: '',
            newJob: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(name);
        console.log(value);


        this.setState(prevState => ({
            newJob: {
                ...prevState.newJob,
                [name]: value,
            }
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        const { newJob } = this.state;

        if(newJob.technologies) {
            newJob.technologies = newJob.technologies.split(',');
        }
        if(newJob.skills) {
            newJob.skills = newJob.skills.split(',');
        }
        if(newJob.questions) {
            newJob.questions = newJob.questions.split(',');
        }
        if(newJob.benefits) {
            newJob.benefits = newJob.benefits.split(',');
        }
        if(newJob.qualifications) {
            newJob.qualifications = newJob.qualifications.split(',');
        }

        // data.technologies = data.technologies ? data.technologies = data.technologies.split(','):data.technologies;
        // data.set('skills', data.get('skills').split(','));
        // data.set('questions', data.get('questions').split(','));
        // data.set('benefits', data.get('benefits').split(','));
        // data.set('qualifications', data.get('qualifications').split(','));
       //const stringfiedNewJob = new FormData(newJob);
        this.handleClose();
        const URL = `/api/jobs`;

        return axios('/api/jobs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            data: newJob,
        })
            .then(response => response.data)
            .catch(error => {
                throw error;
            });

        // axios.post('/api/jobs', { newJob })
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //     });
        // fetch('/api/jobs', {
        //     method: 'POST',
        //     body: newJob,
        // });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Fab onClick={this.handleClickOpen} color="primary" aria-label="Add" className={classes.fab}>
                    <AddIcon />
                </Fab>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Information about the new role</DialogTitle>
                    <DialogContent>
                        <form className={classes.container} onSubmit={this.handleSubmit}>
                            <Grid container>
                                <FormControl fullWidth={true}>
                                    <TextField
                                        id="role-field"
                                        label="Role"
                                        className={classes.textField}
                                        name="role"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.handleInputChange}
                                    />
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <TextField
                                        id="description-field"
                                        label="Description"
                                        className={classes.textField}
                                        name="description"
                                        multiline
                                        rows="4"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.handleInputChange}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl} fullWidth={true}>
                                    <InputLabel htmlFor="candid-gender">Gender</InputLabel>
                                    <Select
                                        value={this.state.gender}
                                        onChange={this.handleInputChange}
                                        input={<Input id="candid-gender" name="gender" />}
                                    >
                                        <MenuItem value="any">
                                            <em>Any</em>
                                        </MenuItem>
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <TextField
                                        id="technologies-field"
                                        label="Technologies"
                                        className={classes.textField}
                                        name="technologies"
                                        multiline
                                        margin="normal"
                                        variant="outlined"
                                        helperText="Separated by commas"
                                        onChange={this.handleInputChange}
                                    />
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <TextField
                                        id="skills-field"
                                        label="Skills"
                                        className={classes.textField}
                                        name="skills"
                                        multiline
                                        rows="4"
                                        margin="normal"
                                        variant="outlined"
                                        helperText="Separated by commas"
                                        placeholder="Customer focused, A team player, Pragmatic"
                                        onChange={this.handleInputChange}
                                    />
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <TextField
                                        id="qualifications-field"
                                        label="Qualifications"
                                        className={classes.textField}
                                        name="qualifications"
                                        multiline
                                        rows="4"
                                        margin="normal"
                                        variant="outlined"
                                        helperText="Separated by commas"
                                        placeholder="CS Degree, Familiarity with React and ExpressJS"
                                        onChange={this.handleInputChange}
                                    />
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <TextField
                                        id="benefits-field"
                                        label="Benefits"
                                        className={classes.textField}
                                        name="benefits"
                                        multiline
                                        rows="8"
                                        margin="normal"
                                        variant="outlined"
                                        helperText="Separated by commas"
                                        placeholder="Flexible Work Hours, Competitive Salaries, Health Insurance, Paid Parental Leave"
                                        onChange={this.handleInputChange}
                                    />
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <TextField
                                        id="jobtype-field"
                                        label="Job Type"
                                        className={classes.textField}
                                        name="jobType"
                                        margin="normal"
                                        variant="outlined"
                                        placeholder="Full-time job"
                                        onChange={this.handleInputChange}
                                    />
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <TextField
                                        id="experiencelevel-field"
                                        label="Experience Level"
                                        className={classes.textField}
                                        name="experienceLevel"
                                        margin="normal"
                                        variant="outlined"
                                        placeholder="5 years"
                                        onChange={this.handleInputChange}
                                    />
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <TextField
                                        id="questions-field"
                                        label="Questions"
                                        className={classes.textField}
                                        name="questions"
                                        multiline
                                        rows="8"
                                        margin="normal"
                                        variant="outlined"
                                        helperText="Separated by commas"
                                        placeholder="What do you look for in the job?, Where do you see yourself in the years?"
                                        onChange={this.handleInputChange}
                                    />
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <TextField
                                        id="minscore-field"
                                        label="Minimum Score"
                                        className={classes.textField}
                                        name="minScore"
                                        multiline
                                        margin="normal"
                                        variant="outlined"
                                        helperText="Candidates with a lower score won't be asked questions"
                                        onChange={this.handleInputChange}
                                    />
                                </FormControl>
                            </Grid>
                            <div className={classes.dialogAction}>
                                <Button onClick={this.handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button color="primary" type="submit">
                                    Add job
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                    {/*<DialogActions>*/}
                        {/*<Button onClick={this.handleClose} color="primary">*/}
                            {/*Cancel*/}
                        {/*</Button>*/}
                        {/*<Button color="primary" for="submit-form">*/}
                            {/*Ok*/}
                        {/*</Button>*/}
                    {/*</DialogActions>*/}
                </Dialog>
            </div>
        );
    }
}

AddJob.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddJob);
