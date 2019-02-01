import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '../Common/components/BorderSelect'
import { DetailsWindow as styles } from './styles'
import { requestTypes } from '../../Constant/constants'


class WebHookDetails extends React.Component {

    handleChange = name => event => {
        let webHook = this.props.webHook
        webHook[name] = event.target.value
        this.props.webHookUpdate(webHook)
    };

    render() {
        const { classes, webHook } = this.props;
        return (
            <React.Fragment>
                <Typography color="inherit" noWrap className={classes.title}>
                    Web Hook
                </Typography>
                <TextField
                    id="outlined-name"
                    label="Url"
                    className={classes.textField}
                    value={webHook.url || ""}
                    onChange={this.handleChange('url')}
                    margin="normal"
                    variant="outlined"
                />
                <Select value={webHook.method}
                    name="request type"
                    classes={{ root: classes.requestType }}
                    options={requestTypes}
                    handleChange={this.handleChange('method')}
                />
            </React.Fragment>
        );
    }
}

WebHookDetails.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(WebHookDetails);