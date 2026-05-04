module.exports = function(eleventyConfig) {
  // Static asset passthrough — files copied into _site as-is.
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("cop-photos");
  eleventyConfig.addPassthroughCopy("colors_and_type.css");
  // The constellation is a self-contained interactive — exclude it from
  // template processing in .eleventyignore and pass it through verbatim.
  eleventyConfig.addPassthroughCopy("constellation.html");

  // Watch CSS + search assets so dev server reloads on change.
  eleventyConfig.addWatchTarget("assets/site.css");
  eleventyConfig.addWatchTarget("assets/search.js");

  // Strip HTML for the build-time search index. Removes script/style blocks,
  // tags, comments, and decodes a few common entities. Good enough for a
  // small site; no need for a real HTML parser.
  eleventyConfig.addFilter("striphtml", function(content) {
    if (!content) return "";
    return String(content)
      .replace(/<(script|style)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&[a-z]+;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  });


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
