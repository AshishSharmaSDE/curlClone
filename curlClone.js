const axios = require("axios");
const fs = require("fs");

// Function to handle HTTP requests
async function makeRequest(method, url, data, headers, params, outputFile) {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
      params,
    });

    if (outputFile) {
      fs.writeFileSync(outputFile, JSON.stringify(response.data, null, 2));
      console.log(`Response data saved to ${outputFile}`);
    } else {
      console.log("Response data:", response.data);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Function to read data from a file
function readFile(filepath) {
  return fs.readFileSync(filepath, "utf8");
}

// Main function to parse command line arguments and execute the appropriate request
function main() {
  const args = process.argv.slice(2);
  const method = args[0].toUpperCase();
  const url = args[1];
  let data = null;
  let headers = {};
  let params = {};
  let outputFile = null;

  // Process additional arguments
  for (let i = 2; i < args.length; i++) {
    if (args[i] === "-d" || args[i] === "--data") {
      const dataSource = args[++i];

      if (dataSource.startsWith("@")) {
        const filepath = dataSource.slice(1);
        data = readFile(filepath);
      } else {
        data = dataSource;
      }
    } else if (args[i] === "-H" || args[i] === "--header") {
      const header = args[++i].split(":");
      headers[header[0].trim()] = header[1].trim();
    } else if (args[i] === "--params") {
      const paramList = args[++i].split("&");
      paramList.forEach((param) => {
        const [key, value] = param.split("=");
        params[key] = value;
      });
    } else if (args[i] === "-o" || args[i] === "--output") {
      outputFile = args[++i];
    }
  }

  makeRequest(method, url, data, headers, params, outputFile);
}

main();

// node curlClone.js GET www.google.com
// https://jsonplaceholder.typicode.com/guide/
// node curlClone.js GET https://jsonplaceholder.typicode.com/posts/1
// node curlClone.js GET https://jsonplaceholder.typicode.com/posts --params "userId=1"
// node curlClone.js POST https://jsonplaceholder.typicode.com/posts -d '{"title": "foo", "body": "bar", "userId": 1}'
// '{"title": "foo", "body": "bar", "userId": 1}' > data.json
// node curlClone.js POST https://jsonplaceholder.typicode.com/posts -d @data.json
// node curlClone.js POST https://jsonplaceholder.typicode.com/posts -d '{"title": "foo", "body": "bar", "userId": 1}' -H "Content-Type: application/json"
// node curlClone.js PUT https://jsonplaceholder.typicode.com/posts/1 -d '{"id": 1, "title": "foo", "body": "bar", "userId": 1}'
// node curlClone.js DELETE https://jsonplaceholder.typicode.com/posts/1
// node curlClone.js GET https://jsonplaceholder.typicode.com/posts/1 -o response.json
