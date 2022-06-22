import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { OpenAPI } from "../src/core/OpenAPI";
import { MetadataService } from "../src/services/MetadataService";

const HEADERS = {
    Accept: "application/json",
};

const API_RESPONSE = {
    code: 200,
    status: "ok",
    result: "test",
};

const GET_HOST_METADATA_RES = {
    ...API_RESPONSE,
    result: {
        services: ["test_service"],
    },
};

describe("MetadataService", () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should return host metadata about what Censys scans for", async () => {
        // Actual call
        const metadataPromise = MetadataService.getHostMetadata();
        // Mock
        mock.onGet(
            OpenAPI.BASE + "/v2/metadata/hosts",
            undefined,
            HEADERS
        ).reply(200, GET_HOST_METADATA_RES);

        // Assertions
        await expect(metadataPromise).resolves.toEqual(GET_HOST_METADATA_RES);
    });
});
