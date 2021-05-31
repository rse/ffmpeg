
@rse/ffmpeg
===========

FFmpeg distribution for NPM

<p/>
<img src="https://nodei.co/npm/@rse/ffmpeg.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/ffmpeg.png" alt=""/>

About
-----

This is a small NPM module, providing a [FFmpeg](https://ffmpeg.org)
distribution, to be able to easily use the latest versions of the
`ffmpeg` executable from within [Node.js](https://nodejs.org) or
[Electron](https://electronjs.org) applications.

The crux of this particular NPM module is that the particular
platform-specific binaries are manually pre-selected and
[pre-prepared](ffmpeg.sh) and this NPM module on installation
automatically [downloads](npm-install.yaml) the corresponding
cherry-picked binary only.

Installation
------------

```shell
$ npm install @rse/ffmpeg
```

Usage
-----

```sh
$ npx ffmpeg ...
```

```js
const FFmpeg = require("@rse/ffmpeg")
const execa  = require("execa")
execa(FFmpeg.binary, [ ... ])
```

License
-------

Copyright (c) 2021 Dr. Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

