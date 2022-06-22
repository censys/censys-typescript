import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { OpenAPI } from "../src/core/OpenAPI";
import { DataService } from "../src/services/DataService";

const BASE_PATH = OpenAPI.BASE + "/v1/data";
const HEADERS = {
    Accept: "application/json",
};

const GET_SERIES_RES = {
    primary_series: { key: "value" },
    raw_series: { key: "value" },
};

const GET_SERIES_ERRORS = {
    429: `Your query was not executed because you have exceeded your specified rate limit.`,
    500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
};

const VIEW_SERIES_ERRORS = {
    404: `The requested series does not exist.`,
    429: `Your query was not executed because you have exceeded your specified rate limit.`,
    500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
};

const VIEW_RESULT_ERRORS = {
    404: `The requested series or result does not exist.`,
    429: `Your query was not executed because you have exceeded your specified rate limit.`,
    500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
};

const VIEW_SERIES_RES = {
    id: "test_id",
    name: "test_name",
    description: "test_description",
    results: {
        historical: [
            {
                id: "test_id",
                timestamp: "01-01-2022",
                details_url: "test_details",
            },
        ],
        latest: {
            id: "test_id",
            timestamp: "01-01-2022",
            details_url: "test_url",
        },
    },
};

const VIEW_RESULT_RES = {
    id: "test_id",
    timestamp: "01-01-2022",
    files: {
        "zmap-results": {
            file_type: "test_file_type",
            schema: undefined,
            download_path: "path/to/file",
            sha256_fingerprint: "test_fingerprint",
            size: 1,
        },
        "zgrab-results": { key: undefined },
        download_path: "path/to/file",
        sha256_fingerprint: "test_fingerprint",
        size: 1,
    },
};

describe("DataService", () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should return data on the types of scans (series) we perform", async () => {
        // Actual call
        const dataPromise = DataService.getSeries();

        // Mock
        mock.onGet(BASE_PATH, undefined, HEADERS).reply(200, GET_SERIES_RES);

        // Assert
        await expect(dataPromise).resolves.toEqual(GET_SERIES_RES);
    });

    it.each([
        [429, GET_SERIES_ERRORS[429]],
        [500, GET_SERIES_ERRORS[500]],
    ])("getSeries should throw errors", async (status, errorMessage) => {
        // Actual call
        const dataPromise = DataService.getSeries();

        // Mock
        mock.onGet(BASE_PATH, undefined, HEADERS).reply(status);

        //
        await expect(dataPromise).rejects.toThrowError(errorMessage);
    });

    it("should return data about a specified scan (series)", async () => {
        // Actual call
        const dataPromise = DataService.viewSeries("test_series");

        // Mock
        mock.onGet(BASE_PATH + "/test_series", undefined, HEADERS).reply(
            200,
            VIEW_SERIES_RES
        );

        // Assert
        await expect(dataPromise).resolves.toEqual(VIEW_SERIES_RES);
    });

    it.each([
        [404, VIEW_SERIES_ERRORS[404]],
        [429, VIEW_SERIES_ERRORS[429]],
        [500, VIEW_SERIES_ERRORS[500]],
    ])("viewSeries should throw errors", async (status, errorMessage) => {
        // Actual call
        const dataPromise = DataService.viewSeries("test_series");

        // Mock
        mock.onGet(BASE_PATH + "/test_series", undefined, HEADERS).reply(
            status
        );

        //
        await expect(dataPromise).rejects.toThrowError(errorMessage);
    });

    it("should return data on a particular scan", async () => {
        // Actual call
        const dataPromise = DataService.viewResult(
            "test_series",
            "test_result"
        );

        // Mock
        mock.onGet(
            BASE_PATH + "/test_series/test_result",
            undefined,
            HEADERS
        ).reply(200, VIEW_RESULT_RES);

        // Assert
        await expect(dataPromise).resolves.toEqual(VIEW_RESULT_RES);
    });

    it.each([
        [404, VIEW_RESULT_ERRORS[404]],
        [429, VIEW_RESULT_ERRORS[429]],
        [500, VIEW_RESULT_ERRORS[500]],
    ])("viewResult should throw errors", async (status, errorMessage) => {
        // Actual call
        const dataPromise = DataService.viewResult(
            "test_series",
            "test_result"
        );

        // Mock
        mock.onGet(
            BASE_PATH + "/test_series/test_result",
            undefined,
            HEADERS
        ).reply(status);

        // Assert
        await expect(dataPromise).rejects.toThrowError(errorMessage);
    });
});