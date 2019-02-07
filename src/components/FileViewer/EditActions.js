import React, { Component } from 'react'
import Setting from '@material-ui/icons/Settings'
import Button from '@material-ui/core/Button';
import { EditActions as styles } from './styles'
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

class EditActions extends Component {
    render() {
        const { classes, changeData, updateConfig, serviceId, envName, toggleMenu, changeSettings, type } = this.props
        return (
            <div>
                <IconButton className={classes.settingButton}
                    aria-label="Edit"
                    onClick={() => {
                        changeSettings({ type })
                        toggleMenu()
                    }}>
                    <Setting />
                </IconButton>
                <Button variant="outlined" color="secondary" className={classes.cancel}
                    onClick={this.cancelUpdate}>
                    Cancel
                </Button>
                <Button variant="outlined" color="primary" className={classes.saveChanges}
                    onClick={() => {
                        const variables = {
                            serviceId: serviceId,
                            environmentName: envName,
                            data: changeData
                        }
                        updateConfig({ variables })
                    }}>
                    Save changes
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(EditActions)