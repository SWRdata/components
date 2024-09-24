module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addPassthroughCopy("main.css")
  eleventyConfig.addPassthroughCopy("index.js")
  eleventyConfig.addPassthroughCopy("_app/")
  eleventyConfig.addPassthroughCopy({ "../node_modules/jquery-pjax": "node_modules/jquery-pjax" })
  eleventyConfig.addPassthroughCopy({ "../node_modules/jquery/dist": "node_modules/jquery/dist" })
  return {}
}
