const core = require("@actions/core")
const tc = require("@actions/tool-cache")
const { getFileProperties } = require("get-file-properties")

async function setup() {
  // Get version of tool to be installed
  const url = `https://files.mcneel.com/yak/tools/latest/yak.exe`
  console.log("Fetching latest YAK version from", url)

  const pathToExe = await tc.downloadTool(url)
  console.log("Downloaded YAK into:", pathToExe)

  var fileInfo = await getFileProperties(pathToExe.replace("\\", "\\\\"))
  console.log("YAK version:", fileInfo.Version)

  const cached = await tc.cacheFile(
    pathToExe,
    "yak.exe",
    "yak",
    fileInfo.Version
  )
  console.log("Cached yak as:", cached)
  // Expose the tool by adding it to the PATH
  core.addPath(cached)
  console.log("Added yak dir to path", cached)
}

setup()
