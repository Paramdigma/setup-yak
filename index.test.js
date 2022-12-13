const { RunTarget, RunOptions } = require("github-action-ts-run-api")
const setup = require("./index")
const { deleteAllFakedDirs } = require("github-action-ts-run-api")

test("Yak path is set by action", async () => {
  // Read action config from action.yml file.
  const target = RunTarget.asyncFn(setup, "action.yml")
  const opts = RunOptions.create({ inputs: { version: "latest" } })
  // Run it with default options
  var result = await target.run(opts)

  expect(result.error).toBeUndefined()
  expect(result.commands.addedPaths).toHaveLength(1)
})

test("Invalid version returns error", async () => {
  // Read action config from action.yml file.
  const target = RunTarget.asyncFn(setup, "action.yml")
  // Run it with default options
  var result = await target.run(
    RunOptions.create({ inputs: { version: "x.y" } })
  )

  expect(result.error).not.toBeNull()
  expect(result.commands.addedPaths).toHaveLength(0)
})
