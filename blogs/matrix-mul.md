---
title: "Matrix Multiplication but Weird"
date: "2025-10-08"
tags: ["algorithms", "deep learning", "matrix multiplication", "ai-research"]
---

Matrix multiplication is one of those operations that quietly powers the entire digital world, from graphics rendering to training massive AI models. It’s elegant, simple, and yet, underneath, it’s a battlefield of clever math, algorithmic ingenuity, and lately, machine-discovered innovation.

Let’s unpack that, but weird.

---

## The Familiar Monster

If you’ve ever implemented matrix multiplication, you know the classic triple loop:

```python
for i in range(n):
    for j in range(n):
        for k in range(n):
            C[i][j] += A[i][k] * B[k][j]
```

This is (O(n^3)), clean, brutal, and expensive. For small matrices, it’s fine. For 70 billion-parameter transformer models? Not so fine.

In the 1960s, most believed this cubic wall was unbreakable. But then a quiet revolution started.

---

## Strassen’s Clever Shortcut

In 1969, Volker Strassen dropped a mathematical bombshell:
"Matrix multiplication can be done faster than cubic time."

He introduced an algorithm that multiplies two 2×2 matrices using only 7 multiplications instead of 8, through a series of cleverly constructed combinations and subtractions. The trick was to rearrange the arithmetic to exploit linearity.

This reduced the complexity to (O(n^{2.8074})).
Not cubic. Not linear. But strangely in between.

This paper, [*Gaussian Elimination is Not Optimal*](https://www.cise.ufl.edu/~sahni/papers/strassen.pdf), changed everything. And yet, the rabbit hole goes deeper.

---

## Fast Matrix Multiplication: Into the Abyss

After Strassen, researchers kept pushing:
Coppersmith–Winograd, Le Gall, Alman–Williams, each shaving off tiny exponents using methods that feel more like abstract art than math.

The latest theoretical record (as of 2025) clocks around (O(n^{2.3715})).
But here’s the strange part: none of these algorithms are used in practice.

Why? They’re too fragile. Massive constants, cache inefficiency, and floating-point instability make them impractical for real workloads. So deep learning frameworks like PyTorch or TensorFlow rely on highly optimized blocked multiplications and GPU kernel tricks instead.

---

## Then Came the Machines

Now, things are getting even stranger. Enter AlphaEvolve, a DeepMind project described in [their recent paper](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/AlphaEvolve.pdf).
It’s not just multiplying matrices, it’s learning how to invent algorithms.

AlphaEvolve uses Gemini-powered code agents to search the algorithmic space, guided by performance feedback. It recently rediscovered variants of matrix multiplication that resemble Strassen-like patterns, but weren’t written by humans.

Essentially, AI is starting to do algorithm design, not by proving theorems, but by evolving computational shortcuts.

We’ve gone from handcrafted cleverness to machine-evolved optimization.

---

## The Modern Weirdness

Two recent works, [arXiv:2502.04514](https://arxiv.org/pdf/2502.04514) and [arXiv:2505.05896](https://arxiv.org/pdf/2505.05896), push this strangeness further:

* One explores algebraic geometry perspectives of fast matrix multiplication.
* The other introduces AI-assisted tensor decomposition frameworks that find new low-rank factorizations, potentially improving on Strassen in some cases.

This is where it gets philosophical:
Are we approaching a point where AI will rediscover, or even surpass, the limits of human-designed linear algebra?

---

## Weird but Beautiful

Matrix multiplication started as a simple textbook operation.
Then it turned into a mathematical arms race.
Now it’s an AI playground.

Every time you train a model or render a frame, billions of these operations dance beneath the surface, optimized, fused, tiled, and soon, maybe evolved.

And that’s the beauty of computation: even the most basic operations can hide alien levels of creativity.

---

### Sources

* [Strassen, V. (1969). *Gaussian Elimination is Not Optimal.*](https://www.cise.ufl.edu/~sahni/papers/strassen.pdf)
* [DeepMind (2025). *AlphaEvolve: A Gemini-powered coding agent for designing advanced algorithms.*](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/AlphaEvolve.pdf)
* [YouTube: *The Strangest Algorithm: Strassen’s Matrix Multiplication Explained*](https://www.youtube.com/watch?v=xsZk3c7Oxyw)
* [arXiv:2502.04514](https://arxiv.org/pdf/2502.04514)
* [arXiv:2505.05896](https://arxiv.org/pdf/2505.05896)
