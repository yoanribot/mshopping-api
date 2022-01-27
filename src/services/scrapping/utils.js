import axios from "axios";
import fs from "fs";
import { domain } from "process";
import puppeteer from "puppeteer";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36",
};

export async function configureBrowser(url, withBrowser) {
  const browser = await puppeteer.launch({ headless: !withBrowser });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
  });

  await page.goto(url);

  return { browser, page };
}

export function getHtml(url) {
  return axios
    .get(url, { headers })
    .then((response) => response.data)
    .catch(console.error);
}

export function saveFile(name, content) {
  const path = `./files/${name}.html`;

  fs.writeFile(path, content, (err) => {
    if (err) throw err;
    console.log(`Saved ${name}!`);
  });
}

export function getFile() {
  const name =
    "BNTTEAMMinicombinésMoulinetetCanneàLancerTélescopiqueMainPortableDur99%FibredeCarboneMerCanneàpêcheetMoulinetLeurresartificielsFildepêche";
  const path = `./files/${name}.html`;
  let content = "";

  return fs.readFileSync(path, "utf8");
}

export function extractMoney(string) {
  var amount = string.match(/[0-9]+([,.][0-9]+)?/);
  var unit = string.replace(/[0-9]+([,.][0-9]+)?/, "");
  if (amount && unit) {
    return {
      amount: +amount[0].replace(",", "."),
      currency: unit,
    };
  }
  return null;
}
