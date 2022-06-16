/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from "../models/ApiResponse";
import type { CertComment } from "../models/CertComment";
import type { Tag } from "../models/Tag";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class CertsService {
    /**
     * Returns a list of hosts presenting the given certificate.
     * Returns a list of hosts which contain services presenting this certificate,
     * including when the certificate was first observed.
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
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @param cursor Cursor token from the API response, which fetches the next page of hosts when added to the endpoint URL.
     * @returns any OK
     * @throws ApiError
     */
    public static getHostsByCert(
        fingerprint: string,
        cursor?: string
    ): CancelablePromise<
        ApiResponse & {
            result?: {
                /**
                 * The SHA-256 fingerprint of the certificate.
                 */
                fingerprint?: string;
                hosts?: Array<{
                    ip?: string;
                    /**
                     * Name provided if host is a virtual host.
                     */
                    name?: string;
                    /**
                     * Time when certificate was observed.
                     */
                    observed_at?: string;
                    /**
                     * Time when the certificate was first observed.
                     */
                    first_observed_at?: string;
                }>;
                links?: {
                    next?: string;
                };
            };
        }
    > {
        return __request(OpenAPI, {
            method: "GET",
            url: "/v2/certificates/{fingerprint}/hosts",
            path: {
                fingerprint: fingerprint,
            },
            query: {
                cursor: cursor,
            },
        });
    }

    /**
     * Returns a list of comments on the given cert.
     * Returns a list of comments on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @returns any OK
     * @throws ApiError
     */
    public static getCommentsByCert(fingerprint: string): CancelablePromise<
        ApiResponse & {
            result?: {
                fingerprint?: string;
                comments?: Array<CertComment>;
            };
        }
    > {
        return __request(OpenAPI, {
            method: "GET",
            url: "/v2/certificates/{fingerprint}/comments",
            path: {
                fingerprint: fingerprint,
            },
        });
    }

    /**
     * Adds a comment on the given cert.
     * Adds a comment on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static addCommentByCert(
        fingerprint: string,
        requestBody: {
            contents?: string;
        }
    ): CancelablePromise<
        ApiResponse & {
            result?: CertComment;
        }
    > {
        return __request(OpenAPI, {
            method: "POST",
            url: "/v2/certificates/{fingerprint}/comments",
            path: {
                fingerprint: fingerprint,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Returns a comment on the given cert.
     * Returns a comment on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @param commentId The ID of the requested comment.
     * @returns any OK
     * @throws ApiError
     */
    public static getCommentByCert(
        fingerprint: string,
        commentId: string
    ): CancelablePromise<
        ApiResponse & {
            result?: CertComment;
        }
    > {
        return __request(OpenAPI, {
            method: "GET",
            url: "/v2/certificates/{fingerprint}/comments/{comment_id}",
            path: {
                fingerprint: fingerprint,
                comment_id: commentId,
            },
        });
    }

    /**
     * Updates a comment on the given cert.
     * Updates a comment on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @param commentId The ID of the requested comment.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static updateCommentByCert(
        fingerprint: string,
        commentId: string,
        requestBody: {
            contents?: string;
        }
    ): CancelablePromise<
        ApiResponse & {
            result?: CertComment;
        }
    > {
        return __request(OpenAPI, {
            method: "PUT",
            url: "/v2/certificates/{fingerprint}/comments/{comment_id}",
            path: {
                fingerprint: fingerprint,
                comment_id: commentId,
            },
            body: requestBody,
            mediaType: "application/json",
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * Deletes a comment on the given cert.
     * Deletes a comment on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @param commentId The ID of the requested comment.
     * @returns any OK
     * @throws ApiError
     */
    public static deleteCommentByCert(
        fingerprint: string,
        commentId: string
    ): CancelablePromise<
        ApiResponse & {
            result?: {
                fingerprint?: string;
                comments?: Array<CertComment>;
            };
        }
    > {
        return __request(OpenAPI, {
            method: "DELETE",
            url: "/v2/certificates/{fingerprint}/comments/{comment_id}",
            path: {
                fingerprint: fingerprint,
                comment_id: commentId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * Returns a list of certificates for a tag
     * Returns a list of certificates for a tag
     * @param id The unique ID of the tag.
     * @returns any OK
     * @throws ApiError
     */
    public static listCertificatesForTag(id: string): CancelablePromise<
        ApiResponse & {
            result?: {
                certs?: Array<{
                    fingerprint?: string;
                    tagged_at?: string;
                }>;
            };
        }
    > {
        return __request(OpenAPI, {
            method: "GET",
            url: "/v2/tags/{id}/certificates",
            path: {
                id: id,
            },
        });
    }

    /**
     * Returns a list of tags on the given certificate.
     * Returns a list of tags on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @returns any OK
     * @throws ApiError
     */
    public static getTagsByCert(fingerprint: string): CancelablePromise<
        ApiResponse & {
            result?: {
                fingerprint?: string;
                tags?: Array<Tag>;
            };
        }
    > {
        return __request(OpenAPI, {
            method: "GET",
            url: "/v2/certificates/{fingerprint}/tags",
            path: {
                fingerprint: fingerprint,
            },
        });
    }

    /**
     * Adds a tag on the given certificate.
     * Adds a tag on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @param id The unique ID of the tag.
     * @returns void
     * @throws ApiError
     */
    public static tagCert(
        fingerprint: string,
        id: string
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: "PUT",
            url: "/v2/certificates/{fingerprint}/tags/{id}",
            path: {
                fingerprint: fingerprint,
                id: id,
            },
        });
    }

    /**
     * Removes a tag on the given certificate.
     * Removes a tag on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @param id The unique ID of the tag.
     * @returns void
     * @throws ApiError
     */
    public static untagCert(
        fingerprint: string,
        id: string
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: "DELETE",
            url: "/v2/certificates/{fingerprint}/tags/{id}",
            path: {
                fingerprint: fingerprint,
                id: id,
            },
        });
    }
}
