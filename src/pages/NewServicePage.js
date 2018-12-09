import React from "react";
import { withStyles } from '@material-ui/core/styles';
import NewServiceStepper from '../components/NewServiceComponents/NewServiceStepper'
import ServiceDetails from '../components/NewServiceComponents/Service/ServiceDetails'
import ServiceDetailsComplete from '../components/NewServiceComponents/Service/ServiceDetailsComplete'
import ConfigContainer from '../components/NewServiceComponents/config/ConfigContainer'
import Grid from '@material-ui/core/Grid';

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
        const { step, service } = this.state
        const { classes } = this.props
        return (<div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={3}>
                    {this.state.serviceComplete ?
                        <ServiceDetailsComplete service={service} editService={this.reEditService} /> :
                        <ServiceDetails service={service} addServiceCallback={this.handleAddService} />
                    }
                </Grid>
                <Grid item xs={12} sm={9}>
                    {step === 1 && <ConfigContainer />}
                </Grid>
            </Grid>
            <NewServiceStepper step={this.state.step} />
        </div>)
    }
}

export default withStyles(styles)(NewServicePage);
