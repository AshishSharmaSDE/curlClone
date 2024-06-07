import * as fs from "fs";

export function readFile(filepath: string): string {
  try {
    return fs.readFileSync(filepath, "utf8");
  } catch (error) {
    throw new Error(`Error reading file: ${filepath}`);
  }
}

export function writeFile(filepath: string, data: string): void {
  try {
    fs.writeFileSync(filepath, data);
  } catch (error) {
    throw new Error(`Error writing file: ${filepath}`);
  }
}
