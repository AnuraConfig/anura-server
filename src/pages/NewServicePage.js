import React from "react";
import { withStyles } from '@material-ui/core/styles';
import NewServiceStepper from '../components/NewServiceComponents/NewServiceStepper'
import ServiceDetails from '../components/NewServiceComponents/Service/ServiceDetails'
import ServiceDetailsComplete from '../components/NewServiceComponents/Service/ServiceDetailsComplete'
import ConfigContainer from '../components/NewServiceComponents/config/ConfigContainer'
import FinishConfigList from '../components/NewServiceComponents/config/FinishConfigList'
import CompleteStep from '../components/NewServiceComponents/CompleteStep'
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
const STEPS = {
    serviceDetails: 0,
    configDetails: 1,
    completeStep: 2
}

class NewServicePage extends React.Component {
    state = {
        service: {},
        serviceComplete: false,
        currentConfig: {},
        configs: [],
        step: STEPS.serviceDetails,
    }
    editConfig = (key) => {
        this.setState(p => ({
            editedID: key,
            currentConfig: p.configs[key],
            step: STEPS.configDetails
        }))
    }
    handleAddService = (service) => {
        this.setState({ service, serviceComplete: true, step: STEPS.configDetails })
    }
    reEditService = () => {
        this.setState({ serviceComplete: false, step: STEPS.serviceDetails })
    }
    addConfigCallback = (config) => {
        this.setState(p => {
            const configs = p.configs
            if (p.editedID !== undefined)
                configs[p.editedID] = config
            else
                configs.push(config)
            return { configs, currentConfig: {}, step: STEPS.completeStep, editedID: undefined }
        })
    }
    cancelConfigEdit = () => {
        return { currentConfig: {}, step: STEPS.completeStep, editedID: undefined }
    }
    addEnvironment = () => {
        this.setState({
            step: STEPS.configDetails
        })
    }

    render() {
        const { step, service, currentConfig, configs, editedID } = this.state
        const { classes } = this.props
        return (<div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={3}>
                    {this.state.serviceComplete ?
                        <React.Fragment>
                            <ServiceDetailsComplete service={service} editService={this.reEditService} />
                            {configs && configs.length !== 0 &&
                                <FinishConfigList configs={configs} editConfig={this.editConfig} isUpdate={step !== STEPS.configDetails} />
                            }
                        </React.Fragment> :
                        <ServiceDetails service={service} addServiceCallback={this.handleAddService} />

                    }
                </Grid>
                <Grid item xs={12} sm={9}>
                    {step === STEPS.configDetails && <ConfigContainer editedID={editedID}
                        cancel={this.props.cancelConfigEdit} cancelable={configs.length !== 0}
                        config={currentConfig} addConfigCallback={this.addConfigCallback} />}
                    {step === STEPS.completeStep && <CompleteStep addEnvironment={this.addEnvironment}
                        complete={() => { console.log("TODO: connect to complete api ") }} />}
                </Grid>
            </Grid>
            <NewServiceStepper step={this.state.step} />
        </div>)
    }
}

export default withStyles(styles)(NewServicePage);
