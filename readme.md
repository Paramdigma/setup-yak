# Setup McNeel YAK Github Action

This action download the `latest` version of McNeel's standalone YAK tool, also known as the **Rhino Package Manager**.

This tool is intended to help package and publish Rhino and Grasshopper.

The McNeel team can (and does) explain it's purpose better than we ever could [here](https://developer.rhino3d.com/guides/yak/what-is-yak/)

## Inputs

### Token

You can provide an auth token to allow YAK to push packages to a specific account. YAK will search for this token on a `YAK_TOKEN` environment variable. Since the naming of the variable in your context may vary, passing a value here will effectively set the `YAK_TOKEN` env var from that point onward.

This token is obtained by running `yak.exe --ci` on your **local machine**.

This is an optional input, as it is only required if you are pushing

## Outputs

### Version

The version of YAK that was installed. This is for reference only.

An example of this can be found in [the test action](.github/workflows/test-action.yml)

## Example usage

### Basic usage

```yaml
uses: paramdigma/setup-yak@1.0.0
```

### With a token

```yaml
uses: paramdigma/setup-yak@1.0.0
with:
  token: YOUR_TOKEN_HERE
```

## Real-life working example

Our own [GH_SizeAnalyzer](https://github.com/Paramdigma/GH_SizeAnalyzer) uses this action to build and deploy to the marketplace on every pushed tag.

[GH_SizeAnalyzer Deploy Action](https://github.com/Paramdigma/GH_SizeAnalyzer/blob/main/.github/workflows/deploy-gh.yml)

It also takes care of setting the icon in the manifest in an admittedly hacky way.
