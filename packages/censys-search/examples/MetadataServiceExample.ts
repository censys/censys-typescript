import { CensysSearch } from "../src";

const client = new CensysSearch({
    USERNAME: process.env.CENSYS_API_ID,
    PASSWORD: process.env.CENSYS_API_SECRET,
});

// View host metadata about what Censys scans for
client.metadata.getHostMetadata().then(console.log).catch(console.error);
