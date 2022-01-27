import { getStoreAndDomain } from "../helper";
import {
  getAmazonProductId,
  getAmazonProductInfo,
  getAmazonAfiliateLink,
} from "./amazon/amazon-scraper";

import {
  getEbayProductId,
  getEbayProductInfo,
  getEbayAfiliateLink,
} from "./ebay/ebay-scrapper";

export function getProductId(url) {
  const { store } = getStoreAndDomain(url);

  console.log("getProductId ....");
  console.log("store", store);

  switch (store) {
    case "amazon": {
      return getAmazonProductId(url);
    }
    case "ebay": {
      return getEbayProductId(url);
    }
    default: {
      throw Error("Store/getProductId handler not define");
      break;
    }
  }
}

export function getProductInfo(url) {
  const { store } = getStoreAndDomain(url);

  switch (store) {
    case "amazon": {
      return getAmazonProductInfo(url);
    }
    case "ebay": {
      return getEbayProductInfo(url);
    }
    default: {
      throw Error("Store/getProductInfo handler not define");
      break;
    }
  }
}

export function getAfiliateLink(url) {
  const { store } = getStoreAndDomain(url);
  const developMode = false;

  switch (store) {
    case "amazon": {
      return getAmazonAfiliateLink(url, developMode);
    }
    case "ebay": {
      return getEbayAfiliateLink(url);
    }
    default: {
      throw Error("Store/getAfiliateLink handler not define");
    }
  }
}
