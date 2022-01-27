import {
  getHtml,
  saveFile,
  getFile,
  extractMoney,
  configureBrowser,
} from "../utils";
import cheerio from "cheerio";
import fs from "fs";
import puppeteer from "puppeteer";
import { amazonAfiliateIdMapper, languageCodeMapper } from "./amazon-constants";
import { getStoreAndDomain } from "../../helper";

require("dotenv").config();

const dir = "./files/screenshots";

export async function byPassLoguin(page) {
  // USERNAME
  await page.$eval(
    "#ap_email",
    (el, value) => (el.value = value),
    process.env.AMAZON_USER_EMAIL
  );

  await page.click("#continue");

  // PASSWORD
  await page.waitForSelector("#ap_password");
  await page.type("#ap_password", process.env.AMAZON_USER_PASSWORD);

  await page.click("#signInSubmit");
}

// ASIN Code
export function getAmazonProductId(url) {
  const regex = RegExp(
    "(http[s]?://)?([\\w.-]+)(:[0-9]+)?/([\\w-%]+/)?(dp|gp/product|exec/obidos/asin)/(\\w+/)?(\\w{10})(.*)?"
  );
  const match = url.match(regex);

  if (match) {
    return match[7];
  }
  return;
}

export async function getAmazonProductInfo(url) {
  console.log("runAmazonProductScraper ....");
  console.log("url --- ", url);

  try {
    const html = await getHtml(url);
    const $ = cheerio.load(html);

    const prod = {};

    // GET Name
    const name = $("#productTitle")
      .text()
      .replace(/\r?\n|\r/g, "");

    // Save File
    // saveFile(name, html);

    // is Available
    const outOfStock = false;

    console.log(
      "outOfStock res +++++++++++",
      $("#availability > .a-color-success").length
    );

    // GET Price
    let amount = 0;
    let currency = "";

    if (!outOfStock) {
      const ourPrice = $("#priceblock_ourprice").text();
      const salePrice = $("#priceblock_saleprice").text();
      const dealPrice = $("#priceblock_dealprice").text();
      const newArticlePrice = $("#newBuyBoxPrice").text();
      const princeBuyBox = $("#price_inside_buybox").text();
      const _priceText =
        ourPrice || salePrice || dealPrice || newArticlePrice || princeBuyBox;

      console.log("ourPrice", ourPrice);
      console.log("salePrice", salePrice);
      console.log("dealPrice", dealPrice);
      console.log("newArticlePrice", newArticlePrice);
      console.log("princeBuyBox", princeBuyBox);
      console.log("_priceText", _priceText);

      const { amount: _amount, currency: _currency } = extractMoney(_priceText);
      amount = _amount;
      currency = _currency;

      console.log("amount", amount);
      console.log("currency", currency);
    }

    // BUILD PRODUCT DATA STRUTURE
    prod.outOfStock = outOfStock;
    prod.name = name;
    prod.price = !outOfStock ? parseFloat(amount).toFixed(2) : null;
    prod.currency = !outOfStock ? currency : null;

    return prod;
  } catch (error) {
    console.log("ERROR:", error);
  }
}

export async function getAmazonAfiliateLink(productUrl, developMode) {
  return await getAmazonAfiliateLinkByUrl(productUrl, developMode);
}

function getAmazonTargetUrl(url) {
  const regex = RegExp("(.*)((&ref(_)?=(.*))|(/ref(_)?=(.*\\?)))");
  const match = url.match(regex);

  console.log("getAmazonTargetUrl -----------------");
  console.log("url", url);
  console.log("match", match);

  const split = url.split(match[2]);

  console.log("split", split);

  const start = split[0];
  const end = !!split[1] && split[1].length > 0 ? `?${split[1]}` : "";

  console.log("start", start);
  console.log("end", end);

  if (match) {
    return `${start}${end}`;
  }
  return;
}

async function getAmazonAfiliateLinkByUrl(productUrl, developMode) {
  const target = getAmazonTargetUrl(productUrl);
  const { domain } = getStoreAndDomain(productUrl);

  console.log("productUrl", productUrl);
  console.log("target", target);
  console.log("domain", domain);

  const linkCode = "ll1";
  const amazonAfiliateId = amazonAfiliateIdMapper[domain];
  console.log("amazonAfiliateId", amazonAfiliateId);
  const language = languageCodeMapper[domain];
  console.log("language", language);
  const ref = "as_li_ss_tl";

  return `${target}&linkCode=${linkCode}&tag=${amazonAfiliateId}&language=${language}&ref_=${ref}`;
}

async function getAmazonAfiliateLinkByScrapping(productUrl, developMode) {
  console.log("running getAmazonAfiliateLink ....");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // GET LOGGIN URL
  const html = await getHtml(productUrl);
  const $ = cheerio.load(html);

  const logginUrl = $("#nav-tools > a#nav-link-accountList").attr("href");
  console.log("Log in ...");
  console.log("logginUrl", logginUrl);

  try {
    const { page, browser } = await configureBrowser(logginUrl, developMode);

    // LOGIN
    await byPassLoguin(page);

    console.log("Logged successfully ...");

    // wait for laod the page
    await page.waitForTimeout(2000);

    console.log("clicking Text <a> ...");

    const selector = "span[data-action='amzn-ss-show-text-popover']";
    await page.waitForSelector(selector);

    // wait for text link popup is able
    await page.waitForTimeout(2000);
    await page.click(selector);

    // LOAD POPUP
    await page.waitForSelector(
      ".a-popover.a-popover-has-header.a-declarative.a-arrow-bottom"
    );

    console.log("waiting for the popup to finish load");

    await page.waitForSelector("#amzn-ss-text-shortlink-textarea");

    // wait for popup content load
    // await page.waitForTimeout(3000);

    const shortlinkTextarea = await page.$("#amzn-ss-text-shortlink-textarea");
    const link = await page.evaluate((el) => el.value, shortlinkTextarea);

    console.log("generated link:", link);

    if (developMode) {
      await page.screenshot({ path: `${dir}/last-state.png` });
    }

    await browser.close();
    console.log("SUCCESSFUL !!!");

    return link;
  } catch (error) {
    console.error(error);
  }
}

async function testScraper(developMode) {
  console.log("testScraper ....");
  const url = "https://www.npmjs.com/package/puppeteer";
  const dir = "./files/screenshots";

  try {
    const page = await configureBrowser(url);

    // TO TEST
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    await page.screenshot({ path: `${dir}/1.png` });
    await page.click("#package-tab-dependencies");
    await page.waitFor(1000);
    await page.screenshot({ path: `${dir}/2.png` });

    await browser.close();
  } catch (error) {
    console.error(error);
  }
}

async function testScraper2(developMode) {
  console.log("testScraper2 ....");
  const url = "https://mdbootstrap.com/docs/standard/extended/textarea/";
  const dir = "./files/screenshots";

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
    });

    await page.goto(url);

    // TO TEST
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    await page.screenshot({ path: `${dir}/1.png` });

    await page.waitForSelector("#textAreaExample1");
    let element = await page.$("#textAreaExample1");
    await page.$eval(
      "#textAreaExample1",
      (el) => (el.value = "test@example.com")
    );
    element.focus();
    await page.screenshot({ path: `${dir}/2.png` });
    let value = await page.evaluate((el) => el.value, element);

    console.log("textarea:", value);

    await browser.close();
    console.log("end ...");
  } catch (error) {
    console.error(error);
  }
}
