#!/bin/bash

if [[ "$UID" != 0 ]]; then
    echo "USER NOT ROOT"
    sudo $0
    exit
else
    echo "USER IS ROOT"
fi

pwd=$(dirname $0)

cp -vrf --remove-destination --no-dereference --preserve=links $pwd/good/* /
