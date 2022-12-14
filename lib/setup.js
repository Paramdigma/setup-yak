const core = require("@actions/core")
const tc = require("@actions/tool-cache")
const { getFileProperties } = require("get-file-properties")

const url = `https://files.mcneel.com/yak/tools/latest/yak.exe`

async function setup() {
  // Get the token input var
  const token = core.getInput("token", {
    required: false,
    trimWhitespace: true
  })

  // Download yak.exe to a temp folder
  core.info("Fetching latest YAK version from", url)
  const pathToExe = await tc.downloadTool(url)
  core.info("Downloaded YAK into:", pathToExe)

  // Get the file version
  var fileVersion = (await getFileProperties(pathToExe.replace("\\", "\\\\")))
    .Version
  core.info("YAK version:", fileVersion)

  // Cache the tool for further use
  const cached = await tc.cacheFile(pathToExe, "yak.exe", "yak", fileVersion)
  core.info("Cached yak as:", cached)

  // Expose the tool by adding it to the PATH
  core.addPath(cached)
  core.info("Added yak dir to $PATH, you can now use it by invoking 'yak'")

  // Set token to env var if it exists
  if (token) core.exportVariable("YAK_TOKEN", token)
  // Set version to output
  core.setOutput("version", fileVersion)
}

module.exports = setup
