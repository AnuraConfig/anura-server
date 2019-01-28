import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import { JsonEditorStyle as styles } from '../styles'
import AceEditor from 'react-ace';
import '../../Common/braceImport'


class Editor extends React.Component {
    render() {
        const { classes, configFile } = this.props;
        return (
            <Paper className={classes.root} elevation={10}>
                <AceEditor
                    id='json-viewer-id'
                    height="70vh"
                    width="100%"
                    mode="json"
                    theme="github"
                    value={configFile}
                    onChange={(data) => this.props.updateConfigFile(data)}
                    name="NEW_DIV"
                />
            </Paper>
        );
    }
}

Editor.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Editor);