import React from 'react';

import ConfigEditor from './ConfigEditor';
import DataManager from './DataManager';
import Status from './Status';

export default class App extends React.Component {
    _deregister = undefined;

    state = {
        runningDeployments: [],
    };

    componentWillMount() {
        this._deregister = DataManager.registerListener(this.onDataChanged.bind(this));
        this.onDataChanged();
        DataManager.load();
    }

    componentWillUnmount() {
        if (this._deregister) {
            this._deregister();
            this._deregister = undefined;
        }
    }

    onDataChanged() {
        this.setState({runningDeployments: DataManager.serverData.deploymentLocks});
    }

    render() {
        const { runningDeployments } = this.state;

        return (
            <div style={styles.global}>
                {/* runningDeployments.length > 0 ? <Status lock={runningDeployments[0]} /> : <ConfigEditor /> */}
                <ConfigEditor runningDeployments={runningDeployments} />
            </div>
        );
    }
};

const styles = {
    global: {
        fontFamily: 'Courier New',
        color: 'white',
        display: 'flex',
        flex: 1,
        minHeight: '100vh'
    },
};
