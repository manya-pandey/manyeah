---
title: Birla AI Labs
kind: internship
role: AI Research Intern
org: Office of Ananya Birla (OAB)
location: Mumbai, India (remote)
period: Feb – Apr 2026, Aug 2026 – present
date: 2026-08-01
---

Research on time series foundation models (TSFMs), and on what goes wrong inside their context window at inference time.

- Identified **context poisoning** in patch-based TSFMs: structurally anomalous patches capture a disproportionate share of attention and silently degrade **zero-shot forecast quality**.
- Designed **GITCO**, a lightweight **inference-time context optimization** framework built as a Gate–Router–Critic pipeline. It selectively suppresses harmful patches **without any parameter updates**, so the model keeps its full generality.
- Evaluated it on **TimesFM 2.5** across **53 GIFT-Eval datasets** under K-fold cross-validation: a **+1.95% average MASE reduction**, capturing **89.9% of the theoretical improvement upper bound**.
- Introduced **context sensitivity profiles**, a new characterizable property of TSFMs that maps a series' meta-features to the accuracy it can expect to gain from inference-time intervention.

This work became the GITCO paper, accepted at two ICML 2026 workshops ([research](/research)).
