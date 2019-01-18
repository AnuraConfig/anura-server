import React, { Component } from 'react'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { SelectFileContext } from '../../Context/Contexts'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import VersionViewer from "./VersionViewer"

const query = gql`
 query Env($serviceId: String, $envName: String){
	getConfigs(serviceId: $serviceId, environment: $envName){
    name
    configs {
      data
      version
    }
  }
}`

const styles = theme => ({
  title: {
    padding: "30px"
  }
});

class FileViewer extends Component {
  render() {
    const { classes } = this.props
    return (
      <SelectFileContext.Consumer >
        {({ selectedService, selectedEnvironment }) => (
          <div className={"file_viewer " + ((selectedService && selectedEnvironment) ? "active" : "disable")}>
            {(selectedService && selectedEnvironment) && <Query query={query} variables={{ serviceId: selectedService, envName: selectedEnvironment }}>
              {({ loading, error, data, refetch }) => {
                if (loading) return (<Typography className={classes.title} variant="h6" color="inherit" noWrap>
                  Loading
                  </Typography>)
                if (error) return (<Typography className={classes.title} variant="h6" color="inherit" noWrap>
                  Error
              </Typography>)
                if (data.getConfigs && data.getConfigs.configs)
                  return (<VersionViewer
                    refetch={refetch}
                    serviceId={selectedService}
                    envName={selectedEnvironment}
                    configs={data.getConfigs.configs} />)
                return <div>No configs</div>
              }}
            </Query>}
          </div>
        )}
      </SelectFileContext.Consumer>
    )
  }
}

FileViewer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileViewer);