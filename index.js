const core = require("@actions/core")
const tc = require("@actions/tool-cache")
const { getFileProperties } = require("get-file-properties")

async function setup() {
  // Get version of tool to be installed
  const token = core.getInput("token", {
    required: false,
    trimWhitespace: true
  })

  const url = `https://files.mcneel.com/yak/tools/latest/yak.exe`
  console.info("Fetching latest YAK version from", url)

  const pathToExe = await tc.downloadTool(url)
  console.info("Downloaded YAK into:", pathToExe)

  var fileInfo = await getFileProperties(pathToExe.replace("\\", "\\\\"))
  console.info("YAK version:", fileInfo.Version)

  const cached = await tc.cacheFile(
    pathToExe,
    "yak.exe",
    "yak",
    fileInfo.Version
  )
  console.info("Cached yak as:", cached)
  // Expose the tool by adding it to the PATH
  core.addPath(cached)

  console.info("Added yak dir to $PATH, you can now use it by invoking 'yak'")

  core.setOutput("yak-version", fileInfo.Version)

  if (token) core.exportVariable("YAK_TOKEN", token)
}

setup()
