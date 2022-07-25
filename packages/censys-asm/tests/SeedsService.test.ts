import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CensysASM, OpenAPI } from "../src";

const BASE_URL = OpenAPI.BASE;
const API_KEY = "123456789";
const HEADERS = {
    Accept: "application/json",
    "Censys-Api-Key": API_KEY,
};
//TODO: Increase test coverage

describe("SeedsService", () => {
    let mock: MockAdapter;
    let client: CensysASM;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysASM({ API_KEY });
    });

    afterEach(() => {
        mock.reset();
    });

    it("should put V1 seeds", async () => {
        // Test data
        const label = "label";

        // Actual call
        const seedsPromise = client.seeds.putV1Seeds(label, {
            seeds: [
                {
                    type: "IP_ADDRESS",
                    value: "8.8.8.8",
                },
            ],
        });

        // Mock
        mock.onPut(
            `${BASE_URL}/v1/seeds?label=${label}`,
            {
                seeds: [
                    {
                        type: "IP_ADDRESS",
                        value: "8.8.8.8",
                    },
                ],
            },
            {
                ...HEADERS,
                "Content-Type": "application/json",
            }
        ).reply(200, {});

        // Assertions
        await expect(seedsPromise).resolves.toEqual({});
    });
});
