import DBController from "../db/controller";
import Wish from "../models/wish";
import User from "../models/user";
import {
  getProductInfo,
  getAfiliateLink,
} from "../services/scrapping/scrapping-store";

const collectionName = "wishes";
const { findByAuthId, getAll, get, insert, update, remove } = DBController;

const getWishes = async (req, res) => {
  try {
    const data = await Wish.find({});
    res.send(data);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getWish = async (req, res) => {
  const data = await Wish.findById(req.params.id).populate({
    path: "users",
    populate: {
      path: "userId",
      select: "name lastname",
    },
  });
  res.send(data);
};

const removeWish = async (req, res) => {
  const { id } = req.params;
  const wish = await Wish.findById({ _id: id });

  wish.users.forEach(async (userId) => {
    const user = User.findById({ _id: userId });

    user.wishes.remove(wish);

    await user.save();
  });

  if (wish.users.length === 0) {
    wish.remove();
  }
};

const checkWish = async (req, res) => {
  try {
    const wish = await Wish.findById(req.params.id);

    let product = {};
    try {
      product = await getProductInfo(wish.url);

      wish.name = product.name;
      wish.outOfStock = product.outOfStock;
      if (!product.outOfStock) {
        wish.currentPrice = product.price;
        wish.lastPrices.push(product.price);
        wish.currency = product.currency;
      }
      wish.hasProblem = false;

      wish.save();
    } catch (error) {
      wish.hasProblem = true;
      wish.save();

      console.log("??????ERROR", error);
    }

    res.send(product);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const goToStore = async (req, res) => {
  try {
    const wish = await Wish.findById(req.params.id);

    const storeLink = await getAfiliateLink(wish.url, true);

    res.send(storeLink);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export default {
  getWishes,
  getWish,
  removeWish,
  checkWish,
  goToStore,
};
