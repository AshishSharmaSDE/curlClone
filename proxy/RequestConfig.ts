import { Method } from "axios";

export interface RequestConfig {
  method: Method;
  url: string;
  data?: any;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  outputFile?: string;
}
