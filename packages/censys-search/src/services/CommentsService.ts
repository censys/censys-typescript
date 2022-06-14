/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../src/models/ApiResponse';
import type { CertComment } from '../src/models/CertComment';
import type { HostComment } from '../src/models/HostComment';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CommentsService {

    /**
     * Returns a list of comments on the given host.
     * Returns a list of comments on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @returns any OK
     * @throws ApiError
     */
    public static getCommentsByHost(
        ip: string,
    ): CancelablePromise<(ApiResponse & {
        result?: {
            ip?: string;
            comments?: Array<HostComment>;
        };
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/hosts/{ip}/comments',
            path: {
                'ip': ip,
            },
        });
    }

    /**
     * Adds a comment on the given host.
     * Adds a comment on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static addCommentByHost(
        ip: string,
        requestBody: {
            contents?: string;
        },
    ): CancelablePromise<(ApiResponse & {
        result?: HostComment;
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v2/hosts/{ip}/comments',
            path: {
                'ip': ip,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Unprocessable Entity`,
            },
        });
    }

    /**
     * Returns a specific comment on the given host.
     * Returns a specific comment on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @param commentId The ID of the requested comment.
     * @returns any OK
     * @throws ApiError
     */
    public static getCommentByHost(
        ip: string,
        commentId: string,
    ): CancelablePromise<(ApiResponse & {
        result?: HostComment;
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/hosts/{ip}/comments/{comment_id}',
            path: {
                'ip': ip,
                'comment_id': commentId,
            },
            errors: {
                404: `Not Found`,
                422: `Unprocessable Entity`,
            },
        });
    }

    /**
     * Updates a specific comment on the given host.
     * Updates a specific comment on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @param commentId The ID of the requested comment.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static updateCommentByHost(
        ip: string,
        commentId: string,
        requestBody: {
            contents?: string;
        },
    ): CancelablePromise<(ApiResponse & {
        result?: HostComment;
    })> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v2/hosts/{ip}/comments/{comment_id}',
            path: {
                'ip': ip,
                'comment_id': commentId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not Found`,
                422: `Unprocessable Entity`,
            },
        });
    }

    /**
     * Deletes a specific comment on the given host.
     * Deletes a specific comment on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @param commentId The ID of the requested comment.
     * @returns void
     * @throws ApiError
     */
    public static deleteCommentByHost(
        ip: string,
        commentId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v2/hosts/{ip}/comments/{comment_id}',
            path: {
                'ip': ip,
                'comment_id': commentId,
            },
            errors: {
                404: `Not Found`,
                422: `Unprocessable Entity`,
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
    public static getCommentsByCert(
        fingerprint: string,
    ): CancelablePromise<(ApiResponse & {
        result?: {
            fingerprint?: string;
            comments?: Array<CertComment>;
        };
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/certificates/{fingerprint}/comments',
            path: {
                'fingerprint': fingerprint,
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
        },
    ): CancelablePromise<(ApiResponse & {
        result?: CertComment;
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v2/certificates/{fingerprint}/comments',
            path: {
                'fingerprint': fingerprint,
            },
            body: requestBody,
            mediaType: 'application/json',
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
        commentId: string,
    ): CancelablePromise<(ApiResponse & {
        result?: CertComment;
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/certificates/{fingerprint}/comments/{comment_id}',
            path: {
                'fingerprint': fingerprint,
                'comment_id': commentId,
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
        },
    ): CancelablePromise<(ApiResponse & {
        result?: CertComment;
    })> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v2/certificates/{fingerprint}/comments/{comment_id}',
            path: {
                'fingerprint': fingerprint,
                'comment_id': commentId,
            },
            body: requestBody,
            mediaType: 'application/json',
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
        commentId: string,
    ): CancelablePromise<(ApiResponse & {
        result?: {
            fingerprint?: string;
            comments?: Array<CertComment>;
        };
    })> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v2/certificates/{fingerprint}/comments/{comment_id}',
            path: {
                'fingerprint': fingerprint,
                'comment_id': commentId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

}
