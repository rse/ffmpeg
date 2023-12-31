
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
`ffmpeg` executable from within [Node.js](https://nodejs.org) or from
[Electron](https://electronjs.org) Node integrations.

The crux of this NPM module is that the particular platform-specific
FFmpeg binaries are manually [pre-selected and prepared](ffmpeg.sh)
(from various sources) and this NPM module on installation
[automatically downloads](npm-install.yaml) the corresponding
cherry-picked FFmpeg binary only. Additionally, this NPM module provides
a small API to programmatically determine the version and the features
of the particular platform-specific FFmpeg binary.

Hint: if you need FFmpeg in the Browser (as in an Electron
BrowserWindow), check out [FFmpeg.wasm](https://ffmpegwasm.github.io/)
instead.

**LICENSE NOTICE: Although this NPM module is licensed under MIT
license, the externally downloaded and used FFmpeg binaries are licensed
under LGPL or even GPL, depending on their particular build-time
configuration.**

Platform Support
----------------

Currently the following particular operating system / CPU-architecture platforms are supported only:

- Windows/x64 (FFmpeg 6.1.0)
- macOS/x64 (FFmpeg 6.1.0)
- macOS/a64 (FFmpeg 6.1.0)
- Linux/x64 (FFmpeg 6.1.0)
- Linux/a64 (FFmpeg 6.1.0)
- FreeBSD/x64 (FFmpeg 6.1.0)

Installation
------------

```shell
$ npm install @rse/ffmpeg
```

Usage
-----

```sh
$ npx ffmpeg -version
```

```js
const FFmpeg = require("@rse/ffmpeg")
const execa  = require("execa")
if (FFmpeg.supported && FFmpeg.info.version.match(/^[45]\./)) {
    const { stdout } = execa.sync(FFmpeg.binary, [ "-version" ])
    console.log(stdout)
}
```

License
-------

Copyright (c) 2021-2023 Dr. Ralf S. Engelschall (http://engelschall.com/)

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

