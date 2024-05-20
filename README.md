# CurlClone

CurlClone is a basic JavaScript program designed to make API calls from the terminal, similar to the CURL command. Under the hood, it uses Axios to handle the API requests.

## Installation

To get started with CurlClone, you need to install the required dependencies. Use the following command:

```bash
npm install
```

To test use below commands

```bash
- node curlClone.js GET www.google.com
- https://jsonplaceholder.typicode.com/guide/
- node curlClone.js GET https://jsonplaceholder.typicode.com/posts/1
- node curlClone.js GET https://jsonplaceholder.typicode.com/posts --params "userId=1"
- node curlClone.js POST https://jsonplaceholder.typicode.com/posts -d '{"title": "foo", "body": "bar", "userId": 1}'
- '{"title": "foo", "body": "bar", "userId": 1}' > data.json
- node curlClone.js POST https://jsonplaceholder.typicode.com/posts -d @data.json
- node curlClone.js POST https://jsonplaceholder.typicode.com/posts -d '{"title": "foo", "body": "bar", "userId": 1}' -H "Content-Type: application/json"
- node curlClone.js PUT https://jsonplaceholder.typicode.com/posts/1 -d '{"id": 1, "title": "foo", "body": "bar", "userId": 1}'
- node curlClone.js DELETE https://jsonplaceholder.typicode.com/posts/1
- node curlClone.js GET https://jsonplaceholder.typicode.com/posts/1 -o response.json


```

Would Appriciate All to help optimize it further.
