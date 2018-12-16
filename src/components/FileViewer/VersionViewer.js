import React from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import JsonViewer from './JsonViewer';
import Paper from '@material-ui/core/Paper/Paper';
import { getMaxVersion, getMaxVersionIndex } from './VersionHelpers'

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    viewer: {
        margin: '2vh 1vw',
        maxHeight: '67vh',
        overflowY: "auto"
    },
    paperRoot: {
    }
});

class VersionViewer extends React.PureComponent {
    constructor(props) {
        super(props)
        const maxVersion = getMaxVersion(props.configs)
        this.state = {
            maxVersion,
            value: getMaxVersionIndex(maxVersion, props.configs),
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            const maxVersion = getMaxVersion(this.props.configs)
            this.setState({
                maxVersion,
                value: getMaxVersionIndex(maxVersion, this.props.configs),
            })
        }

    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes, configs } = this.props;
        const { value, maxVersion } = this.state
        const index = value >= configs.length ? configs.length - 1 : value
        return (
            <Paper className={classes.paperRoot} >
                <Grid item xs={12} sm={12}>
                    <div className={classes.root}>
                        <AppBar position="static" color="inherit">
                            <Tabs
                                value={index}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                scrollable
                                scrollButtons="auto"
                            >
                                {configs.map((item, key) => (
                                    <Tab key={key} label={maxVersion === item.version ?
                                        `newest (${item.version + 1})` : `Version ${item.version + 1}`} />
                                ))}
                            </Tabs>
                        </AppBar>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.viewer}>
                    <JsonViewer config={configs[index]} />
                </Grid>
            </Paper>
        );
    }
}

VersionViewer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VersionViewer);
