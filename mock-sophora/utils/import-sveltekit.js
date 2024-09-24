// This script takes the output from mock-sveltekit (./mock-svelekit/index.html)
// and copies the contents of the <body> element into mock-sophora/_includes/test
// to mimic our production Sophora component

const fs = require("fs-extra")

const svelteOutputPath = "../mock-sveltekit/build"
const outputPath = "."

console.log("Copying Sveltekit output to mock-sophora...")

// Copy the index.html file...
const inputHTML = fs.readFileSync(`${svelteOutputPath}/index.html`, { encoding: "utf8" })
const inputBody = inputHTML.match(/(?:<body.+>)([\s\S]+)(?:<\/body>)/)
const indexHTML = inputBody[1]
fs.writeFileSync(`${outputPath}/_includes/test/sveltekit-component.html`, indexHTML)

// Copy the _app folder...
fs.emptyDirSync(`${outputPath}/_app`)
fs.copySync(`${svelteOutputPath}/_app/`, `${outputPath}/_app`)

console.log("Done.")
