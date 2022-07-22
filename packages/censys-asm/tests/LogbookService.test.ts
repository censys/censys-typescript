import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CensysASM, OpenAPI } from "../src";

const BASE_URL = OpenAPI.BASE;
const API_KEY = "123456789";
//TODO: Increase test coverage

describe("LogbookService", () => {
    let mock: MockAdapter;
    let client: CensysASM;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysASM({ API_KEY });
    });

    afterEach(() => {
        mock.reset();
    });

    it("should post logbook cursor", async () => {
        // Test data
        const requestBody = {
            dateFrom: "2020-01-01",
        };

        // Actual call
        const logbookPromise = client.logbook.postV1LogbookCursor(requestBody);

        // Mock
        mock.onPost(`${BASE_URL}/v1/logbook-cursor`).reply(200, {
            cursor: "cursor",
        });

        // Assertions
        await expect(logbookPromise).resolves.toEqual({
            cursor: "cursor",
        });
    });
});
