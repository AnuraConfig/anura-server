import React from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import JsonViewer from './JsonViewer';
import { getMaxVersion, getMaxVersionIndex } from './VersionHelpers'
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import Button from '@material-ui/core/Button';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { toast } from 'react-toastify';
import { VersionViewer as styles } from './styles'

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
        this.state = {
            edit: false,
            maxVersion,
            value: getMaxVersionIndex(maxVersion, props.configs),
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            const maxVersion = getMaxVersion(this.props.configs)
            this.setState({
                maxVersion,
                value: getMaxVersionIndex(maxVersion, this.props.configs),
                edit: false,
                changeData: undefined
            })
        }

    }

    handleChange = (event, value) => {
        this.setState({ value });
    }

    setEditMode = () => {
        this.setState({
            edit: true
        })
    }
    cancelUpdate = () => {
        this.setState({
            edit: false
        })
    }
    updateJson = ({ jsObject }) => {
        this.setState({ changeData: jsObject })
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
        const { value, maxVersion } = this.state
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
                            if (!this.state.edit)
                                return (<JsonViewer config={configs[index]} editable={configs[index].version === maxVersion}
                                    setEditMode={this.setEditMode} />)
                            return (<div>
                                <Button variant="outlined" color="secondary" className={classes.cancel}
                                    onClick={this.cancelUpdate}>
                                    Cancel
                                </Button>
                                <Button variant="outlined" color="primary" className={classes.saveChanges}
                                    onClick={() => {
                                        const variables = {
                                            serviceId: this.props.serviceId,
                                            environmentName: this.props.envName,
                                            data: JSON.stringify(this.state.changeData)
                                        }
                                        updateConfig({ variables })
                                    }}>
                                    Save changes
                                </Button>
                                <JSONInput
                                    id='json-viewer-id'
                                    placeholder={JSON.parse(configs[index].data)}
                                    locale={locale}
                                    theme={"light_mitsuketa_tribute"}
                                    height="60vh"
                                    width="100%"
                                    onChange={this.updateJson}
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
