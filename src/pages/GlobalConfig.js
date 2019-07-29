import React, { Component } from 'react'
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Query } from "react-apollo";
import { GET_GLOBAL_VAR } from '../Constant/GqlQueries'
import GlobalConfigTable from '../components/GlobalConfig/GlobalConfigTable'
import '../styles/components/GlobalVariable/GlobalVariable.scss'

const columns = [
  { title: 'Key', field: 'key' },
  { title: 'Value', field: 'value' },
  { title: 'Reference Count', field: 'count', editable: 'never' },
]

const styles = () => ({
  saveButton: {
    marginLeft: "10%"
  }
})

class GlobalVariable extends Component {
  state = {}

  parseData(data) {
    if (this.state.data) return this.state.data
    if (!data || !data.getGlobalVariable) return []
    return Object.entries(JSON.parse(data.getGlobalVariable))
      .map(([key, value]) => ({ key, value, count: "UnKnown" }))
  }

  render() {
    const { classes } = this.props
    return (
      <Query query={GET_GLOBAL_VAR}>
        {({ loading, error, data, refetch }) => {
          if (error) return (<div >Error</div>)
          return (
            <div className="global-config-table">
              <GlobalConfigTable
                isLoading={loading}
                columns={columns}
                data={this.parseData(data)}
                updateData={(data) => {
                  this.setState({ data })
                }} />
              <Button size="large" variant="outlined" color="primary" className={classes.saveButton}>
                Save
              </Button>
            </div>)
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(GlobalVariable)
