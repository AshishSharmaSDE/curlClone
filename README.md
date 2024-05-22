# CurlClone

CurlClone is a basic TypeScript program designed to make API calls from the terminal, similar to the CURL command. Under the hood, it uses Axios to handle the API requests.

## Installation

To get started with CurlClone, you need to install the required dependencies. Use the following command:

```bash
npm install
npm run build

```

To test use below commands

```bash
- npm run curl GET www.google.com
- https://jsonplaceholder.typicode.com/guide/
- npm run curl GET https://jsonplaceholder.typicode.com/posts/1
- npm run curl GET https://jsonplaceholder.typicode.com/posts --params "userId=1"
- npm run curl POST https://jsonplaceholder.typicode.com/posts -d '{"title": "foo", "body": "bar", "userId": 1}'
- '{"title": "foo", "body": "bar", "userId": 1}' > data.json
- npm run curl POST https://jsonplaceholder.typicode.com/posts -d @data.json
- npm run curl POST https://jsonplaceholder.typicode.com/posts -d '{"title": "foo", "body": "bar", "userId": 1}' -H "Content-Type: application/json"
- npm run curl PUT https://jsonplaceholder.typicode.com/posts/1 -d '{"id": 1, "title": "foo", "body": "bar", "userId": 1}'
- npm run curl DELETE https://jsonplaceholder.typicode.com/posts/1
- npm run curl GET https://jsonplaceholder.typicode.com/posts/1 -o response.json


```

Would Appriciate All to help optimize it further.
