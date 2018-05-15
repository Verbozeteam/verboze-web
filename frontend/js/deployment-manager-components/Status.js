import React from 'react';
import DataManager from './DataManager';
import NiceButton from './NiceButton';

export default class Status extends React.Component {
    render() {
        const { lock } = this.props;

        return (
            <div>
                <div>
                    {lock.status == "" ? "Loading..." : ("Error: " + lock.status)}
                </div>
                <div>
                    {lock.status == "" ? null :
                        <NiceButton onClick={() => DataManager.deleteLock(lock)}>
                            Ok
                        </NiceButton>
                    }
                </div>
            </div>
        );
    }
};
