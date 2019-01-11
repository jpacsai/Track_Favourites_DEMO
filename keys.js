const clientId = '';        // type in okta ID
const oktaURL = '';         // type in okta URL
const goodreadsKey = '';    // type in Goodreads API key

/*
NOTE: The value of oktaURL should be something like `dev-123456.oktapreview`. Make sure you don't include `-admin` in the value!
*/

module.exports = {
    id: clientId,
    domain: oktaURL,
    bookKey: goodreadsKey
}