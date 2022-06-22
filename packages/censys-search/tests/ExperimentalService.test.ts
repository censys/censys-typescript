import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { OpenAPI } from "../src/core/OpenAPI";
import { CensysSearch } from "../src";

const IP = "8.8.8.8";
const START_TIME = "01-01-2022";
const END_TIME = "01-01-2022";
const PER_PAGE = 25;
const CURSOR = "test_cursor";
const REVERSED = true;

const API_RESPONSE = {
    code: 200,
    status: "ok",
    result: "test",
};

const HEADERS = {
    Accept: "application/json",
};

const PATH = OpenAPI.BASE + "/v2/experimental/hosts/" + IP + "/events";

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

describe("ExperimentalService", () => {
    let mock: MockAdapter;
    let client: CensysSearch;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysSearch();
    });

    afterEach(() => {
        mock.reset();
    });

    it("should return host events for the specified IP address", async () => {
        // Actual call
        const experimentalPromise = client.experimental.viewHostEvents(
            IP,
            START_TIME,
            END_TIME,
            PER_PAGE,
            CURSOR,
            REVERSED
        );
        // Mock
        mock.onGet(
            PATH +
                "?start_time=" +
                START_TIME +
                "&end_time=" +
                END_TIME +
                "&per_page=" +
                `${PER_PAGE}` +
                "&cursor=" +
                CURSOR +
                "&reversed=" +
                `true`,
            undefined,
            HEADERS
        ).reply(200, VIEW_HOST_EVENTS_RES);
        // Assert
        await expect(experimentalPromise).resolves.toEqual(
            VIEW_HOST_EVENTS_RES
        );
    });

    it.each([
        [401, VIEW_HOST_EVENTS_ERRORS[401]],
        [422, VIEW_HOST_EVENTS_ERRORS[422]],
    ])("viewHostEvents should throw errors", async (status, errorMessage) => {
        // Actual call
        const experimentalPromise = client.experimental.viewHostEvents(
            IP,
            START_TIME,
            END_TIME,
            PER_PAGE,
            CURSOR,
            REVERSED
        );
        // Mock
        mock.onGet(
            PATH +
                "?start_time=" +
                START_TIME +
                "&end_time=" +
                END_TIME +
                "&per_page=" +
                `${PER_PAGE}` +
                "&cursor=" +
                CURSOR +
                "&reversed=" +
                `true`,
            undefined,
            HEADERS
        ).reply(status);

        // Assert
        await expect(experimentalPromise).rejects.toThrowError(errorMessage);
    });
});
