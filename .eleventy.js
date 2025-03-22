// .eleventy.js

const Image = require("@11ty/eleventy-img");
const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  // Copy directories to the output folder
  eleventyConfig.addPassthroughCopy("photos");
  eleventyConfig.addPassthroughCopy("images");
  // Ensure Liquid is set as a template engine
  eleventyConfig.setTemplateFormats("liquid,njk,html");

  // Add image shortcode
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

      // Ensure alt text is provided
      if (!alt && alt !== "") {
        throw new Error(
          "The 'alt' attribute is required for the image shortcode.",
        );
      }

      return Image.generateHTML(metadata, imageAttributes);
    },
  );

  // Configure a collection to read images from the photos directory
  eleventyConfig.addCollection("imageList", function (collectionApi) {
    const imageDir = "photos";
    const imageExtensions = [".jpg", ".jpeg", ".png", ".avif"];

    // Read all files in the photos directory
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
