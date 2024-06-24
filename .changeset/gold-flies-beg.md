---
"@rage-js/core": patch
---

- Bug fix: `formatLog` function's warning flag is replaced from **(CONFIG)** to **(WARNING)**.
- Feature: While fetching the cloud database, now the application shall also create a schemas folder inside every database folder. A schemas folder will have the collection of schema files for each collection, if the application detects that any collection doesn't have a schema folder, then it will automatically throw a warning.
