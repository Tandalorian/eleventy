// .eleventy.js
//
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  // Copy directory to the output folder
  eleventyConfig.addPassthroughCopy("photos");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("robtos.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPlugin(pluginWebc);

  eleventyConfig.addShortcode(
    "image",
    async function (src, alt, widths = [300, 600], sizes = "100vh") {
      let metadata = await Image(src, {
        widths,
        formats: ["avif", "jpeg"],
      });

      let imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
      };

      // You bet we throw an error on a missing alt (alt="" works okay)
      return Image.generateHTML(metadata, imageAttributes);
    },
  );

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
