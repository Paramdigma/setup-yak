const core = require("@actions/core")
const tc = require("@actions/tool-cache")
const path = require("path")

async function setup() {
  // Get version of tool to be installed
  const version = core.getInput("version")
  core.startGroup("YAK Setup")
  console.log("Starting Yak setup with version:", version)

  const url = `https://files.mcneel.com/yak/tools/${version}/yak.exe`
  const pathToExe = await tc.downloadTool(url)

  console.log("Downloaded yak into:", pathToExe)

  //const cached = await tc.cacheFile(pathToExe, "yak.exe", "yak")
  //console.log("Cached yak as:", cached)
  console.log("windows path to exe", core.toWin32Path(pathToExe))
  // Expose the tool by adding it to the PATH
  core.addPath(path.dirname(pathToExe))

  console.log("Added yak dir to path", path.dirname(pathToExe))
  core.endGroup()
}

setup()
