#!/bin/bash
set -eo pipefail

rm -rf dist log &
find {src,test} -type f -name '*.js' -exec rm {} \+

wait
