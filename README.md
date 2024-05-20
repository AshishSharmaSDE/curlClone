CurlClone is a basic JavaScript Program with functionality to make API calls from terminal just like CURL command in terminals.
Under the Hood it is using Axios to make API calls.

in Order to utilize this install required dependecies using npm install.
Once done, start testing APIs in a format As given Below:

node curlClone.js GET www.google.com
https://jsonplaceholder.typicode.com/guide/
node curlClone.js GET https://jsonplaceholder.typicode.com/posts/1
node curlClone.js GET https://jsonplaceholder.typicode.com/posts --params "userId=1"
node curlClone.js POST https://jsonplaceholder.typicode.com/posts -d '{"title": "foo", "body": "bar", "userId": 1}'
'{"title": "foo", "body": "bar", "userId": 1}' > data.json
node curlClone.js POST https://jsonplaceholder.typicode.com/posts -d @data.json
node curlClone.js POST https://jsonplaceholder.typicode.com/posts -d '{"title": "foo", "body": "bar", "userId": 1}' -H "Content-Type: application/json"
node curlClone.js PUT https://jsonplaceholder.typicode.com/posts/1 -d '{"id": 1, "title": "foo", "body": "bar", "userId": 1}'
node curlClone.js DELETE https://jsonplaceholder.typicode.com/posts/1
node curlClone.js GET https://jsonplaceholder.typicode.com/posts/1 -o response.json

Would Appriciate All to help optimize it further.
