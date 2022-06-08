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
        form: {
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
        fileWriterStream.close();
        resolve();
      });
  });

const parseToJSON = async (htmlPath: string, jsonPath: string) =>
  new Promise<void>((resolve, reject) => {
    const $ = cheerio.load(fs.readFileSync(htmlPath));
    $(
      "body:nth-child(2) tbody tr td:nth-child(2) table tbody tr td div table tbody tr"
    ).each((rowIndex, row) => {
      if (rowIndex == 28)
        row.children.forEach((element, index) => {
          console.log($($(element).find("font")).text());
        });
    });
  });

export default { downloadHTML, parseToJSON };
