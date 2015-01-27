---
title: Add SSH Keys Inside Docker Containers
layout: post
category: en
---

Docker is an amazing tool, but since it is still an under-development tool, sometimes workarounds are needed to make things work. For example, recently I am trying to set up capistrano inside a docker container for deployment automation, using `fig` as a wrapper for docker.

However, when runnig ```fig run web cap production_main git:check```, even with SSH keys set up in the container, I always cannot access my private Git repo becasue the SSH agent forwarding does not work properly.

The problem is that the SSH agent forwarding needs `ssh-add` before in order to add keys into the agent, but in order to run `ssh-add`, I must first set the environment variables for SSH agent by running the command ```eval `ssh-agent -s` ```, but docker does not allow dynamic environment variables nor running hooks. Therefore, here's a small workaround to make those things work.

1. Create a shell script that simply eval all its arguments and put it somewhere under your project folder:

        #!/bin/sh

        eval `ssh-agent -s` > /dev/null
        ssh-add > /dev/null

        exec $*

2. Modify the docker _entrypoint_ to something like:

        [ "bin/repo-sh" ]

    Since I'm using `fig`, it becomes this in my `fig.yml`:

        entrypoint:
            - "bin/repo-sh"

Well done. Enjoy docker!
