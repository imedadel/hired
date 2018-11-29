import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

function JobsCards(props) {
    const { classes, title, image, description } = props;
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="./undraw_hiring_cyhs.png"
                        title={title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography component="p">
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" color="primary">
                            Edit
                        </Button>
                        <Button size="medium" color="primary">
                            Delete
                        </Button>
                    </CardActions>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

JobsCards.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobsCards);
