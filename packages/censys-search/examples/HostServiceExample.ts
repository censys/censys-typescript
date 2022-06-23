import type { ApiResponse, HostHit, VirtualHostHit } from "../";
import { CensysSearch } from "../";

const client = new CensysSearch({
    USERNAME: process.env.CENSYS_API_ID,
    PASSWORD: process.env.CENSYS_API_SECRET,
});

const pagedSearchHosts = async (
    query: string,
    perPage = 100,
    virtualHosts: "EXCLUDE" | "INCLUDE" | "ONLY" = "EXCLUDE",
    pages = 1
): Promise<HostHit | VirtualHostHit[]> => {
    const hosts: Array<HostHit | VirtualHostHit> = [];
    let page = 1;
    let cursor = undefined;
    while (page <= pages) {
        const response: ApiResponse & {
            result?: {
                query: string;
                total: number;
                hits: Array<HostHit | VirtualHostHit>;
            };
            links?: {
                prev?: string;
                next?: string;
            };
        } = await client.hosts.searchHosts(
            query,
            perPage,
            virtualHosts,
            cursor
        );
        if (response.result) {
            hosts.push(...response.result.hits); // eslint-disable-line
            cursor = response.links?.next;
        }
        page++;
    }
    return hosts;
};

pagedSearchHosts("services.service_name: ELASTICSEARCH", 1, "EXCLUDE", 2)
    .then((hosts) => {
        console.log(hosts);
    })
    .catch((err) => {
        console.log(err);
    });

// // Search for hosts
// const searchQuery = "services.service_name: ELASTICSEARCH";
// const perPage = 1;
// let cursor = null;

// client.hosts
//     .searchHosts(searchQuery, perPage)
//     .then(console.log)
//     .catch(console.error);

// // Aggregate hosts
// const aggregate_query = "services.service_name: ELASTICSEARCH";
// const aggregate_field = "ip";
// const aggregate_num_buckets = 10;
