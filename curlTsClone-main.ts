import axios, { Method, AxiosRequestConfig } from "axios";
import * as fs from "fs";
import * as process from "process";

interface RequestConfig {
  method: Method;
  url: string;
  data?: any;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  outputFile?: string;
}

function readFile(filepath: string): string {
  try {
    return fs.readFileSync(filepath, "utf8");
  } catch (error) {
    throw new Error(`Error reading file: ${filepath}`);
  }
}

function parseArguments(args: string[]): RequestConfig {
  const method = args[0].toUpperCase() as Method;
  const url = args[1];
  let data: any = null;
  let headers: Record<string, string> = {};
  let params: Record<string, string> = {};
  let outputFile: string | undefined = undefined;

  for (let i = 2; i < args.length; i++) {
    switch (args[i]) {
      case "-d":
      case "--data":
        const dataSource = args[++i];
        data = dataSource.startsWith("@")
          ? readFile(dataSource.slice(1))
          : dataSource;
        break;
      case "-H":
      case "--header":
        const header = args[++i].split(":");
        if (header.length !== 2) {
          throw new Error(
            'Invalid header format. Use "Header-Name: header value"'
          );
        }
        headers[header[0].trim()] = header[1].trim();
        break;
      case "--params":
        const paramList = args[++i].split("&");
        paramList.forEach((param) => {
          const [key, value] = param.split("=");
          if (key && value) {
            params[key] = value;
          }
        });
        break;
      case "-o":
      case "--output":
        outputFile = args[++i];
        break;
      default:
        throw new Error(`Unknown argument: ${args[i]}`);
    }
  }

  return { method, url, data, headers, params, outputFile };
}

async function makeRequest(config: RequestConfig): Promise<void> {
  try {
    const response = await axios({
      method: config.method,
      url: config.url,
      data: config.data,
      headers: config.headers,
      params: config.params,
    });

    if (config.outputFile) {
      fs.writeFileSync(
        config.outputFile,
        JSON.stringify(response.data, null, 2)
      );
      console.log(`Response data saved to ${config.outputFile}`);
    } else {
      console.log("Response data:", response.data);
    }
  } catch (error) {
    console.error("Error making request:", error);
  }
}

function main(): void {
  try {
    const args = process.argv.slice(2);
    if (args.length < 2) {
      throw new Error(
        "Insufficient arguments. Usage: <method> <url> [options]"
      );
    }

    const config = parseArguments(args);
    makeRequest(config).catch((error) =>
      console.error("Request failed:", error)
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
