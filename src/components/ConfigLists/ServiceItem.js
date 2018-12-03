import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EnvList from './EnvList'
// icons
import Apps from '@material-ui/icons/Apps';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';


class ServiceItem extends React.Component {
    state = {
        open: false,
    };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const { name, description , environments } = this.props.service
        return (<div>
            <ListItem button onClick={this.handleClick}>
                <ListItemIcon>
                    <Apps />
                </ListItemIcon>
                <ListItemText inset primary={name} secondary={description } />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <EnvList open={this.state.open} environments={environments} />
        </div>)
    }
}

export default ServiceItem;
