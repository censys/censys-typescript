/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../src/models/ApiResponse';
import type { Tag } from '../src/models/Tag';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TagsService {

    /**
     * Returns a list of all tags
     * Returns a list of all tags for a team
     * @returns any OK
     * @throws ApiError
     */
    public static listTags(): CancelablePromise<(ApiResponse & {
        result?: {
            tags?: Array<Tag>;
        };
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/tags',
        });
    }

    /**
     * Creates a new tag
     * Creates a new tag for a team
     * @param requestBody Tag to create
     * @returns any OK
     * @throws ApiError
     */
    public static createTag(
        requestBody: Tag,
    ): CancelablePromise<(ApiResponse & {
        result?: Tag;
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v2/tags',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Returns a tag
     * Returns a tag for a team
     * @param id The unique ID of the tag.
     * @returns any OK
     * @throws ApiError
     */
    public static getTag(
        id: string,
    ): CancelablePromise<(ApiResponse & {
        result?: Tag;
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/tags/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Updates a tag
     * Updates a tag for a team
     * @param id The unique ID of the tag.
     * @param requestBody Tag to update
     * @returns any OK
     * @throws ApiError
     */
    public static updateTag(
        id: string,
        requestBody: Tag,
    ): CancelablePromise<(ApiResponse & {
        result?: Tag;
    })> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v2/tags/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Deletes a tag
     * Deletes a tag for a team
     * @param id The unique ID of the tag.
     * @returns void
     * @throws ApiError
     */
    public static deleteTag(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v2/tags/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Returns a list of hosts for a tag
     * Returns a list of hosts for a tag
     * @param id The unique ID of the tag.
     * @returns any OK
     * @throws ApiError
     */
    public static listHostsForTag(
        id: string,
    ): CancelablePromise<(ApiResponse & {
        result?: {
            hosts?: Array<{
                ip?: string;
                tagged_at?: string;
            }>;
        };
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/tags/{id}/hosts',
            path: {
                'id': id,
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
    public static listCertificatesForTag(
        id: string,
    ): CancelablePromise<(ApiResponse & {
        result?: {
            certs?: Array<{
                fingerprint?: string;
                tagged_at?: string;
            }>;
        };
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/tags/{id}/certificates',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Returns a list of tags on the given host.
     * Returns a list of tags on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @returns any OK
     * @throws ApiError
     */
    public static getTagsByHost(
        ip: string,
    ): CancelablePromise<(ApiResponse & {
        result?: {
            ip?: string;
            tags?: Array<Tag>;
        };
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/hosts/{ip}/tags',
            path: {
                'ip': ip,
            },
        });
    }

    /**
     * Adds a tag on the given host.
     * Adds a tag on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @param id The unique ID of the tag.
     * @returns void
     * @throws ApiError
     */
    public static tagHost(
        ip: string,
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v2/hosts/{ip}/tags/{id}',
            path: {
                'ip': ip,
                'id': id,
            },
        });
    }

    /**
     * Removes a tag on the given host.
     * Removes a tag on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @param id The unique ID of the tag.
     * @returns void
     * @throws ApiError
     */
    public static untagHost(
        ip: string,
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v2/hosts/{ip}/tags/{id}',
            path: {
                'ip': ip,
                'id': id,
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
    public static getTagsByCert(
        fingerprint: string,
    ): CancelablePromise<(ApiResponse & {
        result?: {
            fingerprint?: string;
            tags?: Array<Tag>;
        };
    })> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/certificates/{fingerprint}/tags',
            path: {
                'fingerprint': fingerprint,
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
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v2/certificates/{fingerprint}/tags/{id}',
            path: {
                'fingerprint': fingerprint,
                'id': id,
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
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v2/certificates/{fingerprint}/tags/{id}',
            path: {
                'fingerprint': fingerprint,
                'id': id,
            },
        });
    }

}
