import * as cheerio from "cheerio";
import got from "got";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const downloadHTML = async (htmlPath: string) =>
  new Promise<void>((resolve, reject) => {
    const downloadStream = got.stream.post(
      "http://teufelsturm.de/wege/suche.php",
      {
        json: {
          start: "0",
          gebiet: "0",
          text: "",
          skala_von: "",
          skala_bis: "",
          datum: "1",
          sortiert: "1",
          benutzer: "",
          bewertungen: "",
          avgbewertung: "",
          gipfelnr: "",
          volltext: "",
          anzahl: "Alle",
          abschicken: "anzeigen",
        },
      }
    );
    const fileWriterStream = fs.createWriteStream(htmlPath);

    downloadStream.pipe(fileWriterStream);
    downloadStream.on("error", (error) => {
      reject(error);
    });

    fileWriterStream
      .on("error", (error) => {
        reject(error);
      })
      .on("finish", () => {
        resolve();
      });
  });

const parseToJSON = async (htmlPath: string, jsonPath: string) =>
  new Promise<void>((resolve, reject) => {
    const $ = cheerio.load(fs.readFileSync(htmlPath));
    $("body:nth-child(2) ").each((i, element) => {
      console.log(element);
    });
  });

export default { downloadHTML, parseToJSON };
