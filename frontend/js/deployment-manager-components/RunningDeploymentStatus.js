import React from 'react';

export default class RunningDeploymentStatus extends React.Component {

    static defaultProps = {
        runningDeployment: null,
    }

    render() {
        const { runningDeployment } = this.props;

        if (runningDeployment) {
            return (
                <div style={styles.container}>
                    <div style={styles.containerContent}>
                        <h2>Running Deployment on: { runningDeployment.deployment.target }</h2>
                        {runningDeployment.stdout.split('\n').map((line, i) =>
                            line.indexOf("~~~~") == 0 ? <div key={'errline-'+i} style={styles.cmdLine}>{line.substr(4)}</div>
                                                      : <div key={'errline-'+i} style={styles.stdoutLine}>{line}</div>
                        )}
                        {/*<p style={styles.statusLine}>{lock.status == "" ? "Loading..." : ("Error: " + lock.status)}</p>*/}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div style={styles.container}>
                    <h2>Invalid Running Deployment Id: selectedRunningDeploymentId</h2>
                </div>
            );
        }
    }
}

const styles = {
    container: {
        flex: 5,
        flexDirection: 'column',
        maxHeight: '100vh',
        overflow: 'scroll'
    },
    containerContent:{
        marginLeft: 10
    },
    cmdLine: {
        color: 'green',
    },
    stdoutLine: {
    },
    statusLine: {
        color: 'red',
    }
};