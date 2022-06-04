#!/usr/bin/env bash
docker build . \
-f docker/Dockerfile.dev \
-t codingaca/ddiary:latest-dev
