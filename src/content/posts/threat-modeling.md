---
title: "Threat Modeling for Small Teams"
description: "A practical approach to threat modeling that doesn't require a dedicated security team."
date: 2025-04-15
tags: ["security", "webdev"]
---

Threat modeling gets a reputation for being something only big companies with dedicated security teams can do. That's not true.

## What is Threat Modeling?

At its core, threat modeling is asking three questions:

1. What are we building?
2. What could go wrong?
3. What are we going to do about it?

That's it. No fancy tools, no 50-page documents. Just structured thinking about security.

## The STRIDE Framework

STRIDE is a simple categorization of threats:

- **S**poofing — Someone pretending to be someone else
- **T**ampering — Someone modifying data or code
- **R**epudiation — Someone denying they did something
- **I**nformation Disclosure — Data exposed to unauthorized parties
- **D**enial of Service — Service becomes unavailable
- **E**levation of Privilege — Someone gains more access than they should

When building any system, run through each category and ask: "Could this happen here?"

## A Simple Template

For small teams, start with a single diagram:

```
[User] --> [App] --> [Database]
```

Then annotate it:

- Where does authentication happen?
- Where is data stored?
- Where does data cross trust boundaries?

That's your threat model. Now go through each boundary and ask what could go wrong.

## Practical Example

Take a simple blog:

- **User** writes a comment
- **App** stores it in the database
- **App** serves it back to other users

Threats:
- XSS via comments (tampering + information disclosure)
- SQL injection (tampering)
- Admin account takeover (spoofing)

Each threat gets a mitigating control. That's threat modeling done.

## When to Stop

You'll never eliminate all risk. Threat modeling is about identifying the *most likely* and *most damaging* threats, then addressing those first.

Start small. Iterate. It gets easier.
