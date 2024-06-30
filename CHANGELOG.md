# @rage-js/core

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
