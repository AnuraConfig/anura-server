import React from "react";
import { withStyles } from '@material-ui/core/styles';
import NewServiceStepper from '../components/NewServiceComponents/NewServiceStepper'
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
        serviceComplete: false,
        step: 0
    }
    handleAddService = (service) => {
        this.setState({ service, serviceComplete: true, step: 1 })
    }
    reEditService = () => {
        this.setState({ serviceComplete: false, step: 0 })
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
            <NewServiceStepper step={this.state.step} />
        </div>)
    }
}

export default withStyles(styles)(NewServicePage);
