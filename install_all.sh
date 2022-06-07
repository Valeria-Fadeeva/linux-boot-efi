#!/bin/bash

if [[ "$UID" != 0 ]]; then
    echo "USER NOT ROOT"
    sudo $0
    exit
else
    echo "USER IS ROOT"
fi

cd good
cp --recursive --force --remove-destination --no-dereference --preserve=links . /
