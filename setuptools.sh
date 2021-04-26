#!/bin/bash

export TOP="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
export SST_NPM_BIN=`npm bin`;
export PATH="$TOP/bin:$SST_NPM_BIN:$PATH"
