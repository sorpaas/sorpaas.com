---
title: "Memory Efficiency of Lojban tanru Left Grouping"
layout: post
category: en
---

It turned out that memory efficiency is not only a problem for computer, but also a problem for human.

In English, "little girl school" has ambiguous meaning. Without further information, one cannot know whether its exact meaning is "school for little girls" or "little school for girls". Lojban solved the problem by defining tanru like this as left grouping. Therefore, "cmalu nixli ckule" will always mean "school for little girls" but not other way around. In Lojban, it is always "left grouping" for logical predicates to combine together.

So why left grouping but not right grouping?

I don't know whether LLG considered it when they made the grammer in 1990s, but left grouping truly has some advantages over right grouping. One of it is **memory efficiency**.

To illustrate it, let's consider a mathematical concept **recursion**. For example, to write a factorial function, one can simply make it like this in OCaml:
```ocaml
let rec factorial = function
  | 0 -> 1
  | n -> n * (factorial (n - 1));;
```
However, this version is not memory efficiency. If ```n``` is big, it will take a lot of memory since it needs to expand the list before doing any calculation. It is right grouping.

There's a techniques called **tail recursion** to solve the problem. For the above example, we can change it to left grouping to make it calculate while expanding the list:
```ocaml
let factorial n =
  let rec aux acc = function
    | 0 -> acc
    | n -> aux (acc * n) (n - 1)
  aux 1 n;;
```

In Lojban, using left grouping for "cmalu nixli ckule", we need to remember less things in order to understand the text. When hearing or reading the first two words "cmalu nixli", we can already understand it's about "little girl", and then after hearing or reading the third word "ckule", we can directly combine "little girl" with school without the need to remember 3 words together to understand the idea.

Lojban is an artificial language designed for human to human communication and intend to suit our future need of communication with computers and artificial agents. For more information of Lojban, you can go to [lojban.org](lojban.org).
