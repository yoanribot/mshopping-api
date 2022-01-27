import DBController from "../db/controller";
import User from "../models/user";
import Wish from "../models/wish";
import UserWish from "../models/user-wish";
import getUserDto from "./dto/user";
import { getProductId } from "../services/scrapping/scrapping-store";

const collectionName = "users";
const { findByAuthId, getAll, get, insert, update, remove } = DBController;

const getUsers = async (req, res) => {
  res.send(await getAll(collectionName));
};

const getUserByAuth0 = async (req, res) => {
  try {
    const data = await User.findOne({ auth0_user_id: req.params.id })
      .populate({
        path: "posts",
        select: "title content date",
      })
      .populate({
        path: "reviews",
        select: "text date",
      })
      .populate({
        path: "wishes",
        populate: {
          path: "wishId",
          select:
            "name url productId notification hasProblem outOfStock currentPrice currency lastPrices date",
        },
      });

    const userDto = getUserDto(data);
    res.status(200).json(userDto);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params.id })
      .populate({
        path: "posts",
        select: "title content date",
      })
      .populate({
        path: "reviews",
        select: "text date",
      })
      .populate({
        path: "wishes",
        populate: {
          path: "wishId",
          select:
            "name url productId notification hasProblem outOfStock currentPrice currency lastPrices date",
        },
      });
    const userDto = getUserDto(data);

    res.status(200).json(userDto);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const insertUser = async (req, res) => {
  try {
    const { auth0_user_id, name, lastname, description, age } = req.body.user;

    if (!!auth0_user_id && !!name && !!lastname && !!description && !!age) {
      const _users = await User.findOne({ auth0_user_id });
      let userData = {
        auth0_user_id,
        name,
        lastname,
        description,
        age,
      };

      if (!!_users) {
        User.findOneAndUpdate(
          { auth0_user_id },
          userData,
          { upsert: true },
          function (err, newUser) {
            res.status(200).json(userData);
          }
        );
      } else {
        const newUser = new User(userData);

        await newUser.save();
        res.status(201).json(newUser);
      }
    } else {
      res.status(422).send({ message: "Invalid params" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const removeUser = async (req, res) => {
  const userId = req.params.id;

  const userWishes = await UserWish.find({ userId });

  console.log("userWishes", userWishes);

  userWishes.forEach(async (userWish) => {
    const otherWishUsers = await UserWish.find({
      wishId: userWish.wishId,
      userId: { $ne: userId },
    });

    console.log("otherWishUsers", otherWishUsers);

    if (otherWishUsers.length === 0) {
      const wish = await Wish.findById({ _id: userWish.wishId });
      console.log("wish to remove too", wish);
      await wish.remove();
    }
    await userWish.remove();
  });

  await remove(collectionName, userId);

  res.send({ message: `user and wishes removed` });
};

const updateUser = async (req, res) => {
  await update(collectionName, req.params.id, req.body);
  res.send({ message: `${collectionName} updated` });
};

const addWish = async (req, res) => {
  try {
    const { userId } = req.params;
    const { url } = req.body;
    const productId = getProductId(url);
    console.log("addWish ................");
    console.log("productId", productId);

    if (!!userId && !!url) {
      const user = await User.findById({ _id: userId });

      // Wish
      let wish = await Wish.findOne({ productId });

      if (!wish) {
        wish = new Wish({ url, productId, users: [user] });
        await wish.save();
      }

      await UserWish.update(
        { userId: user._id, wishId: wish._id },
        {},
        { upsert: true }
      );

      res.status(201).send({ message: "Wish added to the list", wish });
    } else {
      res.status(422).send({ message: "Invalid params" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateWish = async (req, res) => {
  try {
    const { userId, wishId } = req.params;
    const { notification, maxPrice } = req.body;

    const userWish = await UserWish.findOne({ wishId, userId });

    userWish.notificationEnable = notification;
    userWish.maxPrice = maxPrice;
    userWish.save();

    res.status(201).send({ message: "Wish updated successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const removeWish = async (req, res) => {
  try {
    const { userId, wishId } = req.params;

    // Post
    const userWish = await UserWish.findOne({ wishId, userId });

    if (!!userWish) {
      userWish.remove();
    }

    const wishUsers = await UserWish.find({ wishId });
    if (wishUsers.length === 0) {
      const wish = await Wish.findById({ _id: wishId });
      await wish.remove();
    }

    res.status(201).send({ message: "Wish removed from the list" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export default {
  getUsers,
  getUser,
  getUserByAuth0,
  insertUser,
  updateUser,
  removeUser,
  addWish,
  updateWish,
  removeWish,
};
