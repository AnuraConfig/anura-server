import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Steper from '../components/NewServiceComponents/Steper'
import ServiceDetails from '../components/NewServiceComponents/ServiceDetails'

const styles = theme => ({
    root: {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: "90%",
        margin: '0 auto'
    }
})

class NewServicePage extends React.Component {
    render() {
        const { classes } = this.props
        return (<div className={classes.root}>
            <div>
                <ServiceDetails />
            </div>
            <Steper />
        </div>)
    }
}

export default withStyles(styles)(NewServicePage);
