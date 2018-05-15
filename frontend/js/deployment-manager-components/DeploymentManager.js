import React from 'react';
import DeploymentEditor from './DeploymentEditor';
import DataManager from './DataManager';
import NiceButton from './NiceButton';

export default class DeploymentManager extends React.Component {
    _deregister = undefined;

    state = {
        selectedDeployment: -1,
    };

    componentWillMount() {
        this._deregister = DataManager.registerListener(this.onDataChanged.bind(this));
        this.onDataChanged();
    }

    componentWillUnmount() {
        if (this._deregister) {
            this._deregister();
            this._deregister = undefined;
        }
    }

    onDataChanged() {
        this.forceUpdate();
    }

    render() {
        const { selectedDeployment } = this.state;
        const { configs } = this.props;

        var configDict = {};
        var configDeployments = {};
        var deployments = {};
        for (var i = 0; i < configs.length; i++) {
            configDict[configs[i].id] = configs[i];
            configDeployments[configs[i].id] = DataManager.getConfigDeployments(configs[i]);
            for (var j = 0; j < configDeployments[configs[i].id].length; j++) {
                var dep = configDeployments[configs[i].id][j];
                if (dep.target in deployments)
                    deployments[dep.target].push(dep);
                else
                    deployments[dep.target] = [dep];
            }
        }
        for (var k in deployments)
            deployments[k] = deployments[k].sort((a, b) => new Date(b.date) - new Date(a.date));

        var deploymentList = Object.keys(deployments).map(target =>
            <div key={"deployment-"+target}>
                <h4>{target}</h4>
                {deployments[target].map(deployment =>
                    <NiceButton
                            extraStyle={{marginLeft: 20}}
                            key={"deployment-listitem-"+deployment.id}
                            isHighlighted={selectedDeployment == deployment.id}
                            onClick={() => this.setState({selectedDeployment: deployment.id})} >
                        {new Date(deployment.date).toLocaleString() + " (v" + (configDict[deployment.config].version) + ")"}
                    </NiceButton>
                )}
            </div>
        );

        var contentView = null;
        if (selectedDeployment >= 0) {
            contentView = <DeploymentEditor deployment={DataManager.getDeploymentById(selectedDeployment)} />
        } else if (deploymentList.length == 0) {
            deploymentList = <div>None</div>
        }

        return (
            <div style={styles.container}>
                <div style={styles.sidebar}>
                    {deploymentList}
                </div>
                <div style={styles.contentContainer}>
                    {contentView}
                </div>
            </div>
        );
    }
};

const styles = {
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    },
    sidebar: {
        flex: 2,
        flexDirection: 'column',
        maxWidth: 300,
    },
    contentContainer: {
        flex: 3,
    }
};
