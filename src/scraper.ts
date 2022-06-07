import * as cheerio from "cheerio";
import got from "got"
import { createWriteStream } from "fs";

const downloadHTML = async () => new Promise<void>((resolve,reject) =>{
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
  const fileWriterStream = createWriteStream("out.html");

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

export default { downloadHTML };
