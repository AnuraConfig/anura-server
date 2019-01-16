import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ConfigList from '../components/ConfigLists/ConfigList'
import FileViewer from '../components/FileViewer/FileViewer'
import { withStyles } from '@material-ui/core/styles';
import LoadingError from "../components/Common/LoadingError";

const styles = theme => ({
    root: {
        width: "80%",
        margin: " 50px auto",
        height: "80vh",
        padding: "0 20px"
    },
    grid: {
        marginTop: '5px',
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
    }
})

class MainPage extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <div className={"main"}>
                {/*<ConfigList />*/}
                {/*<FileViewer />*/}
                <LoadingError/>
            </div>
        )
    }
}

export default withStyles(styles)(MainPage);
