/*
**  @rse/ffmpeg -- FFmpeg distribution for NPM
**  Copyright (c) 2021 Dr. Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const path = require("path")

module.exports = class FFmpeg {
    static get binary () {
        const { arch, platform } = process
        let exe = ""
        if      (arch === "x64"   && platform === "darwin")   exe = "ffmpeg-mac-x64"
        else if (arch === "arm64" && platform === "darwin")   exe = "ffmpeg-mac-a64"
        else if (arch === "x64"   && platform === "win32")    exe = "ffmpeg-win-x64.exe"
        else if (arch === "x64"   && platform === "linux")    exe = "ffmpeg-lnx-x64"
        else if (arch === "arm"   && platform === "linux")    exe = "ffmpeg-lnx-a64"
        else if (arch === "x64"   && platform === "freebsd")  exe = "ffmpeg-bsd-x64"
        else throw new Error("architecture/platform ${arch}/${platform} not supported")
        return path.resolve(`${__dirname}/ffmpeg.d/${exe}`)
    }
}

