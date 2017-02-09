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

If you're a Windows user you'll need [Git](https://git-scm.com/)

### Note
    Be sure to have the path to the git cmd into your environment variables

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
    - [Work on a theme](#work-on-a-theme)
        - [Start file watchers](#start-file-watchers)
        - [Compile all type files](#compile-all-type-files)
        - [Generate Dist](#generate-dist)
        - [Generate Build](#generate-build)
        - [Update version](#update-version)
    - [Standalone file](#standalone-file)
- [Magix tasks](#magix-tasks)
    - [Install Magix Plugins](#install-magix-plugins)
    - [Check Magix version](#check-magix-version)
- [Maintenance tasks](#maintenance-tasks)
    - [Check for packages updates](#check-for-packages-updates)

### Note
    Do not use the repo version for anything else than your own test.
    If you want a production version, please use the latest release.
    
Installation
------------

Create a new folder (e.g: theme-manager) under the magix root directory and paste all the files of the theme manager in it.

Open the console and go to your theme manager directory.

```
$ cd theme-manager
```

```
Install all the dependencies

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
- Check Magix version
- Check for packages updates

### Note
    More predefined tasks are coming soon:
    - Modify the config file of a theme (description, keywords, authors, etc)
    - Copy theme
    - Install pre-configured theme
    - Install plugins of a pre-configured theme

Tasks
=====

Theme tasks
-----------

### Create a theme

If you choose the `Create a new theme` option, the system will ask you two things :
 - The name you want for the new theme;
 - The css pre processor you want to use in this theme (less or sass).
 
By default (if you just press enter), the theme will be named following the pattern `theme###n` (e.g: the first one will be named `theme0001`)
 and the css pre processor will be less.
 
Then, the system will print the configuration you've choose and ask you if it's correct, if it is, so just press enter.

When you create a new theme for the first time, the system will detect if bower packages are installed.
If they're not, it will automatically try to install them.

Now the system will retrieve templates files (and some others, like images) from the default theme (which is the one that is always up to date)
and push them into the new theme folder, it will also retrieve source files (css, fonts, images, js)
from the bower packages and add them to the new theme folder in the theme manager.

When the new theme has been created, the system will ask you if you want to start the file watchers.

If a theme of the name you've choose already exist, then it will ask you if you want to work on it (it will start the file watchers).

For more information about the file watchers see [Work on a theme](#work-on-a-theme)

### Copy a theme

Coming soon

### Work on a theme

Explanations are coming soon

#### Start file watchers

Explanations are coming soon

#### Compile all type files

Explanations are coming soon

#### Generate dist

Explanations are coming soon

#### Generate build

Explanations are coming soon

#### Update version

Explanations are coming soon

### Standalone file

Explanations are coming soon

Magix tasks
-----------

### Install Magix Plugins

This option allows you to easely install a Magix plugin.

It will ask you two things:
- The name of the plugin you want to install;
- The name of the theme to install the public template files if it needs to.

### Check Magix version

This options allows you to verify if you version of Magix is still up to date.

Maintenance tasks
-----------------

### Check for packages updates

This options allows you to verify if the npm packages and the bower packages are up to date.

If they're not, it will show you which ones are outdated and will ask you if you want to do an upgrade.

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