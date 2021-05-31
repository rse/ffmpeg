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

/*  external requirements  */
const fs    = require("fs")
const path  = require("path")
const execa = require("execa")

/*  helper function for checking whether a file exists  */
const pathExists = (p) => {
    try { fs.accessSync(p, fs.constants.F_OK); return true }
    catch (ex) { return false }
}

/*  determine platform-specific binary  */
const { arch, platform } = process
let binary = null
if      (arch === "x64"   && platform === "darwin")   binary = "ffmpeg-mac-x64"
else if (arch === "arm64" && platform === "darwin")   binary = "ffmpeg-mac-a64"
else if (arch === "x64"   && platform === "win32")    binary = "ffmpeg-win-x64.exe"
else if (arch === "x64"   && platform === "linux")    binary = "ffmpeg-lnx-x64"
else if (arch === "arm"   && platform === "linux")    binary = "ffmpeg-lnx-a64"
else if (arch === "x64"   && platform === "freebsd")  binary = "ffmpeg-bsd-x64"
if (binary !== null) {
    binary = path.resolve(`${__dirname}/ffmpeg.d/${binary}`)

    /*  handle "unpacked ASAR" scenario (usually with Electron packaging)  */
    if (!pathExists(binary) && binary.match(/app\.asar/))
        binary = binary.replace("app.asar", "app.asar.unpacked")

    /*  final sanity check  */
    if (!pathExists(binary))
        throw new Error(`expected FFmpeg binary not found under "${binary}"`)
}

/*  determine binary information  */
const info = {
    version:   "0.0",
    protocols: {},
    formats:   {},
    codecs:    {},
    hwaccels:  {},
    devices:   {},
    pixfmts:   {}
}
if (binary !== null) {
    /*  determine version  */
    let proc = execa.sync(binary, [ "-version" ])
    let m = proc.stdout.match(/ffmpeg\s+version\s+(\d+\.\d+(\.\d+)?)/)
    if (m !== null) {
        info.version = m[1]
        if (m[2] === undefined)
            info.version += ".0"
    }

    /*  determine available protocols  */
    proc = execa.sync(binary, [ "-hide_banner", "-protocols" ])
    const input   = proc.stdout.replace(/^(?:.|\r?\n)*Input:((?:.|\r?\n)+?)Output:(?:.|\r?\n)*$/, "$1")
    const output  = proc.stdout.replace(/^(?:.|\r?\n)*?Output:((?:.|\r?\n)+)$/, "$1")
    const inputs  = input.replace(/^\s+/, "").replace(/\s+$/, "").split(/\s+/)
    const outputs = output.replace(/^\s+/, "").replace(/\s+$/, "").split(/\s+/)
    for (const input of inputs)
        info.protocols[input] = { input: true, output: false }
    for (const output of outputs) {
        if (info.protocols[output] === undefined)
            info.protocols[output] = { input: false, output: true }
        else
            info.protocols[output].output = true
    }

    /*  determine available formats  */
    proc = execa.sync(binary, [ "-hide_banner", "-formats" ])
    let re = /^ ([D ])([E ]) (\S+)/mg
    while ((m = re.exec(proc.stdout)) !== null)
        for (const name of m[3].split(/,/))
            info.formats[name] = { demux: m[1] === "D", mux: m[2] === "E" }

    /*  determine available codecs  */
    proc = execa.sync(binary, [ "-hide_banner", "-codecs" ])
    re = /^ ([D.])([E.])([VAS.])([I.])([L.])([S.]) (\S+)/mg
    while ((m = re.exec(proc.stdout)) !== null) {
        for (const name of m[7].split(/,/)) {
            info.codecs[name] = {
                demux: m[1] === "D", mux:   m[2] === "E",
                video: m[3] === "V", audio: m[3] === "A", subtitle: m[3] === "S",
                intra: m[4] === "I", lossy: m[5] === "L", lossless: m[6] === "S"
            }
        }
    }

    /*  determine available devices  */
    proc = execa.sync(binary, [ "-hide_banner", "-devices" ])
    re = /^ ([D ])([E ]) (\S+)/mg
    while ((m = re.exec(proc.stdout)) !== null)
        for (const name of m[3].split(/,/))
            info.devices[name] = { demux: m[1] === "D", mux: m[2] === "E" }

    /*  determine available pixel formats  */
    proc = execa.sync(binary, [ "-hide_banner", "-pix_fmts" ])
    re = /^([I.])([O.])([H.])([P.])([B.]) (\S+)/mg
    while ((m = re.exec(proc.stdout)) !== null) {
        for (const name of m[6].split(/,/)) {
            info.pixfmts[name] = {
                input: m[1] === "I", output: m[2] === "O",
                hardware: m[3] === "H", paletted: m[4] === "P", bitstream: m[5] === "B"
            }
        }
    }

    /*  determine available hardware accelerations  */
    proc = execa.sync(binary, [ "-hide_banner", "-hwaccels" ])
    let methods = proc.stdout.replace(/^Hardware acceleration methods:\r?\n((?:.|\r?\n)*)$/, "$1")
        .replace(/^\s+/, "").replace(/\s+$/, "")
    methods = (methods !== "" ? methods.split(/\s+/) : [])
    for (const method of methods)
        info.hwaccels[method] = true
}

/*  provide API  */
module.exports = class FFmpeg {
    static get supported () {
        return (binary !== null)
    }
    static get binary () {
        if (!this.supported)
            throw new Error("architecture/platform ${process.arch}/${process.platform} not supported")
        return binary
    }
    static get info () {
        return info
    }
}

