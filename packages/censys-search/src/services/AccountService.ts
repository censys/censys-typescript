/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccountService {

    /**
     * Returns information about your account
     * > The Censys legacy v1 API contains API endpoints which are being maintained until replacement v2 endpoints are available.
     *
     * The Account endpoint returns information about your Censys account. Most importantly, you can use this endpoint to check on your current query quota usage.
     * @returns any Account information was successfully retrieved.
     * @throws ApiError
     */
    public static account(): CancelablePromise<{
        login?: string;
        email?: string;
        first_login?: string;
        last_login?: string;
        quota?: {
            used?: number;
            resets_at?: string;
            allowance?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/account',
            errors: {
                403: `Your request did not include a valid Authorization header.`,
                429: `Your query was not executed because you have exceeded your specified rate limit.`,
                500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
            },
        });
    }

}
