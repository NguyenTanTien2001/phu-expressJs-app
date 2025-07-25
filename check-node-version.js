const semver = require('semver');
const pkg = require('./package.json');

const requiredVersion = pkg.engines.node;
if (!semver.satisfies(process.version, requiredVersion)) {
  console.error(`❌ Your Node.js version is ${process.version}. Required: ${requiredVersion}.`);
  process.exit(1);
} else {
  console.log(`Your Node.js version 22.15.1 is correct. ✔️`)
}
