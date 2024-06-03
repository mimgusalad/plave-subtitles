import { images } from "../locale";
const preloadImages = () => {
  const cache = {};
  images.forEach((image) => {
    const img = new Image();
    img.src = process.env.PUBLIC_URL + "/img/profile/" + image;
    cache[image] = img;
  });
  images.forEach((image) => {
    const img = new Image();
    img.src = process.env.PUBLIC_URL + "/img/symbol/" + image;
    cache[image] = img;
  });

  images.forEach((image) => {
    const img = new Image();
    img.src =
      process.env.PUBLIC_URL + "/img/tail/" + image.split(".")[0] + "_tail.png";
    cache[image] = img;
  });
};

export default preloadImages;
