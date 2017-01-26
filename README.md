Magix CMS - Theme Manager
===================================================

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
![GitHub release](https://img.shields.io/github/release/magix-cms/theme-manager.svg)

Requirements
------------

[![Node version][node-image]][node-url]
[![NPM version][npm-image]][npm-url]
[![Bower version][bower-image]][bower-url]
[![Gulp version][gulp-image]][gulp-url]

Presentation
------------

This is a theme manager for Magix CMS made with gulp.

It will help you to create themes for Magix CMS and managing them (e.g: you'll be able to use versioning).

It also will help you keeping dependencies up to date (Bootstrap, jQuery, etc).

There is actually no official release by now, but we hope to publish one as soon as possible.

### Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [**Tasks**](#tasks)
- [Theme tasks](#theme-tasks)
    - [Create a theme](#create-a-theme)
    - [Copy a theme](#copy-a-theme)
    - [Work on a theme (file watchers)](#work-on-a-theme)
- [Magix tasks](#magix-tasks)
    - [Install Magix Plugins](#install-magix-plugins)
- [Maintenance tasks](#maintenance-tasks)
    - [Check for packages updates](#check-for-packages-updates)

### Note
    Do not use the repo version for anything else than your own test.
    If you want a production version, please use the latest release.
    
Installation
------------

Create a new folder (e.g: theme_manager) under the magix root directory and paste all the files of the theme manager in it.

Usage
-----

Open the console and go to your theme manager directory.

```
$ cd theme_manager
```

```
Do not forget to install all the dependencies

$ npm install --save-dev
```

You can start by simply launching gulp

```
$ gulp
```

The default task will propose to you several predefined task
- Working on an existing theme
- Create a new theme
- Copy a theme
- Install a Magix Plugin
- Check for packages updates

Tasks
=====

Theme tasks
-----------

### Create a theme

Explanations are coming soon

### Copy a theme

Coming soon

### Work on a theme

Explanations are coming soon

Magix tasks
-----------

### Install Magix Plugins

Explanations are coming soon

Maintenance tasks
-----------------

### Check for packages updates

Explanations are coming soon

Authors
-------

Salvatore (http://www.disalvo-infographiste.be)

Licence
------------

```
This file is part of Magix CMS.
MAGIX CMS, The content management system optimized for users

Copyright (C) 2008 - 2017 magix-cms.com support[at]magix-cms[point]com

OFFICIAL TEAM :

- Gerits Aurelien (Author - Developer) contact[at]aurelien-gerits[point]be - aurelien[at]magix-cms[point]com

Redistributions of files must retain the above copyright notice.
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

####DISCLAIMER

Do not edit or add to this file if you wish to upgrade magixcms to newer
versions in the future. If you wish to customize magixcms for your
needs please refer to magix-cms.com for more information.
```

[node-image]: https://img.shields.io/badge/node-v6.9.4-blue.svg
[node-url]: https://nodejs.org/en/
[npm-image]: https://img.shields.io/npm/v/npm.svg
[npm-url]: https://www.npmjs.com/
[bower-image]: https://img.shields.io/badge/bower-v1.8.0-blue.svg
[bower-url]: https://www.npmjs.com/package/bower
[gulp-image]: https://img.shields.io/badge/gulp-v3.9.1-blue.svg
[gulp-url]: https://www.npmjs.com/package/gulp