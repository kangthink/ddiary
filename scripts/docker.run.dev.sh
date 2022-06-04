#!/usr/bin/env bash
docker run --rm -it -p 3000:3000 \
-v $(pwd):/ddiary \
-v ~/.gitconfig:/root/.gitconfig \
--name codingaca-ddiary-dev-container \
codingaca/ddiary:latest-dev \
/bin/sh
