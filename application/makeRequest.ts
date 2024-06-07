import axios from "axios";
import { RequestConfig } from "../proxy/RequestConfig";
import { writeFile } from "../io/fileSystem";

export async function makeRequest(config: RequestConfig): Promise<void> {
  try {
    const response = await axios({
      method: config.method,
      url: config.url,
      data: config.data,
      headers: config.headers,
      params: config.params,
    });

    if (config.outputFile) {
      writeFile(config.outputFile, JSON.stringify(response.data, null, 2));
      console.log(`Response data saved to ${config.outputFile}`);
    } else {
      console.log("Response data:", response.data);
    }
  } catch (error) {
    console.error("Error making request:", error);
  }
}
