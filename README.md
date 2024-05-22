<br>

<div align='center'>
  <img src="img_for_docs/RAGE.png" alt="logo" style="width:400px;"/>
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

# Table of Contents

- [Tech Stack](#tech-stack)
- [What is this RAGE approach](#what-is-this-rage-approach)
  - [Methods](#methods)
    - [Push After Interval](#push-after-interval)
    - [Push On Update](#push-on-update)
    - [No Interval](#no-interval)
- [How it works](#how-it-works)

# What is this RAGE approach?

RAGE is a simple yet powerful database approach which solves many of the cloud database issues like:

- Offline availability
- Faster performance
- Reduces requests made to the database which might limit the user to send only a certain amount of requests per day`/`month`/`year
- Database locally accessible

RAGE approach is basically just cloning the cloud datbases (i.e. MongoDB, Firebase, MySQL, etc) into local files (i.e. JSON, sqlite, csv), then you can use RAGE module itself to manage the data.

## Methods

This approach itself can be implemented in 3 different ways:

1. Push After Interval (PAI)
2. Push On Update (POU)
3. No Interval (NI)

### Push After Interval

This method is relatively simple. Basically on the application start, you will clone the cloud database into local files and then you shall set a certain interval in the application and everytime after that interval, the local files will be pushed back to the cloud database and finally at the application end, the local files will be pushed back to the cloud database again.

### Push On Update

Just as the [first method](#push-after-interval), you will clone the cloud database into local files but instead of pushing the local data after every certain interval, you shall push the local data every time the local files are updated. Well it's less efficient than the previous one, imagine a scenario where you had to handle 100+ updates to the local data at the same time? can you successfully push the local data for every update? No right? Even if this method has one and huge con, this method still exists.

### No Interval

This method only clones the cloud database in the application start and it pushes back on the application end. It does nothing in the middle of the application running.

# How it works?

# Tech Stack

- Javascript
- Typescript
- Node.js
- MongoDB
- Packages/Modules:
  - [`@types/node@20.12.12`](https://www.npmjs.com/package/@types/node) - `devDep`
  - [`mongodb@6.6.1`](https://www.npmjs.com/package/mongodb) - `dep`
  - [`fs@10.5.0`](https://nodejs.org/api/fs.html) - `builtIn`
  - [`tsup@8.0.2`](https://www.npmjs.com/package/tsup) - `devDep`
  - [`typescript@5.4.5`](https://www.npmjs.com/package/typescript) - `devDep`

<br>
<br>

<div align="center">

_Made with 💢 and Node.js_

</div>
