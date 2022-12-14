# Setup McNeel YAK Github Action

This action download the `latest` version of McNeel's standalone YAK tool, also known as the **Rhino Package Manager**.

This tool is intended to help package and publish Rhino and Grasshopper.

The McNeel team can (and does) explain this better than I ever could [here](https://developer.rhino3d.com/guides/yak/what-is-yak/)

## Inputs

This action has no inputs.

Ability to control the version that get's installed may come in future updates.

## Outputs

This action has no outputs.

Running this action will add `yak` to the `$PATH` of your CI machine so that it can be used in subsequent jobs

## Example usage

```yaml
uses: paramdigma/setup-yak@0.1.0
```

# Real-life working example

Our own [GH_SizeAnalyzer](https://github.com/Paramdigma/GH_SizeAnalyzer) uses this action to build and deploy to the marketplace on every pushed tag.

[GH_SizeAnalyzer Deploy Action](https://github.com/Paramdigma/GH_SizeAnalyzer/blob/main/.github/workflows/deploy-gh.yml)

It also takes care of setting the icon in the manifest in an admittedly hacky way.
