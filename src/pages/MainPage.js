import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ConfigList from '../components/ConfigLists/ConfigList'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: "80%",
        margin: " 50px auto",
        height: "80vh",
        padding: "0 20px"
    },
    grid: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
        width: "100%",
    }
})

class MainPage extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <Paper elevation={20} className={classes.root}>
                <Grid container spacing={24} className={classes.grid} alignItems="stretch">
                    <ConfigList />
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(MainPage);
