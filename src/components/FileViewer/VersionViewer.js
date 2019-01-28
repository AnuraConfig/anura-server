import React from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AceEditor from 'react-ace';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit'
import { getMaxVersion, getMaxVersionIndex } from './VersionHelpers'
import Button from '@material-ui/core/Button';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { toast } from 'react-toastify';
import { VersionViewer as styles } from './styles'
import '../Common/braceImport'

const UPDATE_CONFIG = gql`
mutation updateConfig($serviceId:ID!,$environmentName:String!,$data:String!){
    updateConfig(serviceId:$serviceId,environmentName:$environmentName,data:$data){
    success,
    error
  }
}
`
class VersionViewer extends React.PureComponent {
    constructor(props) {
        super(props)
        const maxVersion = getMaxVersion(props.configs)
        const value = getMaxVersionIndex(maxVersion, props.configs)
        this.state = {
            edit: false,
            maxVersion,
            value,
            changeData: props.configs[value].data
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            const maxVersion = getMaxVersion(this.props.configs)
            const value = getMaxVersionIndex(maxVersion, this.props.configs)
            this.setState({
                maxVersion,
                value,
                edit: false,
                changeData: this.props.configs[value].data
            })
        }

    }

    handleChange = (event, value) => {
        this.setState({
            value,
            changeData: this.props.configs[value].data
        });
    }

    setEditMode = (index) => {
        this.setState({
            edit: true,
            changeData: this.props.configs[index].data
        })
    }
    cancelUpdate = () => {
        this.setState({
            edit: false
        })
    }
    updateData = (changeData) => {
        this.setState({ changeData })
    }
    saveEdit = () => {
        this.cancelUpdate()
        this.props.refetch()
    }
    mutationRendering = (data, error) => {
        if (data && this.state.edit) {
            toast.success("update config")
            this.saveEdit()
        }
        if (error) {
            toast.error("failed updating config")
        }
    }

    render() {
        const { classes, configs } = this.props;
        const { value, maxVersion, changeData } = this.state
        const index = value >= configs.length ? configs.length - 1 : value
        return (
            <React.Fragment>
                <Grid item xs={12} sm={12}>
                    <div className={classes.root}>
                        <AppBar position="static" color="inherit">
                            <Tabs
                                value={index}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                scrollable
                                scrollButtons="auto"
                            >
                                {configs.map((item, key) => (
                                    <Tab key={key} label={maxVersion === item.version ?
                                        `newest (${item.version + 1})` : `Version ${item.version + 1}`} />
                                ))}
                            </Tabs>
                        </AppBar>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.viewer}>
                    <Mutation mutation={UPDATE_CONFIG}>
                        {(updateConfig, { data, error }) => {
                            this.mutationRendering(data, error)
                            return (<div className={classes.container}>
                                {this.state.edit ?
                                    <div>
                                        <Button variant="outlined" color="secondary" className={classes.cancel}
                                            onClick={this.cancelUpdate}>
                                            Cancel
                                        </Button>
                                        <Button variant="outlined" color="primary" className={classes.saveChanges}
                                            onClick={() => {
                                                const variables = {
                                                    serviceId: this.props.serviceId,
                                                    environmentName: this.props.envName,
                                                    data: changeData
                                                }
                                                updateConfig({ variables })
                                            }}>
                                            Save changes
                                        </Button>
                                    </div> :
                                    <IconButton className={classes.editButton} aria-label="Edit" onClick={() => this.setEditMode(index)}>
                                        <Edit />
                                    </IconButton>
                                }
                                <AceEditor
                                    readOnly={!this.state.edit}
                                    height="100%"
                                    width="100%"
                                    mode="json"
                                    theme="github"
                                    value={changeData}
                                    onChange={this.updateData}
                                    name="DATA_DIV"
                                />
                            </div>)
                        }}
                    </Mutation>
                </Grid>
            </React.Fragment>
        );
    }
}

VersionViewer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VersionViewer);
