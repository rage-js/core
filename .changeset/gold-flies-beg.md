---
"@rage-js/core": patch
---

- Bug fix: `formatLog` function's warning flag is replaced from **(CONFIG)** to **(WARNING)**.
- Feature: While fetching the cloud database, now the application shall also create a schemas folder inside every database folder. A schemas folder will have the collection of schema files for each collection, if the application detects that any collection doesn't have a schema folder, then it will automatically throw a warning.
- Feature: Whenever the application is trying to push local data to cloud database, it shall now detect if there is any other collection files _(json files)_ that doesn't exist on the MongoDB cloud database, then it will create one and insert all the documents inside the collection automatically.
- Feature: Now loggers will display how much pushes _(turns)_ have been executed since the application started.
