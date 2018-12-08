import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Select from './FormControl/BorderSelect'
import Button from '@material-ui/core/Button';
import { ServiceDetails as styles } from './styles'
import { requestTypes } from '../../Constant/constants'


class ServiceDetails extends React.Component {
    state = {
        labelWidth: 0,
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root} elevation={15}>
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                    Service
                </Typography>
                <TextField
                    id="outlined-name"
                    label="Name"
                    className={classNames(classes.textField, classes.nameField)}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-description-flexible"
                    label="description"
                    multiline
                    rows={3}
                    rowsMax="6"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <Typography color="inherit" noWrap className={classes.title}>
                    Web Hook
                </Typography>
                <Select value={this.state.requestType}
                    name="request type"
                    classes={{ root: classes.requestType }}
                    options={requestTypes}
                    handleChange={this.handleChange('requestType')}
                />
                <TextField
                    id="outlined-name"
                    label="Url"
                    className={classes.textField}
                    value={this.state.url}
                    onChange={this.handleChange('url')}
                    margin="normal"
                    variant="outlined"
                />
                <div className={classes.buttonContainer}>
                    <Button onClick={() => this.props.addServiceCallback(this.state)}
                        variant="outlined" color="primary" className={classes.button}>
                        Create
                    </Button>
                </div>
            </Paper>
        );
    }
}

ServiceDetails.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(ServiceDetails);