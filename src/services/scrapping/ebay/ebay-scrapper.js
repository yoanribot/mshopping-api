import {
  siteIdMapper,
  rotationIdMapper,
  campaignId,
  customId,
  toolId,
  mkevt,
} from "./ebay-constants";

import {
  getHtml,
  saveFile,
  getFile,
  extractMoney,
  configureBrowser,
} from "../utils";
import cheerio from "cheerio";
import { getStoreAndDomain } from "../../helper";

export function getEbayProductId(url) {
  const regex = RegExp(
    // (http[s]?://)?([\\w.-]+)(:[0-9]+)?/([\\w-%]+/)?(dp|gp/product|exec/obidos/asin)/(\\w+/)?(\\w{10})(.*)?
    "(http[s]?://)?(.*?)(/itm/)(.*?)(\\?)(.*)"
  );
  const match = url.match(regex);

  console.log("match", match);

  if (match) {
    return match[4];
  }
  return;
}

export async function getEbayProductInfo(url) {
  console.log("running Ebay Product Scraper ....");
  console.log("url --- ", url);

  try {
    const html = await getHtml(url);
    const $ = cheerio.load(html);

    const name = $("#itemTitle").text().split("Détails sur  ")[1];
    console.log("name", name);

    const outOfStock = false;

    let amount = 0;
    let currency = "";
    if (!outOfStock) {
      const ourPrice = $("#prcIsum").text();
      const _priceText = ourPrice;

      const { amount: _amount, currency: _currency } = extractMoney(_priceText);
      amount = _amount;
      currency = _currency;

      console.log("amount", amount);
      console.log("currency", currency);
    }

    return {
      name,
      outOfStock,
      price: !outOfStock ? parseFloat(amount).toFixed(2) : null,
      currency,
    };
  } catch (error) {
    console.log("Error", error);
  }
}
//FROM: https://developer.ebay.com/api-docs/buy/static/ref-epn-link.html
export function getEbayAfiliateLink(url) {
  const target = url;
  const { domain } = getStoreAndDomain(url);

  const mkcid = 1;
  const mkrid = rotationIdMapper[domain];
  const siteid = siteIdMapper[domain];
  const campid = campaignId;
  const customid = customId;
  const toolid = toolId;

  return `${target}&mkcid=${mkcid}&mkrid=${mkrid}&siteid=${siteid}&campid=${campid}&customid=${customid}&toolid=${toolid}&mkevt=${mkevt}`;
}
