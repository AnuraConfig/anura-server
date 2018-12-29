import React, { Component } from 'react'
import ReactJson from 'react-json-view'
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit'
import { withStyles } from '@material-ui/core/styles'
import { JsonViewer as styles } from './styles'

class JsonViewer extends Component {
    render() {
        const { config, classes, editable } = this.props
        return (
            <div>
                {editable && <IconButton className={classes.editButton} aria-label="Edit" onClick={this.props.setEditMode}>
                    <Edit />
                </IconButton>}
                <ReactJson src={JSON.parse(config.data)} />
            </div>
        )
    }
}

JsonViewer.propTypes = {
    config: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(JsonViewer)

