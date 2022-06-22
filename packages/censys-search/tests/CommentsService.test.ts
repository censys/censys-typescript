import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { OpenAPI } from "../src/core/OpenAPI";
import { CommentsService } from "../src/services/CommentsService";

const API_RESPONSE = {
    code: 200,
    status: "ok",
    result: "test",
};
const IP = "8.8.8.8";
const HEADERS = {
    Accept: "application/json",
};
const GET_COMMENTS_BY_HOST_RES = {
    ...API_RESPONSE,
    result: {
        ip: IP,
        comments: [
            {
                id: "test_id",
                ip: IP,
                author_id: "test_author_id",
                contents: "test_contents",
                created_at: "01-01-2022",
            },
        ],
    },
};
const REQUEST_BODY = {
    contents: "test",
};
const ADD_COMMENT_RES = {
    ...API_RESPONSE,
    result: {
        id: "test_id",
        ip: IP,
        author_id: "test_author_id",
        contents: "test_contents",
        created_at: "01-01-2022",
    },
};
const ADD_COMMENT_ERROR = {
    422: "Unprocessable Entity",
};
const GET_COMMENTS_BY_HOST_ERRORS = {
    404: `Not Found`,
    422: `Unprocessable Entity`,
};
const UPDATE_COMMENT_RES = {
    ...API_RESPONSE,
    result: {
        id: "test_id",
        ip: IP,
        author_id: "test_author_id",
        contents: "test_contents",
        created_at: "01-01-2022",
    },
};
const FINGERPRINT =
    "125d206a9931a1f1a71e4c9a4ce66f2d3a99a64c00d040e7983a211e932ad2f7";

const GET_COMMENTS_BY_CERT_RES = {
    ...API_RESPONSE,
    result: {
        fingerprint: FINGERPRINT,
        comments: [
            {
                id: "test_id",
                fingerprint: FINGERPRINT,
                author_id: "test_author_id",
                contents: "test_contents",
                created_at: "01-01-2022",
            },
        ],
    },
};

const ADD_COMMENT_BY_CERT_RES = {
    ...API_RESPONSE,
    result: {
        id: "test_id",
        fingerprint: FINGERPRINT,
        author_id: "test_author_id",
        contents: "test_contents",
        created_at: "01-01-2022",
    },
};

describe("CommentsService", () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should get comments by host", async () => {
        // Actual call
        const commentsPromise = CommentsService.getCommentsByHost(IP);

        // Mock
        const PATH = OpenAPI.BASE + `/v2/hosts/${IP}/comments`;
        mock.onGet(PATH, undefined, HEADERS).reply(
            200,
            GET_COMMENTS_BY_HOST_RES
        );

        // Assert
        await expect(commentsPromise).resolves.toEqual(
            GET_COMMENTS_BY_HOST_RES
        );
    });

    it("should add a comment on the given host", async () => {
        // Actual call
        const commentsPromise = CommentsService.addCommentByHost(
            IP,
            REQUEST_BODY
        );

        // Mock
        const PATH = OpenAPI.BASE + `/v2/hosts/${IP}/comments`;
        mock.onPost(PATH, REQUEST_BODY, {
            ...HEADERS,
            "Content-Type": "application/json",
        }).reply(200, ADD_COMMENT_RES);

        // Assert
        await expect(commentsPromise).resolves.toEqual(ADD_COMMENT_RES);
    });

    it("addCommentByHost should throw an error if the request fails", async () => {
        // Actual call
        const commentsPromise = CommentsService.addCommentByHost(
            IP,
            REQUEST_BODY
        );

        // Mock
        const PATH = OpenAPI.BASE + `/v2/hosts/${IP}/comments`;
        mock.onPost(PATH, REQUEST_BODY, {
            ...HEADERS,
            "Content-Type": "application/json",
        }).reply(422);

        // Assert
        await expect(commentsPromise).rejects.toThrowError(
            ADD_COMMENT_ERROR[422]
        );
    });

    it("should return a specific comment on the given host", async () => {
        // Actual call
        const commentsPromise = CommentsService.getCommentByHost(IP, "test_id");

        // Mock
        const PATH = OpenAPI.BASE + `/v2/hosts/${IP}/comments/test_id`;
        mock.onGet(PATH, undefined, HEADERS).reply(200, ADD_COMMENT_RES);

        // Assert
        await expect(commentsPromise).resolves.toEqual(ADD_COMMENT_RES);
    });
    it.each([
        [404, GET_COMMENTS_BY_HOST_ERRORS[404]],
        [422, GET_COMMENTS_BY_HOST_ERRORS[422]],
    ])(
        "should throw an error if the request fails with status %i",
        async (status, errorMessage) => {
            // Actual call
            const commentsPromise = CommentsService.getCommentByHost(
                IP,
                "test_id"
            );
            const PATH = OpenAPI.BASE + `/v2/hosts/${IP}/comments/test_id`;

            // Mock
            mock.onGet(PATH, undefined, HEADERS).reply(status);

            // Assert
            await expect(commentsPromise).rejects.toThrowError(errorMessage);
        }
    );

    it("should update a specific comment on the given host", async () => {
        // Actual call
        const commentsPromise = CommentsService.updateCommentByHost(
            IP,
            "test_id",
            REQUEST_BODY
        );

        // Mock
        const PATH = OpenAPI.BASE + `/v2/hosts/${IP}/comments/test_id`;
        mock.onPut(PATH, REQUEST_BODY, {
            ...HEADERS,
            "Content-Type": "application/json",
        }).reply(200, UPDATE_COMMENT_RES);

        // Assert
        await expect(commentsPromise).resolves.toEqual(UPDATE_COMMENT_RES);
    });

    it.each([
        [404, GET_COMMENTS_BY_HOST_ERRORS[404]],
        [422, GET_COMMENTS_BY_HOST_ERRORS[422]],
    ])(
        "should throw an error if the request fails with status %i",
        async (status, errorMessage) => {
            // Actual call
            const commentsPromise = CommentsService.updateCommentByHost(
                IP,
                "test_id",
                REQUEST_BODY
            );
            const PATH = OpenAPI.BASE + `/v2/hosts/${IP}/comments/test_id`;

            // Mock
            mock.onPut(PATH, undefined, {
                ...HEADERS,
                "Content-Type": "application/json",
            }).reply(status);

            // Assert
            await expect(commentsPromise).rejects.toThrowError(errorMessage);
        }
    );

    it("should delete a specific comment on the given host", async () => {
        // Actual call
        const commentsPromise = CommentsService.deleteCommentByHost(
            IP,
            "test_id"
        );

        // Mock
        const PATH = OpenAPI.BASE + `/v2/hosts/${IP}/comments/test_id`;
        mock.onDelete(PATH, undefined, HEADERS).reply(200);

        // Assert
        await expect(commentsPromise).resolves.toEqual(undefined);
    });

    it.each([
        [404, GET_COMMENTS_BY_HOST_ERRORS[404]],
        [422, GET_COMMENTS_BY_HOST_ERRORS[422]],
    ])(
        "should throw an error if the request fails with status %i",
        async (status, errorMessage) => {
            // Actual call
            const commentsPromise = CommentsService.deleteCommentByHost(
                IP,
                "test_id"
            );
            const PATH = OpenAPI.BASE + `/v2/hosts/${IP}/comments/test_id`;

            // Mock
            mock.onDelete(PATH, undefined, HEADERS).reply(status);

            // Assert
            await expect(commentsPromise).rejects.toThrowError(errorMessage);
        }
    );

    it("should return a list of comments on the given cert", async () => {
        // Actual call
        const commentsPromise = CommentsService.getCommentsByCert(FINGERPRINT);

        // Mock
        const PATH = OpenAPI.BASE + `/v2/certificates/${FINGERPRINT}/comments`;
        mock.onGet(PATH, undefined, HEADERS).reply(
            200,
            GET_COMMENTS_BY_CERT_RES
        );

        // Assertions
        await expect(commentsPromise).resolves.toEqual(
            GET_COMMENTS_BY_CERT_RES
        );
    });

    it("should add a comment on the given certificate", async () => {
        // Actual call
        const commentsPromise = CommentsService.addCommentByCert(
            FINGERPRINT,
            REQUEST_BODY
        );

        // Mock
        const PATH = OpenAPI.BASE + `/v2/certificates/${FINGERPRINT}/comments`;
        mock.onPost(PATH, REQUEST_BODY, {
            ...HEADERS,
            "Content-Type": "application/json",
        }).reply(200, ADD_COMMENT_BY_CERT_RES);

        // Assertions
        await expect(commentsPromise).resolves.toEqual(ADD_COMMENT_BY_CERT_RES);
    });

    it("should return a comment on the given certificate", async () => {
        // Actual call
        const commentsPromise = CommentsService.getCommentByCert(
            FINGERPRINT,
            "test_id"
        );

        // Mock
        const PATH =
            OpenAPI.BASE + `/v2/certificates/${FINGERPRINT}/comments/test_id`;
        mock.onGet(PATH, undefined, HEADERS).reply(
            200,
            ADD_COMMENT_BY_CERT_RES
        );

        // Assert
        await expect(commentsPromise).resolves.toEqual(ADD_COMMENT_BY_CERT_RES);
    });

    it("should update a comment on the given certificate", async () => {
        // Actual call
        const commentsPromise = CommentsService.updateCommentByCert(
            FINGERPRINT,
            "test_id",
            REQUEST_BODY
        );

        // Mock
        const PATH =
            OpenAPI.BASE + `/v2/certificates/${FINGERPRINT}/comments/test_id`;
        mock.onPut(PATH, REQUEST_BODY, {
            ...HEADERS,
            "Content-Type": "application/json",
        }).reply(200, ADD_COMMENT_BY_CERT_RES);

        // Assert
        await expect(commentsPromise).resolves.toEqual(ADD_COMMENT_BY_CERT_RES);
    });

    it("should throw a 404 error", async () => {
        // Actual call
        const commentsPromise = CommentsService.updateCommentByCert(
            FINGERPRINT,
            "test_id",
            REQUEST_BODY
        );

        // Mock
        const PATH =
            OpenAPI.BASE + `/v2/certificates/${FINGERPRINT}/comments/test_id`;
        mock.onPut(PATH, REQUEST_BODY, {
            ...HEADERS,
            "Content-Type": "application/json",
        }).reply(404);

        // Assert
        await expect(commentsPromise).rejects.toThrowError("Not Found");
    });

    it("should delete a comment on the given certificate", async () => {
        // Actual call
        const commentsPromise = CommentsService.deleteCommentByCert(
            FINGERPRINT,
            "test_id"
        );

        // Mock
        const PATH =
            OpenAPI.BASE + `/v2/certificates/${FINGERPRINT}/comments/test_id`;
        mock.onDelete(PATH, REQUEST_BODY, HEADERS).reply(
            200,
            GET_COMMENTS_BY_CERT_RES
        );

        // Assert
        await expect(commentsPromise).resolves.toEqual(
            GET_COMMENTS_BY_CERT_RES
        );
    });

    it("deleteCommentByCert should throw a 404 error", async () => {
        // Actual call
        const commentsPromise = CommentsService.deleteCommentByCert(
            FINGERPRINT,
            "test_id"
        );

        // Mock
        const PATH =
            OpenAPI.BASE + `/v2/certificates/${FINGERPRINT}/comments/test_id`;
        mock.onPut(PATH, REQUEST_BODY, HEADERS).reply(404);

        // Assert
        await expect(commentsPromise).rejects.toThrowError("Not Found");
    });
});
