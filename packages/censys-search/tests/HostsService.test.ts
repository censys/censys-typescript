import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { OpenAPI } from "../src/core/OpenAPI";
import { HostsService } from "../src/services/HostsService";

const Q = "test_query";

const PATH = OpenAPI.BASE + "/v2/hosts/search";

const API_RESPONSE = {
    code: 200,
    status: "ok",
    result: "test",
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

const SEARCH_HOSTS_ERRORS = {
    400: `Bad Request.`,
    401: `You must authenticate with a valid API ID and secret.`,
    422: `Invalid cursor.`,
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
            PATH +
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
            PATH +
                `?q=${Q}&per_page=1&virtual_hosts=EXCLUDE&cursor=test_cursor`,
            undefined,
            HEADERS
        ).reply(status);

        // Assert
        await expect(hostsPromise).rejects.toThrow(errorMessage);
    });
});
