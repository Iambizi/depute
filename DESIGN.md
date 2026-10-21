# depute visual system

Geist is intentional. The components are meant to sit in a Vercel-style product. Do not swap the sans. Use Geist Mono for amounts, hashes, and IDs. The site header uses the 3D title mark. The flat pixel drawing is not used there, because at header size the d reads as an O.

## Status

Status sits on the label, not on the card edge. Approval Gate puts a 6px dot in front of the eyebrow: accent while waiting, green when approved, red when rejected. Resolved gates still end in a text footer. No card has a colored side stripe.

## Motion

Status dots pulse only while an agent is running or working. Other pulses run at most three times. The approval stamp eases out (`cubic-bezier(0.22, 1, 0.36, 1)`) and does not overshoot.

## Color

One ink accent, plus status pairs of step-11 text on step-3 tint. Both themes stay at or above 4.5:1. The site uses the same gray-11 muted text. No glow halos or glass panels. Docs taxonomy badges stay colored on purpose: blue, indigo, zinc, and amber name the component type in the sidebar, with step-11 text on a solid step-3 tint.
