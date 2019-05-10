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
yarn -s test:geckodriver --log debug > logs/geckodriver.log 2>&1 &

yarn -s test:wdio

WDIO_EXIT_CODE=$?

kill $(lsof -ti :4000 && lsof -ti :4444)

exit "$WDIO_EXIT_CODE"
