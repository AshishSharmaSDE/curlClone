import { parseArguments } from "./application/parseArguments";
import { makeRequest } from "./application/makeRequest";
import * as process from "process";

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
