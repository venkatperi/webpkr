#!/bin/bash
RES=$(node dist/bundle.js)
if [ $RES == 'index.js' ]; then
  exit 0
else
  exit 1
fi
