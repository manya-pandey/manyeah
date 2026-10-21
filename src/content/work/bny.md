---
title: BNY (Bank of New York)
kind: internship
role: Software Development Engineering Intern
location: Pune, India
period: May – Jul 2026
date: 2026-05-01
---

Search, retrieval and LLM tooling for economic stress testing and regulatory text.

- Engineered an **NLP-to-pandas** search pipeline over **100+ economic stress-testing scenarios**, so scenarios can be queried in plain language instead of filtered by hand in spreadsheets.
- Designed a 3-tier dynamic LLM context-routing system that **cut API costs by 6.3×** while keeping **p95 latency under 2 s**, hardened with **13 prompt-injection guardrails**, deterministic generation and Levenshtein fuzzy-matching.
- Developed a **hybrid RAG retrieval service** over **700+ pages** of regulatory text, exposed to other tools through the **Model Context Protocol (MCP)**.
- Architected a **3-signal fusion ranking algorithm** (BM25, cosine similarity and metadata) reaching **81% Recall@5** and **0.63 MRR**, with strict source-citation logic from a **ChromaDB** vector store so answers about financial workflows can be verified.
