# Table of Contents

- [How to setup this repository locally?](#how-to-setup-this-repository-locally)
- [How to contribute to this repository?](#how-to-contribute-to-this-repository)
  - [Key tips and warnings](#key-tips-and-warnings)

# How to setup this repository locally?

1. First off, fork this repository.
2. Then clone the forked repository into your local system.
3. Run `npm install` to install the dependencies.
4. Install the RAGE cli using `npm install @rage-js/cli`.
5. Then run `npx rage` to run the cli.
6. Answer the questions provided by the cli, you can give dummy text as answer for questions which ask the MongoDB secret key.
7. Redirect to the directory created by the cli, and you can see the main file with a comment saying it's still on development, You can ignore and remove that comment. That directory is your test directory that you can use to test the rage package.
8. Then redirect to the forked directory and run `npm link`, now redirect back to the test directory and run `npm link @rage-js/core`.

_Now you can work on the package and also test it yourself in the test directory you built using the cli._

# How to contribute to this repository?

1. If you have any suggestions on something, you can just create an issue, or if you find any suitable issue that you feel you can fix and work on it.
2. Just open the issue you are going to work on, and it on the right side bottom, you will find a section named **"Development"** and under that you can see a text saying to create a branch,

   ![CreateBranch](./img_for_docs/CreateBranch.png)

3. Click on the **"Create a branch"** and it will open a pop-up, select the forked repository you created under the "**Repository destination**" and click **"Create branch"** to create the branch inside the repository.

4. Then go to your local system terminal and checkout to the branch

```bash
git checkout <branch-name>
```

5. Now you can work freely on that branch! Once you finished your work, just commit the changes and push it back to your forked repository and make a PR _(Pull Request)_ from there to the [main repository](https://github.com/rage-js/core).

   _Admins will soon review your code and address problems if any and then merge it to the main branch. We request you to be patient, admins may take some more time to reply but they eventually will._

## Key tips and warnings

1. Whenever you create a function or a class, be sure to always document it using JSDoc! and also always wrap the function's code inside a try-catch block to prevent errors from breaking the code.
2. Do not include unnecessary code like `console.log` when committing the changes
3. Please double check if you left any mistaken code you wrote, before creating the Pull Request.

<br>
<br>

<div align="center" >

**Thank you all once again for contributing and supporting our project!**

</div>
