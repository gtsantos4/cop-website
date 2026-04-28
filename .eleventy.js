module.exports = function(eleventyConfig) {
  // Static asset passthrough — files copied into _site as-is.
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("cop-photos");
  eleventyConfig.addPassthroughCopy("colors_and_type.css");
  // The constellation is a self-contained interactive — exclude it from
  // template processing in .eleventyignore and pass it through verbatim.
  eleventyConfig.addPassthroughCopy("constellation.html");

  // Watch CSS so dev server reloads when shared styles change.
  eleventyConfig.addWatchTarget("assets/site.css");


  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"]
  };
};
