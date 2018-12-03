import React, { Component } from 'react'
import SearchContext from './SearchContext'

export default class ContextProvider extends Component {
    render() {
        return (
            <SearchContext>
                {this.props.children}
            </SearchContext>
        )
    }
}
