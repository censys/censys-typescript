/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../src/models/ApiResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MetadataService {

    /**
     * Returns host metadata about what Censys scans for
     * The host metadata endpoint returns a list of services Censys scans for. These are the values that can be given as values for the `services.service_name` field in search queries.
     * @returns any The metadata was retrieved.
     * @throws ApiError
     */
    public static getHostMetadata(): CancelablePromise<(ApiResponse & {
        result?: {
            services?: Array<string>;
        };
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/metadata/hosts',
        });
    }

}
