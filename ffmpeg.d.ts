/*
**  @rse/ffmpeg -- FFmpeg distribution for NPM
**  Copyright (c) 2021-2025 Dr. Ralf S. Engelschall <rse@engelschall.com>
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

declare module "@rse/ffmpeg" {
    export type FFmpegInfo = {
        version:   string,
        protocols: {
            [ protocol: string ]: {
                input: boolean, output: boolean
            }
        },
        formats: {
            [ format: string ]: {
                demux: boolean, mux: boolean
            }
        },
        codecs: {
            [ format: string ]: {
                demux: boolean, mux:   boolean,
                video: boolean, audio: boolean, subtitle: boolean
                intra: boolean, lossy: boolean, lossless: boolean
            }
        },
        hwaccels: {
            [ method: string ]: boolean
        },
        devices: {
            [ device: string ]: {
                demux: boolean, mux: boolean
            }
        },
        pixfmts: {
            [ format: string ]: {
                input: boolean, output: boolean,
                hardware: boolean, paletted: boolean,
                bitstream: boolean
            }
        }
    }
    export default class FFmpeg {
        static get supported (): boolean
        static get binary (): string
        static get info (): FFmpegInfo
    }
}

