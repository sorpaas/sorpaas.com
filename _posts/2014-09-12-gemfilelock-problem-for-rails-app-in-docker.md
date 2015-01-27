---
title: Gemfile.lock Problem for Rails App in Docker
layout: post
category: en
---

Today I ran into a strange problem, that for deployment, a `Gemfile.lock` file is needed but I cannot find it locally.

The reason is that the `bundle install` command is ran inside the docker container when building the Dockerfile, so that I need manually copy the file into host.

1. Run `docker ps` (or `fig ps` if you are using fig wrapper) and find out which container you are using.

2. Run the following command under your project directory:

        docker cp <container_id>:/app/Gemfile.lock .
