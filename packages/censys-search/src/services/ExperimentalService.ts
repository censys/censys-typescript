/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../src/models/ApiResponse';
import type { HostEvent } from '../src/models/HostEvent';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ExperimentalService {

    /**
     * Returns host events for the specified IP address
     * Fetches a list of events for the host with the specified IP address.
     *
     * **Cursor Pagination**
     *
     * This endpoint relies on using cursors for efficient pagination. Each result may
     * return a `next` cursor value which can be used to fetch additional pages of results.
     * This endpoint only support forward-pagination.
     *
     * ```json
     * {
         * "links": {
             * "next": "nextCursorToken"
             * },
             * [Rest of Response]
             * }
             * ```
             * The returned cursor token values can be added to the endpoint as a `cursor`
             * parameter to fetch the next page of results.
             * The entire set of results can be iterated page-by-page using returned
             * cursors. If no cursor is given, the first page will be returned.
             *
             * @param ip The IP Address of the requested host.
             * @param startTime An optional RFC3339 timestamp which represents the beginning
             * chronological point-in-time (inclusive) from which events
             * are returned. This must always be earlier than end_time.
             * Precision up to *nanoseconds* is observed and recommended.
             *
             * If not provided, this is assumed to be the historical API maximum.
             *
             * @param endTime An optional RFC3339 timestamp which represents the ending
             * chronological point-in-time (exclusive) from which events
             * are returned. This must always be later than start_time.
             * Precision up to *nanoseconds* is observed and recommended.
             *
             * If not provided, this is assumed to be now.
             *
             * @param perPage The maximum number of hits to return in each response (minimum of 1, maximum of 50).
             * @param cursor Cursor token from the API response, which fetches the next or previous page of hits when added to the endpoint URL.
             * @param reversed Reverse the order of the return events, that is, return events in reversed chronological order.
             * @returns any Events for the host were sucessfully retrieved.
             * @throws ApiError
             */
            public static viewHostEvents(
                ip: string,
                startTime?: string,
                endTime?: string,
                perPage: number = 25,
                cursor?: string,
                reversed?: boolean,
            ): CancelablePromise<(ApiResponse & {
                result?: {
                    ip?: string;
                    events?: Array<HostEvent>;
                };
            })> {
                return __request(OpenAPI, {
                    method: 'GET',
                    url: '/v2/experimental/hosts/{ip}/events',
                    path: {
                        'ip': ip,
                    },
                    query: {
                        'start_time': startTime,
                        'end_time': endTime,
                        'per_page': perPage,
                        'cursor': cursor,
                        'reversed': reversed,
                    },
                    errors: {
                        401: `You must authenticate with a valid API ID and secret.`,
                        422: `Invalid IP address.`,
                    },
                });
            }

        }
