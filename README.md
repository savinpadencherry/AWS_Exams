# SidelineReel coach review prototype

A clickable prototype of the coach review flow for look-alike jersey numbers. It uses made-up sample data and no real footage.

Live: https://savinpadencherry.github.io/AWS_Exams/

Screens:

1. **Queue** – clips with look-alike numbers are held back and the weekly recap stays on hold.
2. **Review** – the coach confirms the player, picks someone else, or leaves the clip out.
3. **Recap** – the recap can only be sent once the queue is empty, and every decision is logged.
4. **Parent view** – "Not my kid" removes a clip and sends it back to the coach.
5. **Model** – coach answers become labeled examples, the model is retrained and tested before release.

The page is a single `index.html` with no build step.

The AWS exam prep app that used to live on `main` is on the `aws-exams` branch.
