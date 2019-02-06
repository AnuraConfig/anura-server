import React from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit'
import { getMaxVersion, getMaxVersionIndex } from './VersionHelpers'
import { ConfigSettingsContext } from '../../Context/Contexts'
import EditActions from './EditActions'
import { Mutation } from "react-apollo"
import gql from "graphql-tag";
import { toast } from 'react-toastify'
import { VersionViewer as styles } from './styles'
import '../Common/braceImport'
import VersionTab from './VersionTab'

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
        if (!data) return
        if (data.updateConfig.success) {
            toast.success("update config")
            this.saveEdit()
        } else {
            toast.error(data.updateConfig.error)
        }

    }

    render() {
        const { classes, configs, serviceId, envName } = this.props;
        const { value, maxVersion, changeData } = this.state
        const index = value >= configs.length ? configs.length - 1 : value
        return (
            <React.Fragment>
                <VersionTab currentIndex={index} maxVersion={maxVersion} configs={configs} />
                <Grid item xs={12} sm={12} className={classes.viewer}>
                <ConfigSettingsContext.Consumer>
                        {({ settings, toggleMenu }) =>
                            <Mutation mutation={UPDATE_CONFIG}>
                                {(updateConfig, { data, error }) => {
                                    this.mutationRendering(data, error)
                                    return (<div className={classes.container}>
                                        {this.state.edit ?
                                            <EditActions changeData={changeData}
                                                updateConfig={updateConfig}
                                                serviceId={serviceId}
                                                envName={envName}
                                                toggleMenu={toggleMenu}
                                                settings={settings}
                                            /> :
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
                        }
                    </ConfigSettingsContext.Consumer>
                </Grid>
            </React.Fragment>
        );
    }
}

VersionViewer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VersionViewer);
