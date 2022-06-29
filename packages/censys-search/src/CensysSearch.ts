/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { AxiosHttpRequest } from "./core/AxiosHttpRequest";
import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";

import { AccountService } from "./services/AccountService";
import { CertificatesService } from "./services/CertificatesService";
import { CertsService } from "./services/CertsService";
import { CommentsService } from "./services/CommentsService";
import { DataService } from "./services/DataService";
import { ExperimentalService } from "./services/ExperimentalService";
import { HostsService } from "./services/HostsService";
import { MetadataService } from "./services/MetadataService";
import { TagsService } from "./services/TagsService";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class CensysSearch {
    public readonly account: AccountService;
    public readonly certificates: CertificatesService;
    public readonly certs: CertsService;
    public readonly comments: CommentsService;
    public readonly data: DataService;
    public readonly experimental: ExperimentalService;
    public readonly hosts: HostsService;
    public readonly metadata: MetadataService;
    public readonly tags: TagsService;

    public readonly request: BaseHttpRequest;

    constructor(
        config?: Partial<OpenAPIConfig>,
        HttpRequest: HttpRequestConstructor = AxiosHttpRequest
    ) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? "https://search.censys.io/api",
            VERSION: config?.VERSION ?? "2.0",
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? "include",
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.account = new AccountService(this.request);
        this.certificates = new CertificatesService(this.request);
        this.certs = new CertsService(this.request);
        this.comments = new CommentsService(this.request);
        this.data = new DataService(this.request);
        this.experimental = new ExperimentalService(this.request);
        this.hosts = new HostsService(this.request);
        this.metadata = new MetadataService(this.request);
        this.tags = new TagsService(this.request);
    }
}
