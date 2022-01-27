import schedule from "node-schedule";
import { getProductInfo } from "./scrapping-store";
import Wish from "models/wish";

export async function checkWishesManual() {
  const wishes = await Wish.find({});

  checkWishes(wishes);
}

async function checkWishes(wishes) {
  const promises = [];

  wishes.forEach((wish) => {
    promises.push(getProductInfo(wish.url));
  });

  Promise.all(promises).then((products) => {
    products.forEach(async (product, index) => {
      const wish = wishes[index];
      console.log("------------------ PROCESSING ------");
      console.log("Wish", wish);
      console.log("product", product);
      if (!!product) {
        wish.name = product.name;
        wish.outOfStock = product.outOfStock;
        if (!product.outOfStock) {
          wish.currentPrice = product.price;
          wish.lastPrices.push(product.price);
          wish.currency = product.currency;
        }
        wish.hasProblem = false;

        await wish.save();
      } else {
        wish.hasProblem = true;
        await wish.save();
      }
    });
  });
}

export async function initScraperJob() {
  const rule = new schedule.RecurrenceRule();
  const wishes = await Wish.find({});

  // rule.tz = "Etc/UTC";
  rule.hour = 22;
  rule.minute = 7;

  console.log(
    `>>>>>> Initialize to run at: ${rule.hour}:${rule.minute} - Schedule Scraper Job running [ ${wishes.length} ] wishes ...`
  );

  const job = await schedule.scheduleJob(rule, async function (fireDate) {
    console.log("initScraperJob just ran ...");
    console.log(
      `This job was supposed to run at ${fireDate}, but actually ran at ${new Date()}`
    );

    await checkWishes(wishes);
  });
}
