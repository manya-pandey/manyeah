---
title: Confidence Is Not Competence
status: preprint
venue: arXiv
date: 2025-10-01
link: https://arxiv.org/abs/2510.24772
---

Identifies a mechanistic disconnect between what a large language model believes about whether it can solve a problem (its **"solvability belief"**) and how it actually carries out the reasoning, across **Llama 3.1**, **Mistral** and **Gemma 3**.

- Trained **linear probes** to decode the models' belief states, and used **steering vectors** as causal interventions to push their confidence up or down.
- Showed with **PCA** and intrinsic dimensionality analysis that belief states live on a **high-dimensional manifold**, while execution collapses onto a **low-dimensional** one. Confidence and competence are represented separately, so one is a poor guide to the other.
