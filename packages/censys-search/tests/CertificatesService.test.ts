import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { OpenAPI } from "../src/core/OpenAPI";
import { CertificatesService } from "../src/services/CertificatesService";

const FINGERPRINT =
    "125d206a9931a1f1a71e4c9a4ce66f2d3a99a64c00d040e7983a211e932ad2f7";
const VIEW_PATH = OpenAPI.BASE + "/v1/view/certificates/";
const SEARCH_PATH = OpenAPI.BASE + "/v1/search/certificates";
const HEADERS = {
    Accept: "application/json",
};
const SEARCH_REQUEST = {
    query: "test",
    page: 1,
    fields: [],
    flatten: true,
};
const VIEW_CERTIFICATE_RES = {
    raw: "test",
    parsed: {
        fingerprint_sha1: "test",
        fingerprint_sha256: FINGERPRINT,
        fingerprint_md5: "test",
        serial_number: "test",
        subject_key_info: undefined,
        names: [],
        subject_dn: "test",
        subject: undefined,
        issuer_dn: "test",
        issuer: undefined,
        signature: undefined,
        redacted: true,
        validity: undefined,
        version: 1,
        extensions: undefined,
    },
    ct: undefined,
};
const SEARCH_CERTIFICATE_RES = {
    status: "ok",
    metadata: {
        count: 1,
        query: SEARCH_REQUEST.query,
        page: SEARCH_REQUEST.page,
        pages: 1,
    },
    results: [VIEW_CERTIFICATE_RES],
};
const VIEW_ERRORS = {
    404: `The requested record does not exist.`,
    429: `Your query was not executed because you have exceeded your specified rate limit.`,
    500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
};
const SEARCH_ERRORS = {
    400: `Your query could not be executed (e.g., query could not be parsed or timed out.)`,
    404: `Specified search index was not valid.`,
    429: `Your query was not executed because you have exceeded your specified rate limit.`,
    500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
};

describe("CertificatesService", () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should return structured certificate data for the specified SHA-256 fingerprint", async () => {
        // Actual call
        const certificatePromise =
            CertificatesService.viewCertificate(FINGERPRINT);

        // Mock
        mock.onGet(VIEW_PATH + FINGERPRINT, undefined, HEADERS).reply(
            200,
            VIEW_CERTIFICATE_RES
        );

        // Assertions
        await expect(certificatePromise).resolves.toEqual(VIEW_CERTIFICATE_RES);
    });

    it.each([
        [404, VIEW_ERRORS[404]],
        [429, VIEW_ERRORS[429]],
        [500, VIEW_ERRORS[500]],
    ])("should throw a %i error", async (status, errorMessage) => {
        // Actual call
        const certificatePromise =
            CertificatesService.viewCertificate(FINGERPRINT);

        // Mock
        mock.onGet(VIEW_PATH + FINGERPRINT, undefined, HEADERS).reply(status);

        // Assertions
        await expect(certificatePromise).rejects.toThrowError(errorMessage);
    });

    it("should return a list of certificates", async () => {
        // Actual call
        const certificatesPromise =
            CertificatesService.searchCertificates(SEARCH_REQUEST);

        // Mock
        mock.onPost(SEARCH_PATH, SEARCH_REQUEST, {
            ...HEADERS,
            "Content-Type": "application/json",
        }).reply(200, SEARCH_CERTIFICATE_RES);

        // Assertions
        await expect(certificatesPromise).resolves.toEqual(
            SEARCH_CERTIFICATE_RES
        );
    });

    // TODO: Write tests for SEARCH_ERRORS
    it.each([
        [400, SEARCH_ERRORS[400]],
        [404, SEARCH_ERRORS[404]],
        [429, SEARCH_ERRORS[429]],
        [500, SEARCH_ERRORS[500]],
    ])("should throw a %i error", async (status, errorMessage) => {
        // Actual call
        const certificatePromise =
            CertificatesService.searchCertificates(SEARCH_REQUEST);

        // Mock
        mock.onPost(SEARCH_PATH, SEARCH_REQUEST, {
            ...HEADERS,
            "Content-Type": "application/json",
        }).reply(status);

        // Assertions
        await expect(certificatePromise).rejects.toThrowError(errorMessage);
    });
});
