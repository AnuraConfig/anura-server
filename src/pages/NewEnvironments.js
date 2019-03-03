import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import NewServiceStepper from '../components/NewServiceComponents/NewServiceStepper'
import ServiceDetails from '../components/NewServiceComponents/Service/ServiceDetails'
import ServiceDetailsComplete from '../components/NewServiceComponents/Service/ServiceDetailsComplete'
import ConfigContainer from '../components/NewServiceComponents/config/ConfigContainer'
import FinishConfigList from '../components/NewServiceComponents/config/FinishConfigList'
import CompleteStep from '../components/NewServiceComponents/CompleteStep'
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom'

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

const GET = gql`
mutation AddService($service:InputService!){
  newService(service:$service){
    success,
    error
  }
}
`

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
    getConfigs = () => {
        return {
            environments: this.state.configs.map(i => ({
                name: i.name,
                config: {
                    data: i.configFile,
                    type: i.type
                }
            }))
        }
    }
    mutationRendering = (data, error) => {
        if (data && data.newService && data.newService.success) {
            toast.success("service added")
            this.props.history.push('/')
        }
        if (error) {
            toast.error(data.newService.error)
        }
    }
    render() {
        const { step, service, currentConfig, configs, editedID } = this.state
        const { classes } = this.props
        return (<div className={classes.root}>
            
        </div>)
    }
}

export default withRouter(withStyles(styles)(NewServicePage));
