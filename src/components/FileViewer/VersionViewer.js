import React from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import JsonViewer from './JsonViewer';
import Paper from '@material-ui/core/Paper/Paper';

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
        display: 'grid'
    }
});

class VersionViewer extends React.PureComponent {
    constructor(props) {
        super(props)
        const maxVersion = this.getMaxVersion(props.configs)
        this.state = {
            maxVersion,
            value: this.getMaxVersionIndex(maxVersion, props.configs),
        };
    }
    componentDidUpdate(newProps) {
        if (newProps !== this.props) {
            const maxVersion = this.getMaxVersion(newProps.configs)
            this.setState({
                maxVersion,
                value: this.getMaxVersionIndex(maxVersion, newProps.configs),
            })
        }

    }

    getMaxVersionIndex = (maxVersion, configs) => {
        for (let index in configs) {
            if (configs[index] && configs[index].version === maxVersion)
                return parseInt(index)
        }
        return -1
    }

    getMaxVersion = (configs) => {
        let max = 0
        for (let config of configs) {
            if (config.version > max) {
                max = config.version
            }
        }
        return parseInt(max)
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes, configs } = this.props;
        const { value, maxVersion } = this.state.value
        const index = (value >= configs.length ? configs.length - 1 : value) || configs.length - 1
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
                                    <Tab key={key} label={maxVersion === item.version ? `newest (${item.version})` : `Version ${item.version}`} />
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
