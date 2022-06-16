import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { OpenAPI } from "../src/core/OpenAPI";
import { AccountService } from "../src/services/AccountService";

const ACCOUNT_RES = {
    email: "test@example.com",
    login: "test",
    first_login: "2022-01-01",
    last_login: "2022-01-01",
    quota: {
        used: 0,
        resets_at: "2022-01-01",
        allowance: 0,
    },
};
const ERRORS = {
    403: `Your request did not include a valid Authorization header.`,
    429: `Your query was not executed because you have exceeded your specified rate limit.`,
    500: "An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.",
};

const ACCOUNT_PATH = OpenAPI.BASE + "/v1/account";
const HEADERS = {
    Accept: "application/json",
};

describe("AccountService", () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should fetch account details", async () => {
        // Actual call
        const accountPromise = AccountService.account();

        // Mock
        mock.onGet(ACCOUNT_PATH, undefined, HEADERS).reply(200, ACCOUNT_RES);

        // Assertions
        await expect(accountPromise).resolves.toEqual(ACCOUNT_RES);
    });

    it("should throw a 403 error", async () => {
        // Actual call
        const accountPromise = AccountService.account();

        // Mock
        mock.onGet(ACCOUNT_PATH, undefined, HEADERS).reply(403);

        // Assertions
        await expect(accountPromise).rejects.toThrowError(
            new Error(ERRORS[403])
        );
    });

    it("should throw a 429 error", async () => {
        // Actual call
        const accountPromise = AccountService.account();

        // Mock
        mock.onGet(ACCOUNT_PATH, undefined, HEADERS).reply(429);

        // Assertions
        await expect(accountPromise).rejects.toThrowError(
            new Error(ERRORS[429])
        );
    });

    it("should throw a 500 error", async () => {
        // Actual call
        const accountPromise = AccountService.account();

        // Mock
        mock.onGet(ACCOUNT_PATH, undefined, HEADERS).reply(500);

        // Assertions
        await expect(accountPromise).rejects.toThrowError(
            new Error(ERRORS[500])
        );
    });
});
