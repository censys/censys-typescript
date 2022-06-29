import { CensysSearch } from "../src";

const client = new CensysSearch({
    USERNAME: process.env.CENSYS_API_ID,
    PASSWORD: process.env.CENSYS_API_SECRET,
});

const FINGERPRINT =
    "125d206a9931a1f1a71e4c9a4ce66f2d3a99a64c00d040e7983a211e932ad2f7";

// Get a list of hosts presenting the given certificate
client.certs.getHostsByCert(FINGERPRINT).then(console.log).catch(console.error);

/// Get a list of comments on the given certificate
client.certs
    .getCommentsByCert(FINGERPRINT)
    .then(console.log)
    .catch(console.error);

// Add a comment on the given certificate
client.certs
    .addCommentByCert(FINGERPRINT, { contents: "This is a test comment" })
    .then(console.log)
    .catch(console.error);

// Return a comment on the given certificate
client.certs
    .getCommentByCert(FINGERPRINT, "797")
    .then(console.log)
    .catch(console.error);

// Update a comment on the given certificate
client.certs
    .updateCommentByCert(FINGERPRINT, "802", {
        contents: "This is an updated comment",
    })
    .then(console.log)
    .catch(console.error);

// Delete a comment on the given certificate
client.certs
    .deleteCommentByCert(FINGERPRINT, "803")
    .then(console.log)
    .catch(console.error);

// Return  list of certificates for a tag
client.certs.listCertificatesForTag("1").then(console.log).catch(console.error);

// Return a list of tags on the given certificate.
client.certs.getTagsByCert(FINGERPRINT).then(console.log).catch(console.error);

// Add a tag to the given certificate.
client.certs.tagCert(FINGERPRINT, "997").then(console.log).catch(console.error);

// Remove a tag from the given certificate.
client.certs
    .untagCert(FINGERPRINT, "997")
    .then(console.log)
    .catch(console.error);
