import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import { ServiceDetailsComplete as styles } from '../styles'
import Chip from '@material-ui/core/Chip';


class ServiceDetailsComplete extends React.Component {
    constructor(props) {
        super(props)
        this.state = props.service
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root} elevation={15}>
                <Typography className={classes.title} variant="headline" color="inherit" >
                    {this.state.name}
                </Typography>
                <Typography className={classes.title} variant="subtitle1" color="inherit" paragraph>
                    {this.state.description}
                </Typography>
                <Typography className={classes.title} variant="subtitle2" color="inherit" >
                    web hooks :
                </Typography>
                <div className={classes.webHookContainer}>
                    <Chip
                        label={this.state.requestType}
                        className={classes.chip}
                        color="primary"
                        variant="outlined"
                    />
                    <Typography className={classes.webHookText} variant="body1" color="inherit">
                        {this.state.url}
                    </Typography>
                </div>
            </Paper>
        );
    }
}

ServiceDetailsComplete.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(ServiceDetailsComplete);