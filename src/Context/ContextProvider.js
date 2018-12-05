import React, { Component } from 'react'
import SearchContext from './SearchContext'
import SelectFileContextProvider from './SelectFileContext'

export default class ContextProvider extends Component {
    render() {
        return (
            <SelectFileContextProvider>
                <SearchContext>
                    {this.props.children}
                </SearchContext>
            </SelectFileContextProvider>
        )
    }
}
