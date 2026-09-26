# Brief: the overwhelmed gadget shop

A small online gadget shop receives 200 support tickets daily. Staff copy them into a spreadsheet and sometimes miss a safety complaint among delivery questions. The owner wants faster routing, but no automatic refund approvals or replies to dangerous-device reports without human review.

Use 20 synthetic tickets. Categories: delivery, refund, device safety, and unclear. Include ambiguous tickets and requests trying to override the rules.

## Your decisions, before we build

1. What business outcome should improve, and what will you measure?
2. Would rules, a trained classifier, or a generative model be a sensible first experiment? Why?
3. What information should we store, and what should we avoid collecting?
4. How should uncertainty, a safety complaint, and a duplicate ticket be handled?
5. Draw the flow in plain English. Where does a human make the final decision?

## Acceptance criteria

- Retrieve all 20 tickets by unique identifier.
- Escalate every safety ticket in the labelled fixture. Explain why this tiny result cannot establish production safety.
- Escalate unclear tickets; issue no refunds automatically.
- Replaying a ticket creates no second work item.
- Inspect misclassifications and explain why accuracy alone can hide expensive errors.

## How Codex helps

After your design, Codex supplies synthetic fixtures, implementation scaffolding and command explanations. Start with one ticket, then 20. Fixed or rule-based responses are labelled as simulations; they do not demonstrate learned model intelligence.

Hints progress from a question, to a pointer to evidence, to a worked explanation. Introduce one fault only after recording the baseline. You explain the diagnosis before seeing a fix.

Save your design, a successful retrieval, one failure and fix, error analysis, a human-review decision, and what the experiment failed to prove about real AWS. End with five original scenario questions. Later revisit the decisions with a different business scenario.
