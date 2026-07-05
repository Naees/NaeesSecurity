---
title: "Field notes 001: make the assumption visible"
description: "A short opening note for the rebuilt NaeesWrites archive: security work starts by naming the assumption that failed."
date: 2026-07-05
tags: ["security", "field-notes", "method"]
draft: false
---

The first useful step in most security work is not finding a payload. It is naming the assumption.

Someone assumed an object belonged to the person requesting it. Someone assumed a reset link could only be seen by the intended user. Someone assumed an internal bucket would stay internal because the interface suggested it was private. The bug often starts long before the exploit.

This archive is being rebuilt around that idea. Each future note should try to preserve four things:

1. the model the system appeared to have,
2. the assumption that made the model fragile,
3. the primitive that proved the failure,
4. the fix that would have removed the class, not just the symptom.

That is the standard I want NaeesWrites to grow into: less noise, clearer chains, and notes that remain useful after the novelty fades.
