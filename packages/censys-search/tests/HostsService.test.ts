import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { OpenAPI } from "../src/core/OpenAPI";
import { HostsService } from "../src/services/HostsService";

const Q = "test_query";
const IP = "8.8.8.8";
const IPB = "1.1.1.1";
const BASE_PATH = OpenAPI.BASE;

const SEARCH_PATH = OpenAPI.BASE + "/v2/hosts/search";
const AGGREGATE_PATH = OpenAPI.BASE + "/v2/hosts/aggregate";

const API_RESPONSE = {
    code: 200,
    status: "ok",
    result: "test",
};

const REQUEST_BODY = {
    contents: "test_contents",
};

const HEADERS = {
    Accept: "application/json",
};

const SEARCH_HOSTS_RES = {
    ...API_RESPONSE,
    result: {
        query: Q,
        total: 1,
        hits: [
            {
                ip: "8.8.8.8",
                services: [
                    {
                        port: 80,
                        service_name: "http",
                        transport_protocol: "tcp",
                        certificate: "test_cert",
                    },
                ],
                location: {
                    continent: "test_continent",
                    country: "test_country",
                    country_code: "test_country_code",
                    postal_code: "test_postal_code",
                    timezone: "test_timezone",
                    coordinates: {
                        latitude: "test_latitude",
                        longitude: "test_longitude",
                    },
                    registered_country: "test_registered_country",
                    registered_country_code: "test_registered_country_code",
                },
                autonomous_system: {
                    asn: 1,
                    description: "test_description",
                    bgp_prefix: "test_bgp_prefix",
                    name: "test_name",
                    country_code: "test_country_code",
                },
            },
        ],
    },

    links: {
        prev: "prev",
        next: "next",
    },
};

const AGGREGATE_HOSTS_RES = {
    ...API_RESPONSE,
    result: {
        total: 1,
        total_omitted: 1,
        potential_deviation: 1,
        buckets: [
            {
                key: "test_key",
                count: 1,
            },
        ],
        query: Q,
        field: "test_field",
    },
};

const SEARCH_HOSTS_ERRORS = {
    400: `Bad Request.`,
    401: `You must authenticate with a valid API ID and secret.`,
    422: `Invalid cursor.`,
};

const AGGREGATE_HOSTS_ERRORS = {
    400: `Bad Request.`,
    401: `You must authenticate with a valid API ID and secret.`,
};

const HOST = {
    ip: IP,
    services: [
        {
            port: 80,
            service_name: "test_service_name",
            extended_service_name: "test_extended_service_name",
            transport_protocol: "TCP",
            software: ["test_software"],
            truncated: true,
            perspective_id: "PERSPECTIVE_NTT",
        },
    ],
    location_updated_at: "test_location_updated_at",
    location: {
        continent: "test_continent",
        country: "test_country",
        country_code: "test_country_code",
        postal_code: "test_postal_code",
        timezone: "test_timezone",
        coordinates: {
            latitude: "test_latitude",
            longitude: "test_longitude",
        },
        registered_country: "test_registered_country",
        registered_country_code: "test_registered_country_code",
    },
    autonomous_system_updated_at: "test_updated_at",
    autonomous_system: {
        asn: 1,
        description: "test_description",
        bgp_prefix: "test_prefix",
        name: "test_name",
        country_code: "test_country_code",
    },
    operating_system: {
        product: "test_product",
        vendor: "test_vendor",
        version: "1.0.0",
        edition: "test_edition",
        uniform_resource_identifier: "test_identifier",
        other: undefined,
    },
};

const VIEW_HOST_RES = {
    ...API_RESPONSE,
    result: {
        ...HOST,
        last_updated_at: "01-01-2022",
        location_updated_at: "test_location",
        autonomous_system_updated_at: "01-01-2022",
    },
};

const VIEW_HOST_ERRORS = {
    401: `You must authenticate with a valid API ID and secret.`,
    422: `Invalid IP address.`,
};

const VIEW_HOST_DIFF_RES = {
    ...API_RESPONSE,
    result: {
        a: {
            /**
             * The IP address of the original host.
             */
            ip: IP,
            /**
             * Returned updated timestamp of the original host.
             */
            last_updated_at: "01-01-2022",
        },
        b: {
            /**
             * The IP address of the other host.
             */
            ip: IPB,
            /**
             * Returned updated timestamp of the other host.
             */
            last_updated_at: "01-02-2022",
        },
        patch: [],
    },
};

const VIEW_HOST_DIFF_ERRORS = {
    401: `You must authenticate with a valid API ID and secret.`,
    422: `Invalid IP address.`,
};

const VIEW_HOST_EVENTS_RES = {
    ...API_RESPONSE,
    result: {
        ip: IP,
        events: [{ _event: "test_event", timestamp: "01-01-2022" }],
    },
};

const VIEW_HOST_EVENTS_ERRORS = {
    401: `You must authenticate with a valid API ID and secret.`,
    422: `Invalid IP address.`,
};

const VIEW_HOST_NAMES_RES = {
    ...API_RESPONSE,
    result: {
        names: ["test_name"],
        links: {
            next: "next",
        },
    },
};

const VIEW_HOST_NAMES_ERRORS = {
    401: `You must authenticate with a valid API ID and secret.`,
};

const GET_COMMENTS_BY_HOST_RES = {
    ...API_RESPONSE,
    result: {
        ip: IP,
        comments: [
            {
                id: "test_id",
                ip: IP,
                author_id: "test_author_id",
                contents: "test_contents",
                created_at: "01-01-2022",
            },
        ],
    },
};

const ADD_COMMENT_BY_HOST_RES = {
    ...API_RESPONSE,
    result: {
        id: "test_id",
        ip: IP,
        author_id: "test_author_id",
        contents: "test_contents",
        created_at: "01-01-2022",
    },
};

const ADD_COMMENT_BY_HOST_ERRORS = {
    422: `Unprocessable Entity`,
};

const GET_COMMENT_BY_HOST_ERRORS = {
    404: `Not Found`,
    422: `Unprocessable Entity`,
};

const GET_HOST_METADATA_RES = {
    ...API_RESPONSE,
    result: {
        services: ["test_service"],
    },
};

const LIST_HOSTS_FOR_TAG_RES = {
    ...API_RESPONSE,
    result: {
        hosts: [
            {
                ip: IP,
                tagged_at: "01-01-2022",
            },
        ],
    },
};

const GET_TAGS_BY_HOST_RES = {
    ...API_RESPONSE,
    result: {
        ip: IP,
        tags: ["test_tag"],
    },
};

describe("HostsService", () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should return previews of hosts matching a specified search query", async () => {
        // Actual call
        const hostsPromise = HostsService.searchHosts(
            Q,
            1,
            "EXCLUDE",
            "test_cursor"
        );

        // Mock
        mock.onGet(
            SEARCH_PATH +
                `?q=${Q}&per_page=1&virtual_hosts=EXCLUDE&cursor=test_cursor`,
            undefined,
            HEADERS
        ).reply(200, SEARCH_HOSTS_RES);

        // Assert
        await expect(hostsPromise).resolves.toEqual(SEARCH_HOSTS_RES);
    });

    it.each([
        [400, SEARCH_HOSTS_ERRORS[400]],
        [401, SEARCH_HOSTS_ERRORS[401]],
        [422, SEARCH_HOSTS_ERRORS[422]],
    ])("searchHosts should throw errors", async (status, errorMessage) => {
        // Actual call
        const hostsPromise = HostsService.searchHosts(
            Q,
            1,
            "EXCLUDE",
            "test_cursor"
        );

        // Mock
        mock.onGet(
            SEARCH_PATH +
                `?q=${Q}&per_page=1&virtual_hosts=EXCLUDE&cursor=test_cursor`,
            undefined,
            HEADERS
        ).reply(status);

        // Assert
        await expect(hostsPromise).rejects.toThrow(errorMessage);
    });

    it("should return aggregation of hosts that match the given query string", async () => {
        // Actual call
        const hostsPromise = HostsService.aggregateHosts(
            "test_field",
            Q,
            1,
            "EXCLUDE"
        );

        // Mock
        mock.onGet(
            AGGREGATE_PATH +
                `?q=${Q}&field=test_field&num_buckets=1&virtual_hosts=EXCLUDE`,
            undefined,
            HEADERS
        ).reply(200, AGGREGATE_HOSTS_RES);

        // Assert
        await expect(hostsPromise).resolves.toEqual(AGGREGATE_HOSTS_RES);
    });

    it.each([
        [400, AGGREGATE_HOSTS_ERRORS[400]],
        [401, AGGREGATE_HOSTS_ERRORS[401]],
    ])("aggregateHosts should throw errors", async (status, errorMessage) => {
        // Actual call
        const hostsPromise = HostsService.aggregateHosts(
            "test_field",
            Q,
            1,
            "EXCLUDE"
        );

        // Mock
        mock.onGet(
            AGGREGATE_PATH +
                `?q=${Q}&field=test_field&num_buckets=1&virtual_hosts=EXCLUDE`,
            undefined,
            HEADERS
        ).reply(status);

        // Assert
        await expect(hostsPromise).rejects.toThrow(errorMessage);
    });

    it("should return host information for the specified IP address", async () => {
        // Actual call
        const hostsPromise = HostsService.viewHost(IP, "01-01-2022");

        // Mock
        mock.onGet(
            BASE_PATH + "/v2/hosts/" + IP + "?at_time=01-01-2022",
            undefined,
            HEADERS
        ).reply(200, VIEW_HOST_RES);

        // Assert
        await expect(hostsPromise).resolves.toEqual(VIEW_HOST_RES);
    });

    it.each([
        [401, VIEW_HOST_ERRORS[401]],
        [422, VIEW_HOST_ERRORS[422]],
    ])("viewHost should throw errors", async (status, errorMessage) => {
        // Actual call
        const hostsPromise = HostsService.viewHost(IP, "01-01-2022");

        // Mock
        mock.onGet(
            BASE_PATH + "/v2/hosts/" + IP + "?at_time=01-01-2022",
            undefined,
            HEADERS
        ).reply(status);

        // Assert
        await expect(hostsPromise).rejects.toThrow(errorMessage);
    });

    it("should return a diff of a host against different points in time", async () => {
        // Test data
        const atTime = "01-01-2022";
        const atTimeB = "01-02-2022";

        // Actual call
        const hostsPromise = HostsService.viewHostDiff(
            IP,
            IPB,
            atTime,
            atTimeB
        );

        // Mock
        mock.onGet(
            BASE_PATH +
                `/v2/hosts/${IP}/diff?ip_b=${IPB}&at_time=${atTime}&at_time_b=${atTimeB}`,
            undefined,
            HEADERS
        ).reply(200, VIEW_HOST_DIFF_RES);

        // Assert
        await expect(hostsPromise).resolves.toEqual(VIEW_HOST_DIFF_RES);
    });

    it.each([
        [401, VIEW_HOST_DIFF_ERRORS[401]],
        [422, VIEW_HOST_DIFF_ERRORS[422]],
    ])("viewHostDiff should throw errors", async (status, errorMessage) => {
        // Actual call
        const hostsPromise = HostsService.viewHostDiff(
            IP,
            IPB,
            "01-01-2022",
            "01-02-2022"
        );

        // Mock
        mock.onGet(
            BASE_PATH +
                `/v2/hosts/${IP}/diff?ip_b=${IPB}&at_time=01-01-2022&at_time_b=01-02-2022`,
            undefined,
            HEADERS
        ).reply(status);

        // Assert
        await expect(hostsPromise).rejects.toThrow(errorMessage);
    });

    it("should return host events for the specified IP address", async () => {
        // Test data
        const start_time = "01-01-2022";
        const end_time = "01-02-2022";
        const per_page = 1;
        const cursor = "test_cursor";
        const reversed = true;
        // Actual call
        const hostsPromise = HostsService.viewHostEvents(
            IP,
            start_time,
            end_time,
            per_page,
            cursor,
            reversed
        );

        // Mock
        mock.onGet(
            BASE_PATH +
                `/v2/experimental/hosts/${IP}/events?start_time=${start_time}&end_time=${end_time}&per_page=${per_page}&cursor=${cursor}&reversed=true`,
            undefined,
            HEADERS
        ).reply(200, VIEW_HOST_EVENTS_RES);

        // Assert
        await expect(hostsPromise).resolves.toEqual(VIEW_HOST_EVENTS_RES);
    });

    it.each([
        [401, VIEW_HOST_EVENTS_ERRORS[401]],
        [422, VIEW_HOST_EVENTS_ERRORS[422]],
    ])("viewHostEvents should throw errors", async (status, errorMessage) => {
        // Actual call
        const hostsPromise = HostsService.viewHostEvents(
            IP,
            "01-01-2022",
            "01-02-2022",
            1,
            "test_cursor",
            true
        );

        // Mock
        mock.onGet(
            BASE_PATH +
                `/v2/experimental/hosts/${IP}/events?start_time=01-01-2022&end_time=01-02-2022&per_page=1&cursor=test_cursor&reversed=true`,
            undefined,
            HEADERS
        ).reply(status);

        // Assert
        await expect(hostsPromise).rejects.toThrow(errorMessage);
    });

    it("should return host names for the specified IP address", async () => {
        // Test data
        const perPage = 1;
        const cursor = "test_cursor";

        // Actual call
        const hostsPromise = HostsService.viewHostNames(IP, perPage, cursor);

        // Mock
        mock.onGet(
            BASE_PATH +
                `/v2/hosts/${IP}/names?per_page=${perPage}&cursor=${cursor}`,
            undefined,
            HEADERS
        ).reply(200, VIEW_HOST_NAMES_RES);

        // Assert
        await expect(hostsPromise).resolves.toEqual(VIEW_HOST_NAMES_RES);
    });

    it.each([[401, VIEW_HOST_NAMES_ERRORS[401]]])(
        "viewHostNames should throw errors",
        async (status, errorMessage) => {
            // Actual call
            const hostsPromise = HostsService.viewHostNames(
                IP,
                1,
                "test_cursor"
            );

            // Mock
            mock.onGet(
                BASE_PATH +
                    `/v2/hosts/${IP}/names?per_page=1&cursor=test_cursor`,
                undefined,
                HEADERS
            ).reply(status);

            // Assert
            await expect(hostsPromise).rejects.toThrow(errorMessage);
        }
    );

    it("should return a list of comments on the given host", async () => {
        // Actual call
        const hostsPromise = HostsService.getCommentsByHost(IP);

        // Mock
        mock.onGet(
            BASE_PATH + `/v2/hosts/${IP}/comments`,
            undefined,
            HEADERS
        ).reply(200, GET_COMMENTS_BY_HOST_RES);

        // Assert
        await expect(hostsPromise).resolves.toEqual(GET_COMMENTS_BY_HOST_RES);
    });

    it("should add a comment to the given host", async () => {
        // Actual call
        const hostsPromise = HostsService.addCommentByHost(IP, REQUEST_BODY);

        // Mock
        mock.onPost(BASE_PATH + `/v2/hosts/${IP}/comments`, REQUEST_BODY, {
            ...HEADERS,
            "Content-Type": "application/json",
        }).reply(200, ADD_COMMENT_BY_HOST_RES);

        // Assert
        await expect(hostsPromise).resolves.toEqual(ADD_COMMENT_BY_HOST_RES);
    });

    it("addCommentByHost should throw an error", async () => {
        // Actual call
        const hostsPromise = HostsService.addCommentByHost(IP, REQUEST_BODY);

        // Mock
        mock.onPost(BASE_PATH + `/v2/hosts/${IP}/comments`, REQUEST_BODY, {
            ...HEADERS,
            "Content-Type": "application/json",
        }).reply(422);

        // Assert
        await expect(hostsPromise).rejects.toThrowError(
            ADD_COMMENT_BY_HOST_ERRORS[422]
        );
    });

    it("should return a specific comment on the given host", async () => {
        // Actual call
        const comment_id = "test_comment_id";
        const hostsPromise = HostsService.getCommentByHost(IP, comment_id);

        // Mock
        mock.onGet(
            BASE_PATH + `/v2/hosts/${IP}/comments/${comment_id}`,
            undefined,
            HEADERS
        ).reply(200, ADD_COMMENT_BY_HOST_RES);

        // Assert
        await expect(hostsPromise).resolves.toEqual(ADD_COMMENT_BY_HOST_RES);
    });

    it.each([
        [404, GET_COMMENT_BY_HOST_ERRORS[404]],
        [422, GET_COMMENT_BY_HOST_ERRORS[422]],
    ])("getCommentByHost should throw errors", async (status, errorMessage) => {
        // Actual call
        const comment_id = "test_comment_id";
        const hostsPromise = HostsService.getCommentByHost(IP, comment_id);

        // Mock
        mock.onGet(
            BASE_PATH + `/v2/hosts/${IP}/comments/${comment_id}`,
            undefined,
            HEADERS
        ).reply(status);

        // Assert
        await expect(hostsPromise).rejects.toThrow(errorMessage);
    });

    it("should update a specific comment on the given host", async () => {
        // Actual call
        const comment_id = "test_comment_id";
        const hostsPromise = HostsService.updateCommentByHost(
            IP,
            comment_id,
            REQUEST_BODY
        );

        // Mock
        mock.onPut(
            BASE_PATH + `/v2/hosts/${IP}/comments/${comment_id}`,
            REQUEST_BODY,
            {
                ...HEADERS,
                "Content-Type": "application/json",
            }
        ).reply(200, ADD_COMMENT_BY_HOST_RES);

        // Assert
        await expect(hostsPromise).resolves.toEqual(ADD_COMMENT_BY_HOST_RES);
    });

    it.each([
        [404, GET_COMMENT_BY_HOST_ERRORS[404]],
        [422, GET_COMMENT_BY_HOST_ERRORS[422]],
    ])(
        "updateCommentByHost should throw errors",
        async (status, errorMessage) => {
            // Actual call
            const comment_id = "test_comment_id";
            const hostsPromise = HostsService.updateCommentByHost(
                IP,
                comment_id,
                REQUEST_BODY
            );

            // Mock
            mock.onPut(
                BASE_PATH + `/v2/hosts/${IP}/comments/${comment_id}`,
                REQUEST_BODY,
                {
                    ...HEADERS,
                    "Content-Type": "application/json",
                }
            ).reply(status);

            // Assert
            await expect(hostsPromise).rejects.toThrow(errorMessage);
        }
    );

    it("should delete a specific comment on the given host", async () => {
        // Actual call
        const comment_id = "test_comment_id";
        const hostsPromise = HostsService.deleteCommentByHost(IP, comment_id);

        // Mock
        mock.onDelete(
            BASE_PATH + `/v2/hosts/${IP}/comments/${comment_id}`,
            undefined,
            HEADERS
        ).reply(200);

        // Assert
        await expect(hostsPromise).resolves.not.toThrow();
    });

    it.each([
        [404, GET_COMMENT_BY_HOST_ERRORS[404]],
        [422, GET_COMMENT_BY_HOST_ERRORS[422]],
    ])(
        "deleteCommentByHost should throw errors",
        async (status, errorMessage) => {
            // Actual call
            const comment_id = "test_comment_id";
            const hostsPromise = HostsService.deleteCommentByHost(
                IP,
                comment_id
            );

            // Mock
            mock.onDelete(
                BASE_PATH + `/v2/hosts/${IP}/comments/${comment_id}`,
                undefined,
                HEADERS
            ).reply(status);

            // Assert
            await expect(hostsPromise).rejects.toThrow(errorMessage);
        }
    );

    it("should return host metatdata about what Censys scans for", async () => {
        // Actual call
        const hostsPromise = HostsService.getHostMetadata();

        // Mock
        mock.onGet(BASE_PATH + `/v2/metadata/hosts`, undefined, HEADERS).reply(
            200,
            GET_HOST_METADATA_RES
        );

        // Assert
        await expect(hostsPromise).resolves.toEqual(GET_HOST_METADATA_RES);
    });

    it("should return a list of hosts for a tag", async () => {
        // Test data
        const id = "test_id";

        // Actual call
        const hostsPromise = HostsService.listHostsForTag(id);

        // Mock
        mock.onGet(
            BASE_PATH + `/v2/tags/${id}/hosts`,
            undefined,
            HEADERS
        ).reply(200, LIST_HOSTS_FOR_TAG_RES);

        // Assert
        await expect(hostsPromise).resolves.toEqual(LIST_HOSTS_FOR_TAG_RES);
    });

    it("should return a list of tags on the given host", async () => {
        // Actual call
        const hostsPromise = HostsService.getTagsByHost(IP);

        // Mock
        mock.onGet(
            BASE_PATH + `/v2/hosts/${IP}/tags`,
            undefined,
            HEADERS
        ).reply(200, GET_TAGS_BY_HOST_RES);

        // Assert
        await expect(hostsPromise).resolves.toEqual(GET_TAGS_BY_HOST_RES);
    });

    //TODO fix this test
    it("should add a tag to the given host", async () => {
        // Actual call
        const hostsPromise = HostsService.tagHost(IP, "test_tag");

        // Mock
        mock.onPut(BASE_PATH + `/v2/hosts/${IP}/tags/test_tag`).reply(204);

        // Assert
        await expect(hostsPromise).resolves.not.toThrow();
    });

    it("should remove a tag on the given host", async () => {
        // Actual call
        const id = "test_id";
        const hostsPromise = HostsService.untagHost(IP, id);

        // Mock
        mock.onDelete(
            BASE_PATH + `/v2/hosts/${IP}/tags/${id}`,
            undefined,
            HEADERS
        ).reply(204);

        // Assert
        await expect(hostsPromise).resolves.not.toThrow();
    });
});
