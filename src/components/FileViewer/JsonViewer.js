import React, { Component } from 'react'
import ReactJson from 'react-json-view'
import PropTypes from 'prop-types';

class JsonViewer extends Component {
    render() {
        const { config } = this.props
        return (
            <div>
                <ReactJson src={JSON.parse(config.data)} />
            </div>
        )
    }
}

JsonViewer.propTypes = {
    config: PropTypes.object.isRequired,
}

export default JsonViewer

