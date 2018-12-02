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

const query = gql`
{
  service  {
    name
    discretion
    environments {
      name
      configs {
        data
      }
    }
  }
}`

const styles = theme => ({
    root: {
        width: "80%",
        margin: " 50px auto",
        height: "100%"
    },
    grid: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
        width: "100%",
    },
    gridItem: {
        margin: "5px 50px"
    },
    title: {
        padding: "30px"
    }
});

class ConfigList extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={6} sm={6}>
                <Paper elevation={3}>
                    <Query query={query}>
                        {({ loading, error, data }) => {
                            console.log(data)
                            if (loading) return (<Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Loading
                                  </Typography>)
                            if (error) return (<Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Error
                              </Typography>)
                            return (<List
                                className={classes.gridItem}
                                component="nav"
                                subheader={<ListSubheader component="div">Your Services</ListSubheader>}
                            >
                                {data.service.map((service, key) => (
                                    <ServiceItem service={service} key={key} />
                                ))}
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