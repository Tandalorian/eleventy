// .eleventy.js
module.exports = function (eleventyConfig) {
  // Copy photos directory to the output folder
  eleventyConfig.addPassthroughCopy("photos");
  // Copy images directory to the output folder
  eleventyConfig.addPassthroughCopy("images");

  // Configure a collection to read images from the images directory
  eleventyConfig.addCollection("imageList", function (collectionApi) {
    const fs = require("fs");
    const path = require("path");

    const imageDir = "photos";
    const imageExtensions = [".jpg", ".jpeg", ".png"];

    // Read all files in the images directory
    let images = fs.readdirSync(imageDir).filter((file) => {
      return imageExtensions.includes(path.extname(file).toLowerCase());
    });

    // Return an array of image file names
    return images.map((image) => {
      return {
        name: image,
        url: "/" + imageDir + "/" + image,
      };
    });
  });
};
