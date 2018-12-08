import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Steper from '../components/NewServiceComponents/Steper'
import ServiceDetails from '../components/NewServiceComponents/Service/ServiceDetails'
import ServiceDetailsComplete from '../components/NewServiceComponents/Service/ServiceDetailsComplete'

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
    state = {
        service: {},
        serviceComplete: false
    }
    handleAddService = (service) => {
        this.setState({ service, serviceComplete: true })
    }
    reEditService = () => {
        this.setState({ serviceComplete: false })
    }
    render() {
        const { classes } = this.props
        return (<div className={classes.root}>
            <div>
                {
                    this.state.serviceComplete ?
                        <ServiceDetailsComplete service={this.state.service} editService={this.reEditService} /> :
                        <ServiceDetails service={this.state.service} addServiceCallback={this.handleAddService} />
                }
            </div>
            <Steper />
        </div>)
    }
}

export default withStyles(styles)(NewServicePage);
