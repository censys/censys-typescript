import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CensysASM, OpenAPI } from "../src";

const BASE_URL = OpenAPI.BASE;
const API_KEY = "123456789";
const HEADERS = {
    Accept: "application/json",
    "Censys-Api-Key": API_KEY,
};

const IP_ADDRESS = "8.8.8.8";
const DOMAIN = "google.com";
const CERTIFICATE_SHA256 =
    "125d206a9931a1f1a71e4c9a4ce66f2d3a99a64c00d040e7983a211e932ad2f7";
const TEST_COMMENT = {
    markdown: "This is a test comment",
};
const TEST_TAG = "test";

describe("AssetsService", () => {
    let mock: MockAdapter;
    let client: CensysASM;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysASM({ API_KEY });
    });

    afterEach(() => {
        mock.reset();
    });

    it.each([
        // TODO: Add sample responses
        ["hosts", () => client.assets.getV1AssetsHosts(), {}],
        ["domains", () => client.assets.getV1AssetsDomains(), {}],
        ["certificates", () => client.assets.getV1AssetsCertificates(), {}],
    ])("should get V1 Assets %s", async (assetType, method, response) => {
        // Actual call
        const assetsPromise = method();

        // Mock
        mock.onGet(
            BASE_URL + "/v1/assets/" + assetType,
            undefined,
            HEADERS
        ).reply(200, response);

        // Assertions
        await expect(assetsPromise).resolves.toEqual(response);
    });

    it.each([
        // TODO: Add sample responses
        [
            "hosts",
            IP_ADDRESS,
            () => client.assets.getV1AssetsHost(IP_ADDRESS),
            {},
        ],
        ["domains", DOMAIN, () => client.assets.getV1AssetsDomain(DOMAIN), {}],
        [
            "certificates",
            CERTIFICATE_SHA256,
            () => client.assets.getV1AssetsCertificate(CERTIFICATE_SHA256),
            {},
        ],
    ])(
        "should get V1 %s Asset",
        async (assetType, assetId, method, response) => {
            // Actual call
            const assetsPromise = method();

            // Mock
            mock.onGet(
                BASE_URL + "/v1/assets/" + assetType + "/" + assetId,
                undefined,
                HEADERS
            ).reply(200, response);

            // Assertions
            await expect(assetsPromise).resolves.toEqual(response);
        }
    );

    it.each([
        [
            "hosts",
            IP_ADDRESS,
            () => client.assets.getV1AssetsHostsComments(IP_ADDRESS),
            {},
        ],
        [
            "domains",
            DOMAIN,
            () => client.assets.getV1AssetsDomainsComments(DOMAIN),
            {},
        ],
        [
            "certificates",
            CERTIFICATE_SHA256,
            () =>
                client.assets.getV1AssetsCertificateComments(
                    CERTIFICATE_SHA256
                ),
            {},
        ],
    ])(
        "should get V1 Assets %s comments",
        async (assetType, assetId, method, response) => {
            // Actual call
            const assetsPromise = method();

            // Mock
            mock.onGet(
                BASE_URL +
                    "/v1/assets/" +
                    assetType +
                    "/" +
                    assetId +
                    "/comments"
            ).reply(200, response);

            // Assertions
            await expect(assetsPromise).resolves.toEqual(response);
        }
    );

    it.each([
        [
            "hosts",
            IP_ADDRESS,
            () =>
                client.assets.postV1AssetsHostsComments(
                    IP_ADDRESS,
                    TEST_COMMENT
                ),
            {},
        ],
        [
            "domains",
            DOMAIN,
            () =>
                client.assets.postV1AssetsDomainsComments(DOMAIN, TEST_COMMENT),
            {},
        ],
        [
            "certificates",
            CERTIFICATE_SHA256,
            () =>
                client.assets.postV1AssetsCertificatesComments(
                    CERTIFICATE_SHA256,
                    TEST_COMMENT
                ),
            {},
        ],
    ])(
        "should post V1 Assets %s comments",
        async (assetType, assetId, method, response) => {
            // Actual call
            const assetsPromise = method();

            // Mock
            mock.onPost(
                BASE_URL +
                    "/v1/assets/" +
                    assetType +
                    "/" +
                    assetId +
                    "/comments",
                TEST_COMMENT,
                { ...HEADERS, "Content-Type": "application/json" }
            ).reply(200, response);

            // Assertions
            await expect(assetsPromise).resolves.toEqual(response);
        }
    );

    // TODO: Write tests for V1 delete asset comment

    // TODO: Write tests for V1 post asset tag

    // TODO: Write tests for V1 delete asset tag
});
