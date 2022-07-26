/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class LogbookService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a cursor for reading data from the Logbook API.
     *
     * Can pass optional filters via the optional POST payload to get a cursor
     * that only returns the selected types. Pass an empty value to get a list of
     * allowed values from the API.
     * data: {"filter": {"type": ["HOST_RISK", "CERT_RISK"]}}
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public postV1LogbookCursor(
        requestBody?:
            | {
                  /**
                   * A valid Logbook filter
                   */
                  filter?: {
                      type?: Array<
                          | "CERT"
                          | "CERT_RISK"
                          | "DOMAIN"
                          | "DOMAIN_EXPIRATION_DATE"
                          | "DOMAIN_MAIL_EXCHANGE_SERVER"
                          | "DOMAIN_NAME_SERVER"
                          | "DOMAIN_REGISTRAR"
                          | "DOMAIN_RISK"
                          | "DOMAIN_SUBDOMAIN"
                          | "HOST"
                          | "HOST_CDN"
                          | "HOST_CERT"
                          | "HOST_PORT"
                          | "HOST_PROTOCOL"
                          | "HOST_RISK"
                          | "HOST_SOFTWARE"
                          | "HOST_VULNERABILITY"
                          | "OBJECT_STORAGE"
                          | "RISK_USER_CONFIG"
                      >;
                  };
                  /**
                   * The date this cursor should start retrieving logbook events from.
                   * Should be a valid ISO-8601 timestamp.
                   */
                  dateFrom: string;
              }
            | {
                  /**
                   * A valid Logbook filter
                   */
                  filter?: {
                      type?: Array<
                          | "CERT"
                          | "CERT_RISK"
                          | "DOMAIN"
                          | "DOMAIN_EXPIRATION_DATE"
                          | "DOMAIN_MAIL_EXCHANGE_SERVER"
                          | "DOMAIN_NAME_SERVER"
                          | "DOMAIN_REGISTRAR"
                          | "DOMAIN_RISK"
                          | "DOMAIN_SUBDOMAIN"
                          | "HOST"
                          | "HOST_CDN"
                          | "HOST_CERT"
                          | "HOST_PORT"
                          | "HOST_PROTOCOL"
                          | "HOST_RISK"
                          | "HOST_SOFTWARE"
                          | "HOST_VULNERABILITY"
                          | "OBJECT_STORAGE"
                          | "RISK_USER_CONFIG"
                      >;
                  };
                  /**
                   * The Logbook event id that this cursor should start from.
                   */
                  idFrom?: number;
              }
    ): CancelablePromise<{
        cursor: string;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/v1/logbook-cursor",
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Get logbook entries by querying this endpoint. Since the amount
     * of logbook data may be significant multiple calls to this endpoint
     * could be required to collect all the data matching the filters you
     * provide.
     *
     * **Note:** the `nextCursor` will always be set, regardless if the
     * `event` array is empty or doesn't have the maximum number of events.
     *
     * Here's some pseudo code demonstrating how this might be accomplished.
     *
     * ```js
     * initialCursor = getLogbookCursor({ filter: yourFilterObject })
     * response = getLogbookData({
     * cursor: initialCursor
     * })
     * results = response.events
     * while (!response.endOfEvents) {
     * response = getLogbookData({
     * cursor: response.nextCursor
     * })
     * results.addAll(response.events)
     * }
     * ```
     *
     * All results for the given filters should now be in the results variable.
     * @param cursor A logbook cursor generated by /api/v1/logbook-cursor
     * @returns any
     * @throws ApiError
     */
    public getV1Logbook(cursor?: string): CancelablePromise<{
        events: Array<
            | {
                  operation: "ASSOCIATE" | "DISASSOCIATE";
                  type: "CERT" | "DOMAIN" | "HOST";
                  id: number;
                  timestamp: string;
                  /**
                   * Construct a type with a set of properties K of type T
                   */
                  entity: any;
              }
            | {
                  operation: "ADD" | "CHANGE" | "REMOVE";
                  /**
                   * Construct a type with a set of properties K of type T
                   */
                  data?: any;
                  type:
                      | "CERT_RISK"
                      | "DOMAIN_EXPIRATION_DATE"
                      | "DOMAIN_MAIL_EXCHANGE_SERVER"
                      | "DOMAIN_NAME_SERVER"
                      | "DOMAIN_REGISTRAR"
                      | "DOMAIN_RISK"
                      | "DOMAIN_SUBDOMAIN"
                      | "HOST_CDN"
                      | "HOST_CERT"
                      | "HOST_PORT"
                      | "HOST_PROTOCOL"
                      | "HOST_RISK"
                      | "HOST_SOFTWARE"
                      | "HOST_VULNERABILITY"
                      | "OBJECT_STORAGE"
                      | "RISK_USER_CONFIG";
                  id: number;
                  timestamp: string;
                  /**
                   * Construct a type with a set of properties K of type T
                   */
                  entity: any;
              }
        >;
        nextCursor: string;
        endOfEvents: boolean;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/logbook",
            query: {
                cursor: cursor,
            },
        });
    }
}
