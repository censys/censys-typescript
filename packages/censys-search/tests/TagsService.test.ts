import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { OpenAPI } from "../src/core/OpenAPI";
import { TagsService } from "../src/services/TagsService";

const BASE_PATH = OpenAPI.BASE;
const HEADERS = {
    Accept: "application/json",
};

const API_RESPONSE = {
    code: 200,
    status: "ok",
    result: "test",
};

const LIST_TAGS_RES = {
    ...API_RESPONSE,
    result: {
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

const CREATE_TAG_RES = {
    ...API_RESPONSE,
    result: {
        id: "test_id",
        name: "test_name",
        metadata: {
            color: "test_color",
        },
        created_at: "01-01-2022",
        updated_at: "01-01-2022",
    },
};

const LIST_HOSTS_FOR_TAG_RES = {
    ...API_RESPONSE,
    result: {
        hosts: [
            {
                ip: "8.8.8.8",
                tagged_at: "01-01-2022",
            },
        ],
    },
};

//TODO change fingerprint
const LIST_CERTS_FOR_TAG_RES = {
    ...API_RESPONSE,
    result: {
        certs: [
            {
                fingerprint: "test_fingerprint",
                tagged_at: "01-01-2022",
            },
        ],
    },
};

const GET_TAGS_BY_HOST_RES = {
    ...API_RESPONSE,
    result: {
        ip: "8.8.8.8",
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

const GET_TAGS_BY_CERT_RES = {
    ...API_RESPONSE,
    result: {
        fingerprint: "test_fingerprint",
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

describe("TagsService", () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should return a list of all tags", async () => {
        // Actual call
        const tagsPromise = TagsService.listTags();

        // Mock
        mock.onGet(BASE_PATH + "/v2/tags", undefined, HEADERS).reply(
            200,
            LIST_TAGS_RES
        );

        // Assertions
        await expect(tagsPromise).resolves.toEqual(LIST_TAGS_RES);
    });

    it("should create a new tag", async () => {
        // Test data
        const tag = {
            id: "test_id",
            name: "test_name",
            metadata: {
                color: "test_color",
            },
            created_at: "01-01-2022",
            updated_at: "01-01-2022",
        };

        // Actual call
        const tagsPromise = TagsService.createTag(tag);

        // Mock
        mock.onPost(BASE_PATH + "/v2/tags", tag, {
            ...HEADERS,
            "Content-Type": "application/json",
        }).reply(200, CREATE_TAG_RES);

        // Assertions
        await expect(tagsPromise).resolves.toEqual(CREATE_TAG_RES);
    });

    it("should return a tag", async () => {
        // Test data
        const tagId = "test_id";

        // Actual call
        const tagsPromise = TagsService.getTag(tagId);

        // Mock
        mock.onGet(BASE_PATH + "/v2/tags/" + tagId, undefined, HEADERS).reply(
            200,
            CREATE_TAG_RES
        );

        // Assertions
        await expect(tagsPromise).resolves.toEqual(CREATE_TAG_RES);
    });

    it("should update a tag", async () => {
        // Test data
        const tagId = "test_id";
        const tag = {
            id: "test_id",
            name: "test_name",
            metadata: {
                color: "test_color",
            },
            created_at: "01-01-2022",
            updated_at: "01-01-2022",
        };

        // Actual call
        const tagsPromise = TagsService.updateTag(tagId, tag);

        // Mock
        mock.onPut(BASE_PATH + "/v2/tags/" + tagId, tag, {
            ...HEADERS,
            "Content-Type": "application/json",
        }).reply(200, CREATE_TAG_RES);

        // Assertions
        await expect(tagsPromise).resolves.toEqual(CREATE_TAG_RES);
    });

    it("should delete a tag", async () => {
        // Test data
        const tagId = "test_id";

        // Actual call
        const tagsPromise = TagsService.deleteTag(tagId);

        // Mock
        mock.onDelete(
            BASE_PATH + "/v2/tags/" + tagId,
            undefined,
            HEADERS
        ).reply(204);

        // Assertions
        await expect(tagsPromise).resolves.not.toThrow();
    });

    it("should return a list of hosts for a tag", async () => {
        // Test data
        const tagId = "test_id";

        // Actual call
        const tagsPromise = TagsService.listHostsForTag(tagId);

        // Mock
        mock.onGet(
            BASE_PATH + "/v2/tags/" + tagId + "/hosts",
            undefined,
            HEADERS
        ).reply(200, LIST_HOSTS_FOR_TAG_RES);

        // Assertions
        await expect(tagsPromise).resolves.toEqual(LIST_HOSTS_FOR_TAG_RES);
    });

    it("should return a list of certificates for a tag", async () => {
        // Test data
        const tagId = "test_id";

        // Actual call
        const tagsPromise = TagsService.listCertificatesForTag(tagId);

        // Mock
        mock.onGet(
            BASE_PATH + "/v2/tags/" + tagId + "/certificates",
            undefined,
            HEADERS
        ).reply(200, LIST_CERTS_FOR_TAG_RES);

        // Assertions
        await expect(tagsPromise).resolves.toEqual(LIST_CERTS_FOR_TAG_RES);
    });

    it("should return a list of tags on the given host", async () => {
        // Test data
        const ip = "8.8.8.8";

        // Actual call
        const tagsPromise = TagsService.getTagsByHost(ip);

        // Mock
        mock.onGet(
            BASE_PATH + "/v2/hosts/" + ip + "/tags",
            undefined,
            HEADERS
        ).reply(200, GET_TAGS_BY_HOST_RES);

        // Assertions
        await expect(tagsPromise).resolves.toEqual(GET_TAGS_BY_HOST_RES);
    });

    //TODO: fix this test
    it("should add a tag on the given host", async () => {
        // Test data
        const ip = "8.8.8.8";
        const tagId = "test_id";

        // Actual call
        const tagsPromise = TagsService.tagHost(ip, tagId);

        // Mock
        mock.onPut(BASE_PATH + "/v2/hosts/" + ip + "/tags/" + tagId).reply(204);

        // Assertions
        await expect(tagsPromise).resolves.not.toThrow();
    });

    it("should remove a tag on the given host", async () => {
        // Test data
        const ip = "8.8.8.8";
        const tagId = "test_id";

        // Actual call
        const tagsPromise = TagsService.untagHost(ip, tagId);

        // Mock
        mock.onDelete(
            BASE_PATH + "/v2/hosts/" + ip + "/tags/" + tagId,
            undefined,
            HEADERS
        ).reply(204);

        // Assertions
        await expect(tagsPromise).resolves.not.toThrow();
    });

    it("should return a list of tags on the given certificate", async () => {
        // Test data
        const fingerprint = "test_fingerprint";

        // Actual call
        const tagsPromise = TagsService.getTagsByCert(fingerprint);

        // Mock
        mock.onGet(
            BASE_PATH + "/v2/certificates/" + fingerprint + "/tags",
            undefined,
            HEADERS
        ).reply(200, GET_TAGS_BY_CERT_RES);

        // Assertions
        await expect(tagsPromise).resolves.toEqual(GET_TAGS_BY_CERT_RES);
    });

    it("should add a tag on the given certificate", async () => {
        // Test data
        const fingerprint = "test_fingerprint";
        const tagId = "test_id";

        // Actual call
        const tagsPromise = TagsService.tagCert(fingerprint, tagId);

        // Mock
        mock.onPut(
            BASE_PATH + "/v2/certificates/" + fingerprint + "/tags/" + tagId
        ).reply(204);

        // Assertions
        await expect(tagsPromise).resolves.not.toThrow();
    });

    it("should remove a tag on the given certificate", async () => {
        // Test data
        const fingerprint = "test_fingerprint";
        const tagId = "test_id";

        // Actual call
        const tagsPromise = TagsService.untagCert(fingerprint, tagId);

        // Mock
        mock.onDelete(
            BASE_PATH + "/v2/certificates/" + fingerprint + "/tags/" + tagId,
            undefined,
            HEADERS
        ).reply(204);

        // Assertions
        await expect(tagsPromise).resolves.not.toThrow();
    });
});
