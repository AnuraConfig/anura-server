import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import { JsonEditorStyle as styles } from '../styles'
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';


class JsonEditor extends React.Component {

    render() {
        const { classes, configFile } = this.props;
        return (
            <Paper className={classes.root} elevation={10}>
                <JSONInput
                    id='json-viewer-id'
                    placeholder={configFile || { "Inset you config": "Here" }}
                    locale={locale}
                    theme={"light_mitsuketa_tribute"}
                    height="70vh"
                    width="100%"
                    onChange={({ jsObject }) => this.props.updateConfigFile(jsObject)}
                />
            </Paper>
        );
    }
}

JsonEditor.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(JsonEditor);