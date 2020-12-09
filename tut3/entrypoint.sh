#!/usr/bin/env sh
set -eu
npm run build
serve -s -l tcp://0.0.0.0:5000 /frontend/build 
exec "$@"