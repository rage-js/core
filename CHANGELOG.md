# @rage-js/core

## 2.0.2

### Patch Changes

- b7a0082: ## Bug Fix:

  - Removed `process.cwd()` from `core` module, as per [Issue #44](https://github.com/rage-js/core/issues/44).

## 2.0.1

### Patch Changes

- bcd7606: - Bug fix: Removed unused `console.log` inside `PushAfterInterval` method class.
  - Bug fix: Removed unwanted push on the first iteration of the `NoInterval` method instance loop

## 2.0.0

### Major Changes

- 11d5bdf: - Feature: New method **`NoInterval`** is created. This method can be used by changing your `rage.config.json`'s `"method": "PAI"` to `"method": "NI"` _(NI stands for NoInterval)_ and remove `"interval"` from `"methodSpecificSettings"`.
  - Documentation: Added JSDoc comments to every configuration attributes on `main.d.ts` file _(excluding sub-attributes)_.
  - Feature: Added new configuration attribute `loopStartDelay` for `rage.config.json` files and updated every methods to adopt the new attribute.
  - Documentation: Updated few lines in `README.md`

## 1.2.4

### Patch Changes

- 4173028: - Bug fix: Whenever you try to run the application while being offline, it will now detect if there is any problem with connecting MongoDB _(Error on connecting to MongoDB means that there could be a network issue from the client side)_ the application will throw an error saying that it's unable to connect to MongoDB server and display a warning that the method instance will be terminated, but the application instance will still be running, meaning that people can still use the RAGE Tool Kit.
  - Feature: As mentioned above, you can use the RAGE Tool Kit and work with the local database to push it back to cloud when the internet is back, but the application had a permanent step to fetch the database right after connecting to MongoDB. Meaning all the changes you made to the local database will be reverted back to the state before the internet disconnect. Hence, a new optimal field is added to the `rage.config.json` called `fetchOnFirst` to toggle whether should the fetching database step be skipped, or not. This will be `true` by default, but for situations like mentioned in the example above, the user can use this feature to disable fetching step temporarily.

## 1.2.3

### Patch Changes

- 59bc0e5: - Bug fix: `formatLog` function's warning flag is replaced from **(CONFIG)** to **(WARNING)**.
  - Feature: While fetching the cloud database, now the application shall also create a schemas folder inside every database folder. A schemas folder will have the collection of schema files for each collection, if the application detects that any collection doesn't have a schema folder, then it will automatically throw a warning.
  - Feature: Whenever the application is trying to push local data to cloud database, it shall now detect if there is any other collection files _(json files)_ that doesn't exist on the MongoDB cloud database, then it will create one and insert all the documents inside the collection automatically.
  - Feature: Now loggers will display how much pushes _(turns)_ have been executed since the application started.

## 1.2.2

### Patch Changes

- Added new logo for this package, the image is shown on README

## 1.2.1

### Patch Changes

- Edited logger, from turning emojis into flags (e.g. (CONFIG), (FETCH), etc).

## 1.2.0

### Minor Changes

- Multi Threaded

## 1.1.2

### Patch Changes

- Type rewrite for few functions and classes

## 1.1.1

### Patch Changes

- Updated module description

## 1.1.0

### Minor Changes

- Push on exit is now functional

## 1.0.2

### Patch Changes

- Fixed method loop to skip the first iteration

## 1.0.1

### Patch Changes

- Build complete

## 1.0.0

### Major Changes

- - Push After Interval method created
  - Logger toggle is available
