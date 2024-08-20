import { exec } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";

const execPromise = promisify(exec);

function generateBanner(commitHash, pkg) {
  const date = new Date(Date.now()).toUTCString();
  return `/*
  @license
	${pkg.name} v${pkg.version}

	${date} - commit ${commitHash}

	${pkg.repository.url}
    
	Released under the License.
*/`;
}

let getBannerPromise = null;

export default function getBanner() {
  return (getBannerPromise ||= Promise.all([
    execPromise("git rev-parse HEAD")
      .then(({ stdout }) => stdout.trim())
      .catch((error) => {
        console.error("Could not determine commit hash:", error);
        return "unknown";
      }),
    readFile(new URL("./package.json", import.meta.url), "utf8"),
  ]).then(([commit, package_]) =>
    generateBanner(commit, JSON.parse(package_))
  ));
}
