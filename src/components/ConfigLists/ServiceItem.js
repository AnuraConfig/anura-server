import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EnvList from './EnvList'
import Divider from '@material-ui/core/Divider';

// icons
import Apps from '@material-ui/icons/Apps';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

const HIGHLIGHT_STYLE = { backgroundColor: "yellow" }

function generateTitle(heightLightText, text) {
    if (!heightLightText) return text
    let splitText = text.split(new RegExp(`(${heightLightText})`, 'gi'))
    if (splitText.length === 1) return text
    return (<div>
        {splitText.map((value, key) => {
            return <span style={value === heightLightText ? HIGHLIGHT_STYLE : {}}>{value}</span>
        })}
    </div>)
}

class ServiceItem extends React.Component {
    state = {
        open: false,
    };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const searchText = this.props.searchText
        const { name, description, environments } = this.props.service
        return (<div>
            <ListItem button onClick={this.handleClick}>
                <ListItemIcon>
                    <Apps />
                </ListItemIcon>
                <ListItemText inset primary={generateTitle(searchText, name)} secondary={generateTitle(searchText, description)} />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <EnvList open={this.state.open} environments={environments} />
            <Divider/>
        </div>)
    }
}

export default ServiceItem;
