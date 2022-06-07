import scraper from "./scraper";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const htmlFile = path.join(path.dirname(fileURLToPath(import.meta.url)), "./../out/gipfel.html");
if (!fs.existsSync(htmlFile)) {
    console.log("download...")
  scraper.downloadHTML(htmlFile);
}
scraper.parseToJSON(htmlFile,"");