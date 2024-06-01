<br>

<div align='center'>
  <img src="img_for_docs/Background.png" alt="logo" style="width:400px;"/>
</div>

<br>

<div align='center'>

![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/Maghish/RAGE?style=for-the-badge)
![GitHub number of milestones](https://img.shields.io/github/milestones/open/Maghish/RAGE?style=for-the-badge)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/Maghish/RAGE/total?style=for-the-badge)

</div>

RAGE is a data management approach that prioritizes a smooth and responsive user experience. It leverages local data storage to deliver information quickly, even in offline scenarios. This reduces reliance on network requests, resulting in faster loading times and lower data usage.

<!-- 1. How it works?
2. Tech stack
3. More about the RAGE approach and the 3 methods (PAI, POU, NI)
4. Mention the user to read contributing.md and code_of_conduct.md -->

# Table of Contents 📃

- [Table of Contents](#table-of-contents-)
- [What is the RAGE approach](#what-is-the-rage-approach-)
  - [Methods](#methods-)
    - [Push After Interval](#push-after-interval-️)
    - [Push On Update](#push-on-update-️)
    - [No Interval](#no-interval-️)
- [How the RAGE module codebase works](#how-the-rage-module-codebase-works-)
- [How to use this module](#how-to-use-this-module-)
- [Tech Stack](#tech-stack-)

# What is the "RAGE approach"? 🤔

RAGE is a simple yet powerful database approach which solves many of the cloud database issues like:

- Offline availability
- Faster performance
- Reduces requests made to the cloud databases which might limit the user to send only a certain amount of requests per day`/`month`/`year
- Database locally accessible

In this approach, you shall clone the cloud database to local files on the application start and once the application is about end, the local files will be pushed back to the cloud database and deleted. Well the local files will be deleted after the final push making it more secure. But if there is any error during the final push process, the local files will not be deleted and awaits to push once the cloud database is back online.

## Methods ⚡

Even if the approach works, you can still customize the behavior of what to do in the middle of the instance, etc with these three primary methods:

1. [Push After Interval (PAI)](#push-after-interval)
2. [Push On Update (POU)](#push-on-update)
3. [No Interval (NI)](#no-interval)

### Push After Interval ⏱️

In the middle of the instance, it will push the local data to the cloud after every certain interval given by the user. This is the most efficient way compared to the other methods.

### Push On Update ⤴️

This method will make the application push on every update that occurs on the local files. This is the most less efficient way compared to the other methods but it still can be used in certain cases.

### No Interval 🔄️

You can use this method if you don't want to do anything in the middle of the instance.

# How the RAGE module codebase works? 👀

We write the module code initally in Typescript and later on production, you can compile it to CJS and ESM simultaneously using [`tsup`](https://www.npmjs.com/package/tsup) module. The module code greatly adopts the OOP _(Object Oriented Programming)_ methods, that's why you may witness the majority of the functions are inside a class.

# How to use this module? 🤔

> [!WARNING]
> Sorry! This section is under very very heavy development!

# Tech Stack 🪛

- Javascript
- Typescript
- Node.js
- JSDoc _(Documentation only)_
- MongoDB
- Packages/Modules:
  - [`@types/node@20.12.12`](https://www.npmjs.com/package/@types/node) - `devDep`
  - [`mongodb@6.6.1`](https://www.npmjs.com/package/mongodb) - `dep`
  - [`fs@10.5.0`](https://nodejs.org/api/fs.html) - `builtIn`
  - [`tsup@8.0.2`](https://www.npmjs.com/package/tsup) - `devDep`
  - [`ts-node@10.9.2`](https://www.npmjs.com/package/ts-node) - `devDep`
  - [`typescript@5.4.5`](https://www.npmjs.com/package/typescript) - `devDep`
  - [`chalk@5.3.0`](https://www.npmjs.com/package/chalk) - `dep`
  - [`@inquirer/prompts@5.0.4`](https://www.npmjs.com/package/inquirer) - `dep`

<br>
<br>

<div align="center">

_Thank you all for the love and support_

_Made with 💢 and Node.js_

</div>
