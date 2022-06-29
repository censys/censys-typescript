import { CensysSearch } from "../src/CensysSearch";

const client = new CensysSearch({
    USERNAME: process.env.CENSYS_API_ID,
    PASSWORD: process.env.CENSYS_API_SECRET,
});

// Output account info to console
client.account.account().then(console.log).catch(console.error);
