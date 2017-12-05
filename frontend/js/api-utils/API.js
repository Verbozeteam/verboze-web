/* @flow */

import axios from 'axios';

import * as APITypes from './APITypes';

class APICallerClass {
    __makeRequest(
        requestMethod: APITypes.RequestMethod,
        endpoint: string,
        params: Object,
        success: (any) => any,
        failure?: (APITypes.ErrorType) => any) {

        axios({
            method: requestMethod,
            url: endpoint,
            ...params,
        }).then((ret: Object) => {
            success(ret.data);
        }).catch((err: APITypes.ErrorType) => {
            if (failure)
                failure(err);
        });
    }

    getRooms(success: (Array<APITypes.Room>) => any, failure?: (APITypes.ErrorType) => any) {
        this.__makeRequest('get', '/api/rooms/', {}, success, failure);
    }
};

export const APICaller = new APICallerClass();