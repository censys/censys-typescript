import axios from "axios";
import MockAdapter from "axios-mock-adapter";
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
        let accountPromise = AccountService.account();

        // Mock
        mock.onGet("https://search.censys.io/api/v1/account", undefined, {
            Accept: "application/json",
        }).reply(200, ACCOUNT_RES);

        // Assertions
        const result = await accountPromise;
        expect(result).toEqual(ACCOUNT_RES);
    });
});
