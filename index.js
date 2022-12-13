const core = require("@actions/core")
const tc = require("@actions/tool-cache")
const { getFileProperties } = require("get-file-properties")

async function setup() {
  // Get version of tool to be installed
  const version = core.getInput("version")
  console.log("Starting Yak setup with version:", version)

  const url = `https://files.mcneel.com/yak/tools/${version}/yak.exe`
  const pathToExe = await tc.downloadTool(url)

  console.log("Downloaded yak into:", pathToExe)

  var realVersion = await getFileProperties(pathToExe.replace("\\", "\\\\"))
  console.log(realVersion)

  const cached = await tc.cacheFile(pathToExe, "yak.exe", "yak", "1.0.0.0")
  console.log("Cached yak as:", cached)
  // Expose the tool by adding it to the PATH
  core.addPath(cached)
  console.log("Added yak dir to path", cached)
}

setup()
