const { RunTarget, RunOptions } = require("github-action-ts-run-api")
const setup = require("./index")

test("Yak path is set by action", async () => {
  // Read action config from action.yml file.
  const target = RunTarget.asyncFn(setup, "action.yml")
  const opts = RunOptions.create()
  // Run it with default options
  var result = await target.run(opts)

  expect(result.error).toBeUndefined()
  expect(result.commands.addedPaths).toHaveLength(1)
})

test("Invalid version returns error", async () => {
  // Read action config from action.yml file.
  const target = RunTarget.asyncFn(setup, "action.yml")
  // Run it with default options
  var result = await target.run(RunOptions.create())

  expect(result.error).not.toBeNull()
  expect(result.commands.addedPaths).toHaveLength(0)
})
