# TeaPlace Portfolio Redesign

## Overview

Transform the existing TeaPlace tea brand landing page into a portfolio-worthy showcase demonstrating modern CSS mastery, interaction design, and elevated visual aesthetics.

**Direction:** Elevated Minimal with Interactive Storytelling
**Stack:** Vanilla HTML5, CSS3 (modern features), ES6+ JavaScript — no frameworks
**Goal:** Demonstrate deep CSS knowledge and frontend fundamentals

---

## Technical Architecture

### Modern CSS Features

- `scroll-timeline` for scroll-driven animations (no JS)
- CSS `@property` for animatable custom properties
- Container queries for responsive components
- `backdrop-filter` for glassmorphism effects
- CSS-only lightbox using `:target` selector

### Color System

```css
:root {
  /* Sage greens */
  --sage-50:  #f6f7f6;   /* backgrounds */
  --sage-100: #e8ebe9;   /* subtle borders */
  --sage-500: #4a5d4f;   /* primary */
  --sage-700: #3a4a3e;   /* hover states */
  --sage-900: #1a2a1e;   /* text on light */

  /* Gold accents */
  --gold-400: #d4af37;   /* accent */
  --gold-500: #b8962e;   /* hover */

  /* Neutrals */
  --cream:    #faf9f7;   /* warm white */
  --charcoal: #1c1c1c;   /* footer, dark sections */
}
```

### Typography

- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)
- **Scale:** 1.25 modular ratio

---

## Section 1: Hero with Kinetic Typography

### Layout
- Full viewport height (100vh)
- Split composition: 60% content left, 40% imagery right
- Gradient overlay for text contrast

### Kinetic Animation Sequence
1. "The Art of" — fades up (0.3s)
2. "Mindful" — letters stagger with rotation, gold color (0.5s)
3. "Tea" — slides from right (0.3s)
4. Subtle floating loop animation after load

### Elements
- "Est. 2024" with self-drawing horizontal line
- Tagline fade-up after headline
- Two CTAs: "Explore Collection" (filled) + "Our Story" (outline)
- Animated scroll indicator at bottom

### Mobile
- Stacks vertically: image (50vh) above content
- Buttons stack full-width

---

## Section 2: Scroll-Driven Tea Journey

### Concept
Vertical scroll triggers horizontal-feeling narrative. Four stages reveal the tea's journey from leaf to cup.

### The Four Stages

1. **Origin** — "Grown in the misty highlands of Kyoto"
   - Parallax background, fade from left

2. **Harvest** — "Hand-picked at dawn, when leaves hold morning dew"
   - Counter-scroll depth effect

3. **Craft** — "Steamed, rolled, and dried using 400-year-old methods"
   - Scale-up entrance animation

4. **Ritual** — "Your moment of calm, intentionally brewed"
   - Centers and becomes static

### Technical
- CSS `scroll-timeline` drives all animations
- Sticky positioning for each stage
- Progress dots indicator on side
- Total scroll: ~300vh

### Visual
- Large typography overlays with blend modes
- Muted, desaturated imagery
- Subtle grain texture overlay

---

## Section 3: Product Showcase

### Layout
- "Signature Blends" header with animated underline
- 3-column grid (desktop), 2 (tablet), 1 (mobile)
- Generous whitespace

### Card Design
- White background, layered shadows
- 60% image / 40% info split
- Name, description, price
- Add-to-cart icon on hover

### Hover Interactions
- **3D Tilt:** CSS `perspective` + `rotateX/Y` toward cursor
- **Image Zoom:** 1.05x scale
- **Shadow Lift:** Deeper shadow, appears elevated
- **Quick-view Hint:** "View Details" fades in

### Products (6 total)
1. Emerald Sencha — green, bestseller tag
2. Midnight Earl Grey — black
3. Jasmine Pearls — white, premium
4. Golden Oolong — oolong, new tag
5. Ceremonial Matcha — matcha
6. Chamomile Dreams — herbal

---

## Section 4: Our Philosophy

### Layout
- 50/50 split: image left, text right
- Gold vertical line separator (desktop)
- Stacks on mobile

### Content
```
Label: "OUR PHILOSOPHY"
Headline: "Slow Down. Sip Intentionally."
Body: "In a world of instant everything, we believe in the power
of pause. Each blend is an invitation to be present..."
Stats: "12 Countries" · "40+ Farmers" · "Zero Waste"
```

### Animations
- Image parallax (slower than scroll)
- Text reveals in sequence via `animation-timeline: view()`
- Stats count up from 0

---

## Section 5: Image Grid

### Layout
- CSS Grid masonry (with fallback)
- 4 columns desktop, 2 tablet, 1 mobile
- 8-12 lifestyle images

### Image Content
- Steam rising from cup
- Hands warming around mug
- Tea leaves in ceramic dish
- Cozy reading nook
- Aerial tea set arrangement
- Nature scene with tea
- Friends sharing tea
- Minimalist flat-lay

### Interactions
- Hover: Slight desaturation, 1.03x zoom
- Click: CSS `:target` lightbox
- Dark backdrop, centered image, X close

### Header
- "Moments of Calm" — gold accent on "Calm"

---

## Section 6: Brewing Guide

### Layout
- Horizontal stepper (desktop)
- Vertical accordion (mobile)
- Line-art icons in sage green

### The Five Steps

1. **Measure** — "2g per 8oz"
   - Scale icon, tips side to side

2. **Heat** — "175°F green, 212°F black"
   - Kettle icon, steam floats up

3. **Steep** — "3-5 minutes"
   - Timer icon, flows/counts

4. **Pour** — "Strain and serve"
   - Teapot icon, liquid streams

5. **Savor** — "Breathe in first"
   - Cup icon, gentle pulse

### Interactions
- Scroll-triggered animations
- Hover enlarges, plays animation
- Gold underline on active step

---

## Section 7: Newsletter Signup

### Layout
- Full-width sage-900 background
- Centered, max-width 600px

### Content
```
Headline: "Join the Ritual"
Subtext: "Weekly tips, new arrivals, 10% off first order."
[Email] [Subscribe]
"No spam. Unsubscribe anytime."
```

### Micro-interactions
- Input: Gold glow on focus, subtle expand
- Button: Background slides from left on hover
- Submit: Checkmark + "You're in!" on `:valid`
- Error: Shake animation on invalid

---

## Section 8: Footer

### Layout
- Charcoal background (#1c1c1c)
- Three columns: Brand / Links / Contact

### Content
- Logo + tagline
- Nav links: Shop, About, Journal, Contact
- Social: Instagram, Pinterest, Twitter (line icons)
- "© 2024 TeaPlace. Crafted with intention."

### Details
- Underline slides from left on hover
- Social icons scale + gold shift
- "Back to top" arrow appears after scroll

---

## Image Requirements

### Hero
- High-quality tea ceremony or leaf close-up
- Warm, natural lighting
- Landscape orientation

### Tea Journey (4 images)
- Misty tea plantation
- Hands picking leaves
- Traditional processing
- Steaming cup, peaceful setting

### Products (6 images)
- Consistent style, clean backgrounds
- Overhead or 3/4 angle
- Show tea color/texture

### Lifestyle Grid (8-12 images)
- Mix of orientations
- Warm, aspirational mood
- Natural lighting preferred

### Philosophy
- Tea ceremony or craftsperson
- Moody, atmospheric

**Sources:** Unsplash, Pexels (free, commercial use)

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Update CSS custom properties (new color system)
- [ ] Refine typography scale
- [ ] Add CSS reset improvements

### Phase 2: Hero Redesign
- [ ] Implement kinetic typography
- [ ] Add scroll indicator
- [ ] Source/add hero image

### Phase 3: Tea Journey Section
- [ ] Build scroll-driven animation structure
- [ ] Create four journey stages
- [ ] Add parallax effects
- [ ] Source journey images

### Phase 4: Product Cards
- [ ] Redesign card layout
- [ ] Implement 3D tilt effect
- [ ] Add hover interactions
- [ ] Expand to 6 products
- [ ] Source product images

### Phase 5: Philosophy Section
- [ ] Build split-screen layout
- [ ] Add scroll reveal animations
- [ ] Implement stat counters
- [ ] Source philosophy image

### Phase 6: Image Grid
- [ ] Build masonry grid
- [ ] Implement CSS lightbox
- [ ] Source lifestyle images

### Phase 7: Brewing Guide
- [ ] Create step icons (SVG)
- [ ] Build stepper layout
- [ ] Add step animations

### Phase 8: Newsletter & Footer
- [ ] Newsletter with micro-interactions
- [ ] Refined footer
- [ ] Back-to-top functionality

### Phase 9: Polish
- [ ] Mobile responsive testing
- [ ] Performance optimization
- [ ] Browser fallbacks
- [ ] Final image optimization

---

## Success Criteria

- [ ] Loads under 3 seconds
- [ ] Smooth 60fps animations
- [ ] Works without JavaScript (core content)
- [ ] Accessible (keyboard nav, screen readers)
- [ ] Responsive across all breakpoints
- [ ] No framework dependencies
