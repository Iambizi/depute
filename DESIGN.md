# depute visual system

Geist is intentional. The pixel wordmark is drawn from the same family, and the components are meant to sit in a Vercel-style product. Do not swap the sans. Use Geist Mono for amounts, hashes, and IDs, and the pixel wordmark only for the name.

## Rails

A 2px inset rail encodes risk, and only on ApprovalGate, DelegationGate, and BindingApproval. It is always paired with a text status. It is inset, so a card radius above 6px does not clip a painted left border. Other cards stay hairline, with no side stripe.

## Motion

Status dots pulse only while an agent is running or working. Other pulses run at most three times. The approval stamp eases out (`cubic-bezier(0.22, 1, 0.36, 1)`) and does not overshoot.

## Color

One ink accent, plus status pairs of step-11 text on step-3 tint. Both themes stay at or above 4.5:1. The site uses the same gray-11 muted text. No indigo badges, glow halos, or glass panels.
