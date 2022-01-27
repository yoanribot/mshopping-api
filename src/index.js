import initServer from "./server-setup";
import dbController from "./db/controller";
import initStoresConnection from "./stores-connection";
// import Seed from "./db/seed";
import {
  runAmazonProductScraper,
  getAmazonAfiliateLink,
  testScraper,
  testScraper2,
} from "./services/scrapping/amazon/amazon-scraper";
import { getEbayProductInfo } from "./services/scrapping/ebay/ebay-scrapper";
import { initScraperJob, checkWishesManual } from "./services/scrapping/job";

const { createDB } = dbController;
// const { seedUser } = Seed;

createDB().then(() => {
  //Seed DB
  // seedUser();
});

initServer();
// initStoresConnection();
// initScraperJob();

// ----- TEST ------
// checkWishesManual();

// const startURL = "https://www.amazon.fr/";
// const startURL =
//   "https://www.ebay.fr/itm/154474779188?_trkparms=ispr%3D1&hash=item23f76a1234:g:ulkAAOSw5vpgrm7N&amdata=enc%3AAQAFAAACcBaobrjLl8XobRIiIML1V4Imu%252Fn%252BzU5L90Z278x5ickkxGz2ccqatkEnoeekHqhLkcPf1oqBLYRZzrJsxRzJa3SYoNt7T4pI0KjqxCvVP6t2WHWE7PhuIxi9Z81Wbnw1Y%252F8ChqnwNGBSQRNKlyvhgBS1UU7f0yuqihuNVd9WPl85fuTea%252FS2x6MK4%252FZGRXwhTewYyQ9OqsvYc2zi41jCG8H4nH2r7rkTiVZLcSEEciSwIOFWhuDKtS23Ww7DH6dOaB%252BWq993Uo08aU1UxdcLrUf6wyCuztycZmqM8ocmll6ACcMKlZeJAIzWa63kaWKvLjn94SIlD5D0uJVUOT5AZYXHrerkpsW6aWq%252Fl2%252BdJgusp99qeyEc50C2D%252B%252FhpNzgw8I0J1n6nC52pNBCjzOtBsVkTywHjfwwz7qqVWTnQChJEaRh0Rl81MFrRAcFgMf0sJgNjCfI2dqpesPqECsulqs9figqvfB3lryyz1anloaJqEM7GJ0M%252FRSpe6IkZtQ%252B%252BHD2VgDK52OK%252BOfnyUPqnMNQttnceJbWTICaldaj6F2NJR7N4psfcCFYaKqiqhLhcqxqtkziQemsJZmA4ocChqttC0ip8ncUpH443T069YQEz0i3mdixo6c6AyLELqxKFz9085dFAmbPQqQt5bmHDx2IISu5slpMxvxnVQrxUgFDdPYSkmbjLvOFKsBwEjIIKdpXxlj7Mu1ZJfW1ou3agBTi%252BZX5L7jxPQqCMrv4Q4VVCUBoPkK%252ByE%252FcpXSMi1Jt0CqIuidrBwq45h74qbsHDZtwTtKsD7Ew2Konhtx4elZUKSnRlagZianIVoqcW9ao0A%253D%253D%7Ccksum%3A154474779188cb8b4aeccc9c4bbf998dd68688cbe4f5%7Campid%3APL_CLK%7Cclp%3A2334524";
// getEbayProductInfo(startURL);
