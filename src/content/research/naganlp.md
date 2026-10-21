---
title: "NagaNLP: Bootstrapping NLP for Low-Resource Nagamese Creole with Human-in-the-Loop Synthetic Data"
status: preprint
authors: Agniva Maiti, Manya Pandey, Murari Mandal
venue: arXiv
date: 2025-12-14
link: https://arxiv.org/abs/2512.12537
---

An open-source NLP toolkit for **Nagamese**, an under-resourced creole spoken in Nagaland. With almost no existing data to work from, the paper generates candidate text with an LLM under expert guidance, then has native speakers refine and annotate it: **human-validated synthetic data**. That produced a 10K-pair conversational dataset and an annotated corpus for basic NLP tasks.

Fine-tuning **XLM-RoBERTa** and **Llama-3.2** on that data **established the first baselines** for the language, well ahead of zero-shot models. The toolkit, datasets, models and code are all released, as a framework other low-resource languages can reuse.
