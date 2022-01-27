export default function getUserDto(userData) {
  const userDto = {
    _id: userData._id,
    name: userData.name,
    lastname: userData.lastname,
    auth0_user_id: userData.auth0_user_id,
    posts: userData.posts,
    reviews: userData.reviews,
    wishes: [],
  };

  userData.wishes.forEach((wish) => {
    userDto.wishes.push({
      notification: wish.notificationEnable,
      maxPrice: wish.maxPrice,
      hasProblem: wish.wishId.hasProblem,
      isOutOfStock: wish.wishId.outOfStock,
      currency: wish.wishId.currency,
      currentPrice: wish.wishId.currentPrice,
      date: wish.wishId.date,
      lastPrices: wish.wishId.lastPrices,
      name: wish.wishId.name,
      productId: wish.wishId.productId,
      url: wish.wishId.url,
      _id: wish.wishId._id,
    });
  });

  return userDto;
}
