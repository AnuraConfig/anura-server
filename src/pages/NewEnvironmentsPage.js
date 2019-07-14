import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import queryString from "query-string"
import NewServicePage from './NewServicePage'
import { withRouter } from 'react-router-dom'
import Loading from '../components/Common/Loading';
import STEPS from '../utils/StepsEnum'

const query = gql`
query getService($serviceName: String){
  service(serviceName: $serviceName, lastConfig: true){
    name
    description 
    environments{
      name
      configs{
        data
        version
        type
        webHook{
          url
          method
        }
      }
    }
  }
}`


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

class NewEnvironmentsPage extends React.Component {
    render() {
        const { classes, location } = this.props
        const paramters = queryString.parse(location.search)
        return (<div className={classes.root}>
            <Query query={query} variables={{ serviceName: paramters.serviceName }}>
                {({ loading, error, data }) => {
                    if (loading) return <Loading />
                    if (error) return (<div >Error</div>)
                    const { service } = data
                    return <NewServicePage
                        service={service}
                        step={STEPS.configDetails} />
                }}
            </Query>
        </div>)
    }
}

export default withRouter(withStyles(styles)(NewEnvironmentsPage));
