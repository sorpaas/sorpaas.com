---
title: "Munje: A Proposal"
layout: post
category: en
---

This is a proposal for the Munje project. For more information of Munje, please go to https://ns.mg/Munje.

### Terminology

Below I'll try to use a terminology similar to logic programming language.

Those two terms come from the book by [Zohar Manna] [1]:

* Transformational program: a program that focus on produce a final
result given arguments as inputs.
* Reactive program: a program that maintain some ongoing interaction
with the environment.

Also, I will use those two terms to distingish two different kinds of
variables:

* Determined variable: A variable whose value can be determined during
compile time or passed before the initialization of the program.
* Undetermined variable: In a reactive program, a variable whose value,
at some time, needs to rely on interactions with the environment, and
therefore cannot be determined during compile time, for example, user input.

### Assumptions

The following assumptions will be made (proof needed):

* A description of temporal logic, if contains only determined variable,
can be translated easily into logic without the temporal part. That is,
the temporal part can be easily reduced.
* If a description of temporal logic contains undetermined variable, its
translation into logic without the temporal part will cause appearence
of "side-effects" and is not complete (in terms of logic).

### Expressiveness of Munje compared with Prolog I/O

Consider the following specification of a program:

A reactive program, which reads user input of 9 numbers of 0 and 1.
Those numbers are splited by "|", and a new line should be created after
3 numbers are inputed. For example, the user may give the following input:

    1 | 1 | 0
    0 | 1 | 1
    0 | 0 | 0

This is useful for giving initial condition of programs such as Game of
Life [2].

#### In Prolog

Prolog's I/O system is similar to that in a imperative language, you
need to use the `read_string` relation:

    read_string(X)

After the `get_input` relation gets backtraced and a newline is
enterred, the `X` variable will contain the result of user input.
Therefore, you would need to call `read_string(X)` three times, and
split the resulting variables to get the final user input.

#### In Munje

    list xs '([repeat 9 (read @ (or (eq @ "|") (eq @ "\n")) @]) ;result
    holds xs ps ;mapping the list and get corresponding time points
    sequence ps ;claim that the time points are in a sequence

Where read is defined as:

    read x term ;read user input as `x` before `term` appears

In Munje, using temporal logic, we can directly insert the user input
logic as a relation to the result list. "@“ means replace the value here
is a direct replacement of the relation.

### Dependency methods

Using temporal logic, dependency methods can be easily claimed. This is
extremely useful when do initialization of a program.

### Reactive program

Thanks to temporal logic, for reactive programs that requires continuous
data change, for example, [the Game of Life implementation][3], temporal
logic is really expressive.

### Existing Essays and Implementations

There are many existing essays talking about temporal logic in logic
programming languages, including:

* Hrycej, Tomas. "A temporal extension of Prolog." The Journal of Logic
Programming 15.1 (1993): 113-145.
* Baudinet, Marianne. "Temporal logic programming is complete and
expressive." Proceedings of the 16th ACM SIGPLAN-SIGACT symposium on
Principles of programming languages. ACM, 1989.
* Abadi, Martin, and Zohar Manna. "Temporal logic programming." Journal
of Symbolic Computation 8.3 (1989): 277-295.

Also, a project called TRIO is focusing on analysis using temporal
logic, which is also highly related. [Zohar Manna] [1] also has a book
talking about temporal programming.

[1]: http://dl.acm.org/citation.cfm?id=128869 "Manna, Zohar, and Amir Pnueli. The temporal logic of reactive and concurrent systems: specifications. Vol. 1. springer, 1992."
[2]: http://www.ibiblio.org/lifepatterns/october1970.html "Conway, John. "The game of life." Scientific American 223.4 (1970): 4."
[3]: http://pmav.eu/stuff/javascript-game-of-life-v3.1.1/
[4]: http://www.sciencedirect.com/science/article/pii/074310669390016A "Hrycej, Tomas. "A temporal extension of Prolog." The Journal of Logic Programming 15.1 (1993): 113-145."
[5]: http://dl.acm.org/citation.cfm?id=75301 "Baudinet, Marianne. "Temporal logic programming is complete and expressive." Proceedings of the 16th ACM SIGPLAN-SIGACT symposium on Principles of programming languages. ACM, 1989."
[6]: http://www.sciencedirect.com/science/article/pii/S0747717189800707 "Abadi, Martin, and Zohar Manna. "Temporal logic programming." Journal of Symbolic Computation 8.3 (1989): 277-295."
