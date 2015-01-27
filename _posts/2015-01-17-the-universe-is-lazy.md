---
title: "The Universe is Lazy: Thoughts on a 2D Universe Simulation"
layout: post
category: en
---

In this winter I created a [2D universe simulation](http://universe.ns.mg/particles) using WebGL. You can find some technical details of this project in a [presentation](http://sorpaas.com/slides/webgl-2d-universe-simulation) done in [Open Innovation Lab](http://cuhkoil.org). Here I would like to share lessons learned from making the project.

### WebGL and GPGPU is Fast

It's really fast, and it's also better at math. In the simulation, there are ```32678 (1024 * 32)``` particles in total, but it still runs fairly well in a normal computer. So if you have ever come to any performance problem for your web application, give WebGL a try.

### Structure Data As It Should Be

One thing I needed to deal with in this simulation is to calculate gravities. In the beginning I tried to use some javascript arrays to accomplish them. However, it seemed a little bit complex and slow. In the end, I finally found the right approach, as each position on the screen has a property of gravity, simply **draw gravities onto the screen**. You can use a seperated frame buffer for this purpose, and attach this frame buffer to a texture for later access.

### The Universe is Lazy

I was once very confused that why, in order to describe our universe, we have things as complex as general relativity and quamtun theory. However, by applying a modified version of those theories into the simulation, I find that it's really good in terms of scaling and performance.

For example, by treating gravities as waves in a big universe, we don't need to update all values of gravities in all positions simultaneously. Instead, we just need to update values near the existing points, and it will **spread** to other positions.
