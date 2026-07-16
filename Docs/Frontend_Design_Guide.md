# Frontend Design Guide — SubTracker

A plain-English walkthrough of how the SubTracker UI was built, so you can
re-use the same tricks on any website. Written around three questions:

1. How the **moving gradient background** in the hero was made
2. How buttons get a **subtle shadow + color shift on hover**
3. A reusable **landing page structure** you can copy for any site

The stack: **React** + **Tailwind CSS v4**. Most "magic" is just a few lines of
plain CSS (keyframes) plus Tailwind utility classes. Nothing fancy underneath.

---

## Mental model first (read this once)

Two ideas power almost everything here:

- **Layers.** A section is a stack of layers: a background layer at the back,
  soft blurred color "blobs" floating above it, and your real content on top.
  Because the blobs sit *behind* the text, you can animate them freely and the
  text never moves.
- **Transitions vs. keyframes.**
  - A **transition** = "when something changes (like hover), glide to the new
    value over X ms." Used for buttons.
  - A **keyframe animation** = "loop through these poses forever." Used for the
    floating background blobs.

Keep those two straight and the rest is easy.

---

## 1. The moving gradient background (hero section)

The cool moving effect is **not** one animated gradient. It's **3 soft, blurry
colored circles ("blobs")** drifting slowly behind the content, plus a static
pastel gradient tint on the page. Your eye reads the blur + slow drift as a
"living" gradient.

### Step A — define the drifting motion (CSS keyframes)

In [`src/index.css`](../frontend/src/index.css):

```css
@keyframes blob {
  0%,   100% { transform: translate(0, 0)      scale(1);    }
  33%        { transform: translate(24px, -18px) scale(1.08); }
  66%        { transform: translate(-18px, 18px) scale(0.94); }
}

.animate-blob {
  animation: blob 14s ease-in-out infinite;
}
```

In simple terms:
- `@keyframes blob` = a list of "poses". At the start/end it's in its normal
  spot; a third of the way through it has slid up-right and grown slightly; two
  thirds through it has slid down-left and shrunk slightly.
- `translate(x, y)` moves it; `scale()` grows/shrinks it.
- `.animate-blob` plays that loop over **14 seconds**, `infinite` (forever),
  `ease-in-out` (soft start and stop so it feels floaty).

### Step B — draw the blobs and put content on top

In [`src/components/Landing.jsx`](../frontend/src/components/Landing.jsx), the
hero `<section>` is `relative` (so children can be positioned inside it). The
blobs are `absolute` (pulled out of the normal flow, floating), and the content
is `relative` (sits on top):

```jsx
<section className="relative overflow-hidden">
  {/* blobs — sit BEHIND everything, ignore clicks */}
  <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96
                  rounded-full bg-sand-100/80 blur-3xl animate-blob" />
  <div className="pointer-events-none absolute top-10 right-0 h-96 w-96
                  rounded-full bg-brand-200/60 blur-3xl animate-blob"
       style={{ animationDelay: '3s' }} />
  <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80
                  rounded-full bg-sand-200/70 blur-3xl animate-blob"
       style={{ animationDelay: '6s' }} />

  {/* real content sits ON TOP */}
  <div className="relative ...">…headline, buttons…</div>
</section>
```

What each class does, in words:
- `absolute` + `-top-24 -left-24` → place the circle, partly off-screen, so only
  a soft edge of color bleeds in.
- `h-96 w-96 rounded-full` → a big circle.
- `bg-sand-100/80` → a palette color at **80% opacity** (the `/80`). Softer =
  more like light than a solid shape.
- `blur-3xl` → **this is the key line.** Heavy blur turns the hard circle into a
  cloud of color. Without it, you'd see obvious circles.
- `animate-blob` → apply the drifting loop from Step A.
- `pointer-events-none` → the blob can't be clicked, so it never blocks the
  buttons underneath.
- `overflow-hidden` on the parent → clips the parts that drift outside.
- `style={{ animationDelay: '3s' }}` → **the trick that makes it feel organic.**
  Each blob starts its loop at a different time, so they never move in sync.

### Step C — a static pastel tint under everything (`.mesh-bg`)

Behind the blobs, the page has a soft multi-color wash. It's several radial
gradients (circles of color that fade to transparent) layered in one property:

```css
.mesh-bg {
  background-color: #fbfdff;
  background-image:
    radial-gradient(at 0% 0%,  rgba(255,249,210,0.85) 0px, transparent 45%),
    radial-gradient(at 100% 4%, rgba(255,235,204,0.75) 0px, transparent 45%),
    radial-gradient(at 88% 100%, rgba(140,192,235,0.45) 0px, transparent 50%),
    radial-gradient(at 8% 92%,  rgba(191,221,240,0.50) 0px, transparent 50%);
}
```

- `radial-gradient(at 0% 0%, <color> 0px, transparent 45%)` = "start this color
  in the top-left corner and fade it to nothing by 45% across." Do that from
  four corners with the four palette colors and you get a gentle, even wash.

**Recipe to reuse anywhere:**
`relative + overflow-hidden` parent → a few `absolute rounded-full blur-3xl`
color blobs with `animate-blob` and staggered `animationDelay` → `relative`
content on top. Tune color, size, blur, and speed to taste.

### So where does the hero / whole-page background color actually come from?

A common point of confusion: **the hero section has no background color of its
own.** The color you see is really **two stacked layers**.

**Layer 1 — the whole-page background (`mesh-bg`).**
The root `<div>` of the landing page carries it —
[`Landing.jsx`](../frontend/src/components/Landing.jsx):

```jsx
<div className="min-h-screen mesh-bg text-slate-900">
```

That single `mesh-bg` class *is* the entire page background (the `.mesh-bg` rule
shown in Step C above: a `#fbfdff` base + four corner radial-gradients in the
palette colors). It covers every section from top to bottom.

**Layer 2 — the hero's extra glow (the animated blobs).**
The hero `<section>` itself is transparent — it's only
`relative overflow-hidden`, no background. So `mesh-bg` shows straight through
it. What makes the hero look *richer* than the rest of the page is the three
blurred `animate-blob` circles floating inside it (from Steps A & B).

```
   ┌─ hero <section> (transparent) ────────────────┐
   │   ● blob   ● blob   ● blob   ← Layer 2 glow    │
   │   Headline / buttons / visual (content on top) │
   └────────────────────────────────────────────────┘
   ↑ mesh-bg on the root div shows through everything ← Layer 1
```

Quick reference:

| What you see                              | Where it comes from                                             |
| ----------------------------------------- | --------------------------------------------------------------- |
| Background across the **whole page**      | `mesh-bg` class on the root div → base color + 4 radial gradients in `index.css` |
| The **hero's** brighter, moving glow      | 3 blurred `animate-blob` circles layered *on top of* `mesh-bg`  |
| The palette colors themselves             | `--color-brand-*` and `--color-sand-*` tokens in `index.css`    |

Takeaway: keep the base background on **one wrapping element** (here the root
div), then let individual sections stay transparent and add their own
decorations on top. One source of truth for the background, richer accents where
you want them.

---

## 2. Button hover: subtle shadow + color

All buttons share one base and then a variant adds color. This lives in the
`@layer components` block of [`src/index.css`](../frontend/src/index.css).

### The base (shared by every button)

```css
.btn, .btn-primary, .btn-ghost, .btn-outline {
  @apply inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5
    text-sm font-semibold transition-all duration-200 cursor-pointer
    focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400
    focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed;
}
```

The **one class that makes hover smooth** is `transition-all duration-200`:
> "If *any* property changes, don't snap — glide to the new value over 200ms."

So when hover changes the shadow/position/color, it eases in instead of popping.
(`@apply` just means "paste these Tailwind utility classes into my custom
class" so I can reuse `.btn-primary` everywhere instead of repeating 15 classes.)

### The primary (colored) variant

```css
.btn-primary {
  @apply text-white shadow-lg shadow-brand-600/25
    hover:shadow-xl hover:shadow-brand-600/30 hover:-translate-y-0.5
    active:translate-y-0;
  background-image: var(--brand-grad);   /* the blue gradient fill */
}
```

Read the hover behavior left to right:
- **Resting:** `shadow-lg shadow-brand-600/25` → a medium shadow tinted with the
  brand blue at 25% opacity. A *colored* shadow (not gray) is what makes it feel
  like the button is glowing in its own color.
- **On hover:**
  - `hover:shadow-xl` → shadow grows bigger (button feels like it lifted).
  - `hover:shadow-brand-600/30` → shadow gets slightly stronger (25% → 30%).
  - `hover:-translate-y-0.5` → the button physically moves up 2px. Combined with
    the bigger shadow, it reads as "lifting toward you."
- **On click:** `active:translate-y-0` → drops back down, so it feels pressed.

Because of `transition-all duration-200` on the base, all three changes animate
together smoothly.

### The pattern to copy

```
resting state:   colored shadow (shadow-<color>/25)
hover state:     bigger + slightly stronger shadow  + lift up (-translate-y-0.5)
pressed state:   translate back to 0
+ always:        transition-all duration-200 so it glides
```

The "ghost" button uses the same idea more subtly — on hover it just brightens
its background and border instead of lifting:

```css
.btn-ghost {
  @apply bg-white/70 text-slate-700 ring-1 ring-slate-200
    hover:bg-white hover:ring-slate-300 backdrop-blur;
}
```

Tip: a `ring` in Tailwind is an outline-like border that doesn't shift layout —
handy for borders that change on hover without nudging neighbors.

---

## 3. Reusable landing page structure

This is the skeleton the SubTracker landing page uses. It works for almost any
product/marketing site — swap the words and colors, keep the order. Each section
answers the next question a visitor has as they scroll.

```
┌─────────────────────────────────────────────────────────┐
│ 1. HEADER (sticky)     logo · nav links · Login / CTA    │  "What is this + how do I start?"
├─────────────────────────────────────────────────────────┤
│ 2. HERO                headline · subtext · 2 buttons ·   │  "Should I care?" (the hook)
│                        trust row · product visual         │
├─────────────────────────────────────────────────────────┤
│ 3. STATS / SOCIAL PROOF   3–4 big numbers                 │  "Do others trust it?"
├─────────────────────────────────────────────────────────┤
│ 4. FEATURES            grid of 3–6 cards (icon+title+desc)│  "What do I actually get?"
├─────────────────────────────────────────────────────────┤
│ 5. HOW IT WORKS        3 numbered steps                   │  "Is it easy to start?"
├─────────────────────────────────────────────────────────┤
│ 6. PRICING             2–3 plan cards, one highlighted    │  "What does it cost?"
├─────────────────────────────────────────────────────────┤
│ 7. CTA BANNER          one big final push + button        │  "OK, where do I click?"
├─────────────────────────────────────────────────────────┤
│ 8. FOOTER              logo · links · copyright           │  "Anything else / legal"
└─────────────────────────────────────────────────────────┘
```

### What each section should contain

**1. Header (sticky)** — `sticky top-0 z-50`, semi-transparent + blurred
(`glass`) so content scrolls under it nicely.
- Left: logo. Middle: anchor links (`#features`, `#pricing`). Right: a low-key
  "Login" and a strong primary CTA.
- Include a hamburger menu for mobile that toggles a dropdown.

**2. Hero** — the most important block. Two columns on desktop, stacked on mobile.
- A small pill/badge ("✨ one-line promise").
- One **big bold headline** (put the key word in a colored/gradient span).
- 1–2 sentences of subtext explaining the value.
- **Two buttons:** one primary ("Get started"), one secondary ("I already have
  an account").
- A **trust row:** avatars + a rating or "loved by…" line.
- A **visual** on the other side (a screenshot or, here, a fake mini-dashboard
  card) — show the product, don't just describe it.

**3. Stats strip** — 3–4 impressive numbers with one-line labels. Fast credibility.

**4. Features** — a responsive grid (`sm:grid-cols-2 lg:grid-cols-3`). Each card:
icon in a colored tile + short title + 1–2 line description. 6 is a good number.

**5. How it works** — 3 numbered steps (01 / 02 / 03). Reduces "is this hard?"
anxiety. Keep each step to a title + one sentence.

**6. Pricing** — 2–3 cards side by side. **Highlight the recommended one** with a
ring + a "Popular" badge so the eye knows where to land. List benefits with
checkmarks.

**7. CTA banner** — a full-width colored/gradient block, big heading, one button.
The last nudge for anyone who scrolled the whole way.

**8. Footer** — logo, a few links, copyright. Quiet and simple.

### Layout rules that keep it clean

- **One max-width wrapper** repeated on every section so content lines up:
  `mx-auto max-w-7xl px-5 sm:px-8`.
- **Consistent vertical rhythm:** each section uses similar padding
  (`py-20`) so spacing feels even.
- **Mobile first:** write the stacked/1-column layout, then add `sm:` / `lg:`
  prefixes to rearrange on bigger screens (e.g. `lg:grid-cols-2`).
- **Alternate backgrounds** (white vs. tinted) between sections so they visually
  separate without hard lines.
- **Section headers** follow one mini-pattern: a small uppercase label + a big
  `h2` + one line of subtext, centered.

---

## Cheat-sheet: the reusable pieces

| I want…                        | Use…                                                            |
| ------------------------------ | --------------------------------------------------------------- |
| A floating background glow     | `absolute rounded-full blur-3xl bg-<color>/70 animate-blob` + staggered `animationDelay` |
| Smooth hover on anything       | `transition-all duration-200` on the element                    |
| A button that "lifts" on hover | `hover:-translate-y-0.5 hover:shadow-xl` + a colored shadow     |
| A colored glow shadow          | `shadow-lg shadow-<color>/25` (use `/opacity`, not gray)        |
| Content on top of decorations  | parent `relative overflow-hidden`, blobs `absolute`, content `relative` |
| A soft entrance                | a `fade-up` keyframe (opacity 0→1 + slide up) via `.animate-fade-up` |
| Reuse a bundle of classes      | Tailwind `@apply` inside a custom class in `@layer components`   |
| Borders that don't shift layout| `ring-1 ring-<color>` instead of `border`                       |

Everything above lives in two files worth studying:
- [`src/index.css`](../frontend/src/index.css) — the design tokens, button
  classes, `.mesh-bg`, and the keyframes.
- [`src/components/Landing.jsx`](../frontend/src/components/Landing.jsx) — the
  full section-by-section structure in action.
