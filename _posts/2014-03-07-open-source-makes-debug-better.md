---
title: Open Source Makes Debug Better
layout: post
category: en
---

Open source has now become a huge community, it is now making the developer community really enjoyable. I often use open source application because I can know what the program I use is doing, and at the same time, I am able to learn something from it. Recently, I find another important benefits that open source can give to everybody, debug. Open source actually makes debug easier and potentially faster.

### Review of Bundler.require

Recently I was asked a question, "what is the usage of the Gemfile"? We discussed for some time and had some disagreement of ```Bundler.require```, ```Bundler.setup``` and ```bundle exec```. In the end, we simply dived into the source and used a few minites find the difference of those functions.

### Debug of an iOS App

However, debugging in iOS is not as convenient as debugging in open source software. Recently I was writting an iOS App, the camera went wrong. The initialization code of the camera was copied from the official documentation of Apple. It really makes debugging difficult because I cannot know whether the bug is from iOS libraries or from my own code.

<hr>

Open source is great for debugging. Knowing what Bundler do uses only a few minites, but the bug in that iOS App still occur occasionally.

Not only big companies, but also startups started to open their source at least partially. It makes stronger and stronger developer communities with the open source movement.
