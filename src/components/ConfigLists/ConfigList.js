import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ServiceItem from './ServiceItem'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { SearchContext } from '../../Context/Contexts';
import { configFilter, configSort } from '../../utils/configSearchHelpers';

const query = gql`
{
  service  {
    name
    description 
    environments {
      name
      configs {
        data
      }
    }
  }
}`

const styles = theme => ({
    gridItem: {
        margin: "5px 50px",
    },
    title: {
        padding: "30px"
    },
    container: {
        maxHeight: "77vh",
        overflowY: "auto"
    },
    subheader: {
        backgroundColor: "#fff",
        zIndex: 100
    }
});

class ConfigList extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={6} sm={6}>
                <Paper elevation={3} className={classes.container}>
                    <Query query={query}>
                        {({ loading, error, data }) => {
                            if (loading) return (<Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Loading
                                  </Typography>)
                            if (error) return (<Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Error
                              </Typography>)
                            return (<List
                                className={classes.gridItem}
                                component="nav"
                                subheader={<ListSubheader className={classes.subheader} component="div">Your Services</ListSubheader>}
                            >
                                <SearchContext.Consumer>
                                    {({ text }) => {
                                        return data.service.filter(configFilter(text)).sort(configSort(text)).map((service, key) => (
                                            <ServiceItem service={service} key={key} />
                                        ))
                                    }}
                                </SearchContext.Consumer>

                            </List>)
                        }}
                    </Query>
                </Paper>
            </Grid>
        );
    }
}

ConfigList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfigList);