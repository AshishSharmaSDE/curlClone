import { readFile } from "../io/fileSystem";
import { RequestConfig } from "../proxy/RequestConfig";
import { Method } from "axios";

export function parseArguments(args: string[]): RequestConfig {
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
