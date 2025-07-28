// This script takes the output from mock-sveltekit (./mock-svelekit/index.html)
// and copies the contents of the <body> element into mock-sophora/_includes/test
// to mimic our production Sophora component

const fs = require('fs-extra');

const svelteOutputPath = process.argv[2] || '../mock-sveltekit/build';
const outputPath = '.';

console.log('Copying Sveltekit output to mock-sophora...');
const routes = ['encapsulation-test', 'hero-scrolly'];

routes.forEach((r) => {
	// Copy the index.html file...
	const inputHTML = fs.readFileSync(`${svelteOutputPath}/${r}/index.html`, { encoding: 'utf8' });
	const inputBody = inputHTML.match(/(?:<body>)([\s\d.\S]+)(?:<\/body>)/);
	const indexHTML = inputBody[1];
	const op = `${outputPath}/_includes/test/${r}.html`;
	fs.writeFileSync(op, indexHTML);
	console.log(`Wrote ${op}`);
});

// Copy the _app folder...
const folders = ['_app'];
folders.forEach((f) => {
	const op = `${outputPath}/${f}`;
	fs.emptyDirSync(op);
	fs.copySync(`${svelteOutputPath}/${f}`, op);
	console.log(`Wrote ${op}`);
});

console.log('Done.');
