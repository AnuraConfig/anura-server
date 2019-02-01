import React, { Component } from 'react'
import SearchContext from './SearchContext'
import SelectFileContextProvider from './SelectFileContext'
import ConfigSettingsContextProvider from './ConfigTypeContext'

export default class ContextProvider extends Component {
    render() {
        return (
            <ConfigSettingsContextProvider>
                <SelectFileContextProvider>
                    <SearchContext>
                        {this.props.children}
                    </SearchContext>
                </SelectFileContextProvider>
            </ConfigSettingsContextProvider>
        )
    }
}
