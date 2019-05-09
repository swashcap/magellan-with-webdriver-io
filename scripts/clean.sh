#!/bin/bash
set -eo pipefail

rm -rf dist &
find {src,test} -type f -name '*.js' -exec rm {} \+

wait
