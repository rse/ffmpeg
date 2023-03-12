#!/usr/bin/env bash
##
##  @rse/ffmpeg -- FFmpeg distribution for NPM
##  Copyright (c) 2021-2022 Dr. Ralf S. Engelschall <rse@engelschall.com>
##
##  Permission is hereby granted, free of charge, to any person obtaining
##  a copy of this software and associated documentation files (the
##  "Software"), to deal in the Software without restriction, including
##  without limitation the rights to use, copy, modify, merge, publish,
##  ffmpeg.dribute, sublicense, and/or sell copies of the Software, and to
##  permit persons to whom the Software is furnished to do so, subject to
##  the following conditions:
##
##  The above copyright notice and this permission notice shall be included
##  in all copies or substantial portions of the Software.
##
##  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
##  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
##  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
##  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
##  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
##  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
##  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
##

set -e

#   create ffmpeg.dribution area
rm -rf ffmpeg.d
mkdir -p ffmpeg.d

#   helper function for downloading a file
download () {
    echo "-- url:  $1"
    echo "-- file: $2"
	curl -k -L "-#" --compressed -A "https://github.com/rse/ffmpeg" -o "$2" "$1"
}

#   fetch Windows/x64 executable (version 5.1.2)
echo "++ win-x64"
download "https://github.com/GyanD/codexffmpeg/releases/download/5.1.2/ffmpeg-5.1.2-essentials_build.zip" win-x64.zip
unzip -q -o -x win-x64.zip
mv ffmpeg-5.1.2-essentials_build/bin/ffmpeg.exe ffmpeg.d/ffmpeg-win-x64.exe
chmod 755 ffmpeg.d/ffmpeg-win-x64.exe
rm -rf ffmpeg-5.1.2-essentials_build
rm -f win-x64.zip

#   fetch macOS/x64 executable (version 5.1.2)
echo "++ mac-x64"
download "https://evermeet.cx/pub/ffmpeg/ffmpeg-5.1.2.zip" mac-x64.zip
unzip -q -o -x -d ffmpeg.d mac-x64.zip ffmpeg
mv ffmpeg.d/ffmpeg ffmpeg.d/ffmpeg-mac-x64
rm -f mac-x64.zip

#   fetch macOS/a64 executable (version 5.0)
echo "++ mac-a64"
download "https://www.osxexperts.net/FFmpegARM.zip" mac-a64.zip
unzip -q -o -d ffmpeg.d mac-a64.zip ffmpeg
mv ffmpeg.d/ffmpeg ffmpeg.d/ffmpeg-mac-a64
rm -f mac-a64.zip

#   fetch Linux/x64 executable (version 5.1.1)
echo "++ lnx-x64"
download "https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz" lnx-x64.tar.xz
xz -d <lnx-x64.tar.xz | tar -x -C ffmpeg.d --strip-components 1 -f- "ffmpeg-5.1.1-amd64-static/ffmpeg"
mv ffmpeg.d/ffmpeg ffmpeg.d/ffmpeg-lnx-x64
chmod 755 ffmpeg.d/ffmpeg-lnx-x64
rm -f lnx-x64.tar.xz

#   fetch Linux/a64 executable (version 5.1.1)
echo "++ lnx-a64"
download "https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-arm64-static.tar.xz" lnx-a64.tar.xz
xz -d <lnx-a64.tar.xz | tar -x -C ffmpeg.d --strip-components 1 -f- "ffmpeg-5.1.1-arm64-static/ffmpeg"
mv ffmpeg.d/ffmpeg ffmpeg.d/ffmpeg-lnx-a64
chmod 755 ffmpeg.d/ffmpeg-lnx-a64
rm -f lnx-a64.tar.xz

#   fetch FreeBSD/x64 executable (version 5.1.1)
echo "++ bsd-x64"
download "https://github.com/Thefrank/ffmpeg-static-freebsd/releases/download/v5.1.1/ffmpeg" ffmpeg.d/ffmpeg-bsd-x64
chmod 755 ffmpeg.d/ffmpeg-bsd-x64

