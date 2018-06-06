import React from 'react';
import DataManager from './DataManager';
import NiceButton from './NiceButton';

export default class DeploymentForm extends React.Component {
    state = {
        burnFirmware: false,
        firmware: 1,
        comment: "",
        targetName: "",
        params: [],
        options: {},

        diskPath: "",
        disksList: [],

        rdmsList: [],
        rdm: "",
        deploymentTargetId: "",

        disabledRepoIds: [],
    };

    refreshRDMs() {
        DataManager.getRemoteDeploymentMachines(rdms => this.setState({rdmsList: rdms, rdm: rdms.length > 0 ? rdms[0] : this.state.rdm }));
    }

    resetState(config) {
        var _params = DataManager.getConfigFiles(config, true).map(f => DataManager.getConfigFileParameters(f));
        var params = [];
        for (var i = 0; i < _params.length; i++)
            params = params.concat(_params[i]);

        var repositories = DataManager.getConfigRepositories(config, true);
        var buildOptions = [];
        for (var i = 0; i < repositories.length; i++)
            buildOptions = buildOptions.concat(DataManager.getRepositoryBuildOptions(repositories[i].repo));
        var boDict = {};
        for (var i = 0; i < buildOptions.length; i++)
            boDict[buildOptions[i].option_name] = {...buildOptions[i], isChecked: false};

        var allFirmwares = DataManager.getAllFirmwares()

        this.setState({
            burnFirmware: false,
            firmware: allFirmwares.length > 0 ? allFirmwares[0].id : [],
            targetName: "",
            comment: "",
            params: params,
            options: boDict,
            diskPath: "",
            disabledRepoIds: [],
        })
    }

    componentWillMount() {
        this.resetState(this.props.config);
        this.refreshRDMs();
    }

    componentWillReceiveProps(nextProps) {
        this.resetState(nextProps.config);
    }

    deploy() {
        const { config } = this.props;
        const { firmware, targetName, comment, params, burnFirmware, options, rdmsList, deploymentTargetId, disabledRepoIds } = this.state;

        if (targetName.trim() == "" || deploymentTargetId.trim() == "") {
            alert("Missing 'Target Name' or 'Target Deployment'");
            return;
        }

        for (var i = 0; i < params.length; i++) {
            if (params[i].parameter_value.trim() == "") {
                alert("Missing parameter '" + params[i].parameter_name + "'");
                return;
            }
        }

        var optionIds = Object.values(options).filter(o => o.isChecked).map(o => o.id);
        DataManager.deploy(config, deploymentTargetId, burnFirmware ? firmware : -1, targetName, comment, params, optionIds, disabledRepoIds);
    }

    render() {
        const { config } = this.props;
        const { firmware, targetName, comment, params, burnFirmware, options, diskPath, disksList, rdmsList, rdm, disabledRepoIds } = this.state;

        var firmwareList = DataManager.getAllFirmwares().map(f => <option key={'opf-'+f.id} value={f.id}>{f.name}</option>);
        var diskList = disksList.concat("").map(d => <option key={'opd-'+d} value={d}>{d}</option>);
        var depRepos = DataManager.getConfigRepositories(config, true);

        var rdmsOptionsList = [""].concat(rdmsList).map(_rdm => <option key={'rdm-'+_rdm.id} value={JSON.stringify(_rdm)}>{_rdm.name}</option>);
        var targetOptionsList = rdm ? [""].concat(rdm.targets).map(target => <option disabled={target.status !== 'Ready'} key={'dt-'+target.id} value={target.id}>{target.identifier}</option>) : [];

        return (
            <div style={styles.container}>
                <div style={styles.row}>
                    <div style={styles.fieldName}>Remote Deployment Machine</div>
                    <div style={styles.fieldValue}>
                        <NiceButton extraStyle={{width: 200, float: "right"}} onClick={this.refreshRDMs.bind(this)}>Refresh</NiceButton>
                        <select onChange={e => {
                            this.setState({rdm: JSON.parse(e.target.value)});
                        } }>{rdmsOptionsList}</select>
                    </div>
                </div>
                <div style={styles.row}>
                    <div style={styles.fieldName}>Deployment Target</div>
                    <div style={styles.fieldValue}>
                        <select onChange={e => this.setState({deploymentTargetId: e.target.value})}>{targetOptionsList}</select>
                    </div>
                </div>
                <div style={styles.row}>
                    <div style={styles.fieldName}>Firmware</div>
                    <div style={styles.fieldValue}>
                        <input type={"checkbox"} checked={burnFirmware} onChange={e => this.setState({burnFirmware: e.target.checked})} />
                        <select onChange={e => this.setState({firmware: e.target.value})}>{firmwareList}</select>
                    </div>
                </div>
                <div style={styles.row}>
                    <div style={styles.fieldName}>Target Name</div>
                    <input style={styles.fieldValue} value={targetName} onChange={e => this.setState({targetName: e.target.value})} />
                </div>
                <div style={styles.row}>
                    <div style={styles.fieldName}>Comment</div>
                    <textarea style={styles.fieldValue} value={comment} onChange={e => this.setState({comment: e.target.value})} rows={4} />
                </div>
                <div style={styles.row}>
                    <div style={styles.fieldName}>Repositories to clone</div>
                    <div style={styles.fieldValue}></div>
                </div>
                {depRepos.map(repo =>
                    <div key={'rbo-'+repo.id} style={styles.row}>
                        <div style={styles.fieldName}>{((rp) => rp.slice(rp.slice(0, rp.length-2).lastIndexOf('/')))(DataManager.getRepoById(repo.repo).remote_path)}</div>
                        <input style={styles.fieldValue} type={"checkbox"} checked={disabledRepoIds.indexOf(repo.id) == -1} onChange={e => this.setState({disabledRepoIds: e.target.checked ? disabledRepoIds.filter(rid => rid != repo.id) : disabledRepoIds.concat(repo.id)})} />
                    </div>
                )}
                <div style={styles.row}>
                    <div style={styles.fieldName}>Build options:</div>
                    <div style={styles.fieldValue}></div>
                </div>
                {Object.keys(options).map(option_name =>
                    <div key={'bo-'+option_name} style={styles.row}>
                        <div style={styles.fieldName}>{option_name}</div>
                        <input style={styles.fieldValue} type={"checkbox"} checked={options[option_name].isChecked} onChange={e => this.setState({options: {...options, [option_name]: {...options[option_name], isChecked: e.target.checked}}})} />
                    </div>
                )}
                <div style={styles.row}>
                    <div style={styles.fieldName}>Parameters:</div>
                    <div style={styles.fieldValue}></div>
                </div>
                {params.map((p, i) =>
                    <div key={'dep-param-'+p.parameter_name} style={styles.row}>
                        <div style={styles.fieldName}>{p.parameter_name + " (" + (p.is_required? "required" : "not required") + ")"}</div>
                        <input style={styles.fieldValue} value={p.parameter_value} onChange={(e => {
                            params[i].parameter_value = e.target.value;
                            this.setState({params});
                        }).bind(this)} />
                    </div>
                )}
                <div style={styles.row}>
                    <div style={styles.fieldName}></div>
                    <div style={styles.fieldValue}>
                        <NiceButton
                                onClick={this.deploy.bind(this)} >
                            Deploy
                        </NiceButton>
                    </div>
                </div>
            </div>
        );
    }
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
    },
    fieldName: {
        fontWeight: 'bold',
        color: '#ba3737',
        flex: 1,
        textAlign: 'right',
        marginRight: 20,
    },
    fieldValue: {
        flex: 3,
    },
};

