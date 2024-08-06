---
"@rage-js/core": major
---

- Feature: New method **`NoInterval`** is created. This method can be used by changing your `rage.config.json`'s `"method": "PAI"` to `"method": "NI"` _(NI stands for NoInterval)_ and remove `"interval"` from `"methodSpecificSettings"`.
- Documentation: Added JSDoc comments to every configuration attributes on `main.d.ts` file _(excluding sub-attributes)_.
- Feature: Added new configuration attribute `loopStartDelay` for `rage.config.json` files and updated every methods to adopt the new attribute.
- Documentation: Updated few lines in `README.md`
