#!/bin/bash

# Leave off these sensible bash settings to prevent early bails, which would
# result in zombie processes for geckodriver and the server.
#
#   set -eo pipefail

mkdir -p logs
rm -f logs/{geckodriver,server}.log

kill $(lsof -ti :4000 && lsof -ti :4444) &> /dev/null || true

# Assumes a freshly built server
yarn -s start > logs/server.log 2>&1 &
node_modules/.bin/geckodriver --log debug > logs/geckodriver.log 2>&1 &

node_modules/.bin/wait-on --log http-get://localhost:4000 \
  http-get://localhost:4444/status && \
  node_modules/.bin/wdio -c wdio.conf.js

WDIO_EXIT_CODE=$?

kill $(lsof -ti :4000 && lsof -ti :4444)

exit "$WDIO_EXIT_CODE"
