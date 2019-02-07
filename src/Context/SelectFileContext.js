import React, { Component } from 'react'
import { SelectFileContext } from './Contexts'

export default class SelectFileContextProvider extends Component {
    state = {
        selectedService: "",
        selectedServiceName: "",
        selectedEnvironment: ""
    }

    clickFile = (selectedService, selectedServiceName, selectedEnvironment) => {
        this.setState({
            selectedService, selectedServiceName, selectedEnvironment
        })
    }

    render() {
        const value = {
            ...this.state,
            clickFile: this.clickFile
        }
        console.log(value)
        return (
            <SelectFileContext.Provider value={value}>
                {this.props.children}
            </SelectFileContext.Provider>
        )
    }
}