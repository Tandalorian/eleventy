// .eleventy.js
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
module.exports = function (eleventyConfig) {
  // Copy directory to the output folder
  eleventyConfig.addPassthroughCopy("photos");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("robtos.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  // Configure a collection to read images from the images directory
  eleventyConfig.addCollection("imageList", function (collectionApi) {
    const fs = require("fs");
    const path = require("path");

    const imageDir = "photos";
    const imageExtensions = [".jpg", ".jpeg", ".png", ".avif"];

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
