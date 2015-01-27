---
title: "My Experience for the Jane Street Interview"
layout: post
category: en
---

I have applied for a software engineer intern in Jane Street. The interviewer is
really nice and helped me through the process, although I knew I might
have already failed the interview.

I hardly find anything related to the interview, so I am posting
something here to share my experience and hope it may help others.

### How I Prepared

Before I got the interview opportunity, I had no experience with
OCaml. And the only thing I did is to work on the
[99 Problems](http://ocaml.org/learn/tutorials/99problems.html) on the
OCaml website. It helped me with my math, algorithm and things related
with functional programming theories.

### The First Round

The interview is really straight-forward and we go directly into the
technical questions. I was able to use any language I like but I chose
OCaml rather than Ruby, which I am really good at.

I was asked to write a memoization, which can remember the return
value of a function. I first came up something like this:

```
let memo (f : ('a -> 'b)) =
    let ref dict := [] in
    fun x ->
        try List.assoc (f, x) dict with
            Not_found -> let try val = f x with err -> Error err in
                         dict := ((f x), val) :: dict;
                         val;;
```

I told the interviewer that I had no experience with Hashtbl so that
he wrote an interface of Hashtbl for me and then I rewrote my code
using that:

```
let memo (f : ('a -> 'b)) =
    let ref dict := Hashtbl.create () in
    fun x ->
        try Hashtbl.find (f, x) dict with
            Not_found -> let try val = f x with err -> Error err in
                         Hashtbl.add (x, val) dict;
                         val;;
```

I was then asked what is "wrong" with the above code. I didn't quite
catch with it so we spent a long time to come up with the idea of
constant memory and constant lookup time.

I tried to answer using priority queue for it, but in vain since I
can't keep constant lookup time. At the same time, if I use hash
table, I can't keep constant memory.

So there's long time of silence when I was thinking of a solution. In
the end, the interviewer gave me some hints of combining them together
and it ended up like this:

```
let memo (f : ('a -> 'b)) =
    let ref dict := Hashtbl.create () in
    let ref q    := Queue.create () in
    fun x ->
        try Hashtbl.find (f, x) dict with
            Not_found -> let try val = f x with err -> Error err in
                         Hashtbl.add (x, val) dict;
                         Queue.add x q;
                         val;;
```

So I didn't get it right without the interviewer's hint, and I've
failed.

But it is really a nice experience, since you can learn a lot about
functional programming and all things before and during the
interview. If you haven't tried to apply for Jane Street, I highly
recommend to give it a try.

### Reflection
It requires lots of courage to make things happen. One must prepare well before applying any jobs or internships. I think the most important thing I learnt from this is that there are still many things I don't know, and there are truly amazing people out there in the world. There's still a long way to go, and it's never late to find this out.

Another thing I found out is that the real thing that matters is yourself, your skills and your knowledge, rather than a fancy university name or company name. For most big companies that you want to work with, it's a fair game.
