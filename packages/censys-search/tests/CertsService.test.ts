import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { OpenAPI } from "../src/core/OpenAPI";
import { CertsService } from "../src/services/CertsService";

/*
 * Docs: https://www.npmjs.com/package/axios-mock-adapter
 */

const FINGERPRINT =
    "125d206a9931a1f1a71e4c9a4ce66f2d3a99a64c00d040e7983a211e932ad2f7";
const CERTS_PATH = OpenAPI.BASE + "/v2/certificates/";

const API_RESPONSE = {
    code: 200,
    status: "ok",
    result: "test",
};
const HEADERS = {
    Accept: "application/json",
};
const CERTS_REQUEST = {
    contents: "test",
};
const GET_HOSTS_BY_CERT_RES = {
    ...API_RESPONSE,
    result: {
        /**
         * The SHA-256 fingerprint of the certificate.
         */
        fingerprint: FINGERPRINT,
        hosts: [
            {
                ip: "1.1.1.1",
                name: "test_name",
                observed_at: "01-01-2022",
                first_observed_at: "01-01-2022",
            },
        ],
        links: {
            next: "next",
        },
    },
};
const GET_COMMENTS_BY_CERT_RES = {
    ...API_RESPONSE,
    result: {
        fingerprint: FINGERPRINT,
        comments: [
            {
                id: "string",
                fingerprint: FINGERPRINT,
                author_id: "test_id",
                contents: "test_contents",
                created_at: "01-01-2022",
            },
        ],
    },
};
const ADD_COMMENT_RES = {
    ...API_RESPONSE,
    result: {
        id: "string",
        fingerprint: FINGERPRINT,
        author_id: "test_id",
        contents: "test_contents",
        created_at: "01-01-2022",
    },
};
const GET_COMMENT_BY_CERT_RES = {
    ...API_RESPONSE,
    result: {
        id: "string",
        fingerprint: FINGERPRINT,
        author_id: "test_id",
        contents: "test_contents",
        created_at: "01-01-2022",
    },
};
const UPDATE_COMMENT_REQUEST = {
    contents: "test",
};

const UPDATE_COMMENT_RES = {
    ...API_RESPONSE,
    result: {
        id: "string",
        fingerprint: FINGERPRINT,
        author_id: "test_id",
        contents: "test_contents",
        created_at: "01-01-2022",
    },
};
const DELETE_COMMENT_RES = {
    ...API_RESPONSE,
    result: {
        fingerprint: FINGERPRINT,
        comments: [
            {
                id: "string",
                fingerprint: FINGERPRINT,
                author_id: "test_id",
                contents: "test_contents",
                created_at: "01-01-2022",
            },
        ],
    },
};

const LIST_CERTIFICATES_RES = {
    ...API_RESPONSE,
    result: {
        certs: [
            {
                fingerprint: FINGERPRINT,
                tagged_at: "01-01-2022",
            },
        ],
    },
};
const GET_TAGS_BY_CERT_RES = {
    ...API_RESPONSE,
    result: {
        fingerprint: FINGERPRINT,
        tags: [
            {
                id: "test_id",
                name: "test_name",
                metadata: {
                    color: "test_color",
                },
                created_at: "01-01-2022",
                updated_at: "01-01-2022",
            },
        ],
    },
};

describe("CertsService", () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should return a list of hosts presenting the given certificate and which contain services presenting this certificate", async () => {
        // Test data
        const cursor = "test_cursor";

        // Actual call
        const certsPromise = CertsService.getHostsByCert(FINGERPRINT, cursor);

        // Mock
        mock.onGet(
            CERTS_PATH + FINGERPRINT + `/hosts?cursor=${cursor}`,
            undefined,
            HEADERS
        ).reply(200, GET_HOSTS_BY_CERT_RES);

        // Assertions
        await expect(certsPromise).resolves.toEqual(GET_HOSTS_BY_CERT_RES);
    });

    it("Returns a list of comments on the given certificate.", async () => {
        // Actual call
        const certsPromise = CertsService.getCommentsByCert(FINGERPRINT);

        // Mock
        mock.onGet(
            CERTS_PATH + FINGERPRINT + "/comments",
            undefined,
            HEADERS
        ).reply(200, GET_COMMENTS_BY_CERT_RES);

        // Assertions
        await expect(certsPromise).resolves.toEqual(GET_COMMENTS_BY_CERT_RES);
    });

    it("should add a comment on the given certificate.", async () => {
        // Actual call
        const certsPromise = CertsService.addCommentByCert(
            FINGERPRINT,
            CERTS_REQUEST
        );

        // Mock
        mock.onPost(CERTS_PATH + FINGERPRINT + "/comments", CERTS_REQUEST, {
            ...HEADERS,
            "Content-Type": "application/json",
        }).reply(200, ADD_COMMENT_RES);

        // Assertions
        await expect(certsPromise).resolves.toEqual(ADD_COMMENT_RES);
    });

    it("should return a comment on the given certificate.", async () => {
        // Actual call
        const certsPromise = CertsService.getCommentByCert(
            FINGERPRINT,
            "test_id"
        );

        // Mock
        mock.onGet(
            CERTS_PATH + FINGERPRINT + "/comments/test_id",
            undefined,
            HEADERS
        ).reply(200, GET_COMMENT_BY_CERT_RES);

        // Assertions
        await expect(certsPromise).resolves.toEqual(GET_COMMENT_BY_CERT_RES);
    });

    it("should update a comment on the given certificate.", async () => {
        // Actual call
        const certsPromise = CertsService.updateCommentByCert(
            FINGERPRINT,
            "test_id",
            UPDATE_COMMENT_REQUEST
        );

        // Mock
        mock.onPut(
            CERTS_PATH + FINGERPRINT + "/comments/test_id",
            UPDATE_COMMENT_REQUEST,
            { ...HEADERS, "Content-Type": "application/json" }
        ).reply(200, UPDATE_COMMENT_RES);

        // Assertions
        await expect(certsPromise).resolves.toEqual(UPDATE_COMMENT_RES);
    });

    it("should throw an error", async () => {
        // Actual call
        const certsPromise = CertsService.updateCommentByCert(
            FINGERPRINT,
            "test_id",
            UPDATE_COMMENT_REQUEST
        );

        // Mock
        mock.onPut(
            CERTS_PATH + FINGERPRINT + "/comments/test_id",
            UPDATE_COMMENT_REQUEST,
            { ...HEADERS, "Content-Type": "application/json" }
        ).reply(404, DELETE_COMMENT_RES);

        // Assertions
        await expect(certsPromise).rejects.toThrowError(new Error("Not Found"));
    });

    it("should delete a comment on the given certificate.", async () => {
        // Actual call
        const certsPromise = CertsService.deleteCommentByCert(
            FINGERPRINT,
            "test_id"
        );

        // Mock
        mock.onDelete(
            CERTS_PATH + FINGERPRINT + "/comments/test_id",
            HEADERS
        ).reply(200, DELETE_COMMENT_RES);

        // Assertions
        await expect(certsPromise).resolves.toEqual(DELETE_COMMENT_RES);
    });

    it("delete comment should throw an error", async () => {
        // Actual call
        const certsPromise = CertsService.deleteCommentByCert(
            FINGERPRINT,
            "test_id"
        );

        // Mock
        mock.onDelete(
            CERTS_PATH + FINGERPRINT + "/comments/test_id",
            HEADERS
        ).reply(404, DELETE_COMMENT_RES);

        // Assertions
        await expect(certsPromise).rejects.toThrowError(new Error("Not Found"));
    });

    it("should reurn a list of certificates for a tag", async () => {
        // Actual call
        const certsPromise = CertsService.listCertificatesForTag("test_tag");

        // Mock
        mock.onGet(
            OpenAPI.BASE + "/v2/tags/test_tag/certificates",
            HEADERS
        ).reply(200, LIST_CERTIFICATES_RES);

        // Assertions
        await expect(certsPromise).resolves.toEqual(LIST_CERTIFICATES_RES);
    });

    it("should return a list of tags on the given certificate.", async () => {
        // Actual call
        const certsPromise = CertsService.getTagsByCert(FINGERPRINT);

        // Mock
        mock.onGet(CERTS_PATH + FINGERPRINT + "/tags", HEADERS).reply(
            200,
            GET_TAGS_BY_CERT_RES
        );

        // Assertions
        await expect(certsPromise).resolves.toEqual(GET_TAGS_BY_CERT_RES);
    });

    it("should add a tag on the given certificate.", async () => {
        // Actual call
        const certsPromise = CertsService.tagCert(FINGERPRINT, "test_tag");

        // Mock
        mock.onPost(CERTS_PATH + FINGERPRINT + "/tags/test_tag").reply(200);

        // Assertions
        await expect(certsPromise).resolves.toHaveBeenCalled();
    });
});
