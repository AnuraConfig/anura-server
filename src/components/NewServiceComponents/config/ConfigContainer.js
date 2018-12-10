import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import ConfigDetails from './ConfigDetails'
import JsonEditor from './JsonEditor'

export default class ConfigContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            configFile: props.config || {}
        }
    }
    updateConfig = (config) => {
        this.setState({
            configFile: config
        })
    }
    addConfigCallback = (config) => {
        this.props.addConfigCallback({
            ...config,
            configFile: this.state.configFile,
        })
        this.setState({ configFile: {} })

    }
    render() {
        const config = this.props.config
        return (
            <Grid container spacing={24}>
                <Grid item xs={12} sm={4}>
                    <ConfigDetails config={config} addConfigCallback={this.addConfigCallback} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <JsonEditor configFile={config ? config.configFile : undefined} updateConfigFile={this.updateConfig} />
                </Grid>

            </Grid>
        )
    }
}
