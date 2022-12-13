const core = require("@actions/core")
const tc = require("@actions/tool-cache")
const path = require("path")
const vi = require("win-version-info")

async function setup() {
  // Get version of tool to be installed
  const version = core.getInput("version")

  const url = `https://files.mcneel.com/yak/tools/${version}/yak.exe`

  // Download the specific version of the tool, e.g. as a tarball
  const pathToExe = await tc.downloadTool(url)
  const cached = await tc.cacheFile(pathToExe, "yak.exe", "yak")
  // Expose the tool by adding it to the PATH
  core.addPath(cached)
}

module.exports = setup
