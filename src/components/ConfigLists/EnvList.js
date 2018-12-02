import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Description from '@material-ui/icons/Description';

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class EnvList extends React.Component {
    render() {
        const { classes, environments } = this.props;
        return (
            <Collapse
                in={this.props.open}
                timeout="auto"
                unmountOnExit>
                <List component="div"
                    className={classes.nested}
                    disablePadding
                    subheader={<ListSubheader component="div">Environments</ListSubheader>}>
                    {
                        environments.map((env, key) => (< ListItem button >
                            <ListItemIcon>
                                <Description />
                            </ListItemIcon>
                            <ListItemText inset primary={env.name} />
                        </ListItem>))
                    }
                </List>
            </Collapse>
        )
    }
}

EnvList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnvList);