#!/bin/bash

# Get path for THIS script
pushd $(dirname $0) > /dev/null
SCRIPT_PATH=$(pwd -P)/
popd > /dev/null
cd ${SCRIPT_PATH}

git pull
pm2 restart www
