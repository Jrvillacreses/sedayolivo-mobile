# Accessibility Patterns Guide

Comprehensive accessibility implementation patterns for WCAG 2.1/2.2 AA compliance.

---

## Table of Contents

1. [Semantic HTML Patterns](#semantic-html-patterns)
2. [Keyboard Navigation](#keyboard-navigation)
3. [Focus Management](#focus-management)
4. [Screen Reader Patterns](#screen-reader-patterns)
5. [Color & Contrast](#color--contrast)
6. [Form Accessibility](#form-accessibility)
7. [Interactive Components](#interactive-components)
8. [Media Accessibility](#media-accessibility)
9. [Motion & Animation](#motion--animation)
10. [Testing Checklist](#testing-checklist)

---

## Semantic HTML Patterns

### Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title - Site Name</title>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <header role="banner">
    <nav aria-label="Main">
      <!-- Primary navigation -->
    </nav>
  </header>
  
  <main id="main-content" tabindex="-1">
    <h1>Page Title</h1>
    <!-- Main content -->
  </main>
  
  <aside aria-label="Related content">
    <!-- Sidebar content -->
  </aside>
  
  <footer role="contentinfo">
    <!-- Footer content -->
  </footer>
</body>
</html>
```

### Heading Hierarchy

```
✅ CORRECT                    ❌ INCORRECT
─────────────────────────────────────────────
<h1>Page Title</h1>           <h1>Title</h1>
  <h2>Section</h2>              <h3>Section</h3>  ← Skipped h2
    <h3>Subsection</h3>           <h5>Sub</h5>    ← Skipped h4
  <h2>Another Section</h2>      <h2>Section</h2>
    <h3>Subsection</h3>       <h1>Another</h1>    ← Multiple h1s
```

### Landmark Regions

| Element | Role | Purpose |
|---------|------|---------|
| `<header>` | banner | Site header (should be direct child of body) |
| `<nav>` | navigation | Navigation links |
| `<main>` | main | Primary content (one per page) |
| `<aside>` | complementary | Supporting content |
| `<footer>` | contentinfo | Site footer (direct child of body) |
| `<section>` | region | Thematic grouping (needs accessible name) |
| `<form>` | form | Data collection (needs accessible name) |

### When to Use ARIA

```
┌─────────────────────────────────────────────────────────────┐
│  RULE: Use semantic HTML first. ARIA is a last resort.     │
└─────────────────────────────────────────────────────────────┘

✅ <button>Click me</button>
❌ <div role="button" tabindex="0">Click me</div>

✅ <nav aria-label="Main">...</nav>
✅ <input type="checkbox" id="agree">
❌ <div role="checkbox" aria-checked="false">...</div>

Use ARIA when:
- Native HTML doesn't support the pattern (tabs, menus, trees)
- You need to add extra context (aria-label, aria-describedby)
- Dynamic content changes (aria-live, aria-expanded)
```

---

## Keyboard Navigation

### Essential Keys

| Key | Function |
|-----|----------|
| Tab | Move to next focusable element |
| Shift + Tab | Move to previous focusable element |
| Enter | Activate button/link |
| Space | Activate button, toggle checkbox |
| Arrow keys | Navigate within a widget (menus, tabs, radios) |
| Escape | Close modal, cancel action |
| Home/End | Jump to first/last item in list |

### Focus Order

```
Tab order should match visual reading order:

┌─────────────────────────────────────────────────────────────┐
│  [1. Logo]  [2. Nav]  [3. Nav]  [4. Nav]  [5. Search]  [6. CTA] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [7. Main Heading]                                         │
│                                                             │
│  [8. Link] content [9. Link] content                       │
│                                                             │
│  [10. Button]                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

❌ Never use tabindex > 0 (disrupts natural order)
✅ Use tabindex="0" to add element to tab order
✅ Use tabindex="-1" for programmatic focus only
```

### Arrow Key Navigation Pattern

```javascript
// For composite widgets (tabs, menus, listboxes)
function handleArrowNavigation(event, items, currentIndex) {
  let newIndex = currentIndex;
  
  switch (event.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      newIndex = (currentIndex + 1) % items.length;
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
      newIndex = (currentIndex - 1 + items.length) % items.length;
      break;
    case 'Home':
      newIndex = 0;
      break;
    case 'End':
      newIndex = items.length - 1;
      break;
  }
  
  // Update tabindex (-1 for all, 0 for active)
  items.forEach((item, i) => {
    item.tabIndex = i === newIndex ? 0 : -1;
  });
  
  items[newIndex].focus();
}
```

---

## Focus Management

### Visible Focus Indicators

```css
/* NEVER do this */
*:focus {
  outline: none; /* ❌ Removes all focus indicators */
}

/* DO this instead */
*:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* Custom focus styles */
.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-200);
}

/* High contrast mode support */
@media (forced-colors: active) {
  *:focus-visible {
    outline: 3px solid CanvasText;
  }
}
```

### Focus Trap Pattern

```javascript
// For modals, dialogs, and other trapped contexts
class FocusTrap {
  constructor(container) {
    this.container = container;
    this.focusableElements = this.getFocusableElements();
    this.firstFocusable = this.focusableElements[0];
    this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
  }
  
  getFocusableElements() {
    const selector = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');
    
    return Array.from(this.container.querySelectorAll(selector));
  }
  
  handleKeydown = (event) => {
    if (event.key !== 'Tab') return;
    
    if (event.shiftKey) {
      if (document.activeElement === this.firstFocusable) {
        event.preventDefault();
        this.lastFocusable.focus();
      }
    } else {
      if (document.activeElement === this.lastFocusable) {
        event.preventDefault();
        this.firstFocusable.focus();
      }
    }
  }
  
  activate() {
    document.addEventListener('keydown', this.handleKeydown);
    this.firstFocusable?.focus();
  }
  
  deactivate() {
    document.removeEventListener('keydown', this.handleKeydown);
  }
}
```

### Focus Return Pattern

```javascript
// Remember and return focus after modal closes
let previouslyFocusedElement = null;

function openModal(modal) {
  previouslyFocusedElement = document.activeElement;
  modal.classList.add('is-open');
  modal.querySelector('[data-autofocus]')?.focus();
}

function closeModal(modal) {
  modal.classList.remove('is-open');
  previouslyFocusedElement?.focus();
  previouslyFocusedElement = null;
}
```

---

## Screen Reader Patterns

### Text Alternatives

```html
<!-- Informative images -->
<img src="chart.png" alt="Bar chart showing 40% increase in Q4 sales">

<!-- Decorative images -->
<img src="decorative-line.png" alt="" role="presentation">

<!-- Complex images with long description -->
<figure>
  <img src="complex-diagram.png" alt="System architecture diagram" aria-describedby="diagram-desc">
  <figcaption id="diagram-desc">
    The system consists of three main components: the API gateway handles...
  </figcaption>
</figure>

<!-- Icon buttons -->
<button aria-label="Close dialog">
  <svg aria-hidden="true"><!-- X icon --></svg>
</button>

<!-- Icon with visible text -->
<button>
  <svg aria-hidden="true"><!-- Save icon --></svg>
  <span>Save</span>
</button>
```

### Live Regions

```html
<!-- Polite: Queued announcements (status updates) -->
<div role="status" aria-live="polite" aria-atomic="true">
  Changes saved successfully.
</div>

<!-- Assertive: Immediate announcements (errors, alerts) -->
<div role="alert" aria-live="assertive">
  Session expiring in 2 minutes.
</div>

<!-- Log: Sequential additions (chat, logs) -->
<div role="log" aria-live="polite">
  <p>User joined: John</p>
  <p>User left: Jane</p>
</div>

<!-- Timer: Countdown/timer updates -->
<div role="timer" aria-live="off" aria-atomic="true">
  Time remaining: 5:00
</div>
```

### Screen Reader Only Text

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focusable variant (for skip links) */
.sr-only-focusable:focus,
.sr-only-focusable:active {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### Accessible Names

```html
<!-- aria-label: Short labels for simple elements -->
<button aria-label="Close">×</button>

<!-- aria-labelledby: Reference visible text -->
<dialog aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Delete</h2>
</dialog>

<!-- aria-describedby: Additional description -->
<input 
  type="password" 
  aria-label="Password"
  aria-describedby="password-requirements"
>
<p id="password-requirements">
  Must be at least 8 characters with one number.
</p>
```

---

## Color & Contrast

### Contrast Requirements

| Content Type | WCAG AA | WCAG AAA |
|--------------|---------|----------|
| Normal text (< 18px) | 4.5:1 | 7:1 |
| Large text (≥ 18px or 14px bold) | 3:1 | 4.5:1 |
| UI components, graphics | 3:1 | 3:1 |
| Focus indicators | 3:1 | 3:1 |

### Color Independence

```html
<!-- ❌ Color alone conveys meaning -->
<span class="text-red">Required field</span>

<!-- ✅ Color + text -->
<span class="text-red">
  <svg aria-hidden="true"><!-- asterisk --></svg>
  Required field
</span>

<!-- ❌ Color-only error state -->
<input class="border-red" type="text">

<!-- ✅ Color + icon + text -->
<input class="border-red" type="text" aria-invalid="true" aria-describedby="error">
<p id="error" class="text-red">
  <svg aria-hidden="true"><!-- error icon --></svg>
  This field is required
</p>
```

### Link Distinction

```css
/* Links must be distinguishable from surrounding text */

/* Method 1: Underline */
a {
  text-decoration: underline;
}

/* Method 2: Color + non-color indicator on hover/focus */
a {
  color: var(--color-link);
  text-decoration: none;
}

a:hover,
a:focus {
  text-decoration: underline;
}
```

---

## Form Accessibility

### Label Association

```html
<!-- Explicit label (preferred) -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email">

<!-- Implicit label -->
<label>
  Email Address
  <input type="email" name="email">
</label>

<!-- For complex cases, use aria-labelledby -->
<div id="group-label">Shipping Address</div>
<div role="group" aria-labelledby="group-label">
  <label for="street">Street</label>
  <input type="text" id="street">
  <!-- more fields -->
</div>
```

### Error Handling

```html
<div class="form-field">
  <label for="email">Email Address</label>
  
  <input 
    type="email" 
    id="email"
    aria-required="true"
    aria-invalid="true"
    aria-describedby="email-error email-hint"
  >
  
  <p id="email-hint" class="hint">We'll send confirmation here.</p>
  <p id="email-error" class="error" role="alert">
    Please enter a valid email address.
  </p>
</div>
```

### Form Validation Pattern

```javascript
function validateField(input, errorElement) {
  const isValid = input.checkValidity();
  
  input.setAttribute('aria-invalid', !isValid);
  
  if (!isValid) {
    errorElement.textContent = input.validationMessage;
    errorElement.removeAttribute('hidden');
  } else {
    errorElement.setAttribute('hidden', '');
  }
  
  return isValid;
}

// Announce errors to screen readers
function announceError(message) {
  const liveRegion = document.getElementById('form-errors');
  liveRegion.textContent = message;
}
```

### Autocomplete

```html
<!-- Always use autocomplete for common fields -->
<input type="text" name="name" autocomplete="name">
<input type="email" name="email" autocomplete="email">
<input type="tel" name="phone" autocomplete="tel">
<input type="text" name="address" autocomplete="street-address">
<input type="text" name="city" autocomplete="address-level2">
<input type="text" name="zip" autocomplete="postal-code">
<input type="text" name="cc-number" autocomplete="cc-number">
<input type="password" name="password" autocomplete="current-password">
<input type="password" name="new-password" autocomplete="new-password">
```

---

## Interactive Components

### Tab Panel Pattern

```html
<div class="tabs">
  <div role="tablist" aria-label="Programming languages">
    <button 
      role="tab" 
      id="tab-js" 
      aria-controls="panel-js"
      aria-selected="true"
      tabindex="0"
    >
      JavaScript
    </button>
    <button 
      role="tab" 
      id="tab-py" 
      aria-controls="panel-py"
      aria-selected="false"
      tabindex="-1"
    >
      Python
    </button>
    <button 
      role="tab" 
      id="tab-rb" 
      aria-controls="panel-rb"
      aria-selected="false"
      tabindex="-1"
    >
      Ruby
    </button>
  </div>
  
  <div 
    role="tabpanel" 
    id="panel-js" 
    aria-labelledby="tab-js"
    tabindex="0"
  >
    JavaScript content...
  </div>
  
  <div 
    role="tabpanel" 
    id="panel-py" 
    aria-labelledby="tab-py"
    tabindex="0"
    hidden
  >
    Python content...
  </div>
  
  <div 
    role="tabpanel" 
    id="panel-rb" 
    aria-labelledby="tab-rb"
    tabindex="0"
    hidden
  >
    Ruby content...
  </div>
</div>
```

### Accordion Pattern

```html
<div class="accordion">
  <h3>
    <button 
      aria-expanded="true" 
      aria-controls="section1"
      id="accordion-header-1"
    >
      Section 1
      <svg aria-hidden="true"><!-- chevron --></svg>
    </button>
  </h3>
  <div 
    id="section1" 
    role="region" 
    aria-labelledby="accordion-header-1"
  >
    Section 1 content...
  </div>
  
  <h3>
    <button 
      aria-expanded="false" 
      aria-controls="section2"
      id="accordion-header-2"
    >
      Section 2
      <svg aria-hidden="true"><!-- chevron --></svg>
    </button>
  </h3>
  <div 
    id="section2" 
    role="region" 
    aria-labelledby="accordion-header-2"
    hidden
  >
    Section 2 content...
  </div>
</div>
```

### Menu Pattern

```html
<div class="dropdown">
  <button 
    aria-haspopup="true" 
    aria-expanded="false"
    aria-controls="dropdown-menu"
  >
    Options
    <svg aria-hidden="true"><!-- chevron --></svg>
  </button>
  
  <ul 
    id="dropdown-menu" 
    role="menu" 
    aria-label="Options"
    hidden
  >
    <li role="none">
      <button role="menuitem" tabindex="-1">Edit</button>
    </li>
    <li role="none">
      <button role="menuitem" tabindex="-1">Duplicate</button>
    </li>
    <li role="separator"></li>
    <li role="none">
      <button role="menuitem" tabindex="-1">Delete</button>
    </li>
  </ul>
</div>
```

### Tooltip Pattern

```html
<button aria-describedby="tooltip-1">
  <svg aria-label="Help"><!-- info icon --></svg>
</button>
<div id="tooltip-1" role="tooltip" hidden>
  Click here to get more information about this feature.
</div>
```

---

## Media Accessibility

### Video with Captions

```html
<figure>
  <video controls>
    <source src="video.mp4" type="video/mp4">
    <track 
      kind="captions" 
      src="captions.vtt" 
      srclang="en" 
      label="English"
      default
    >
    <track 
      kind="descriptions" 
      src="descriptions.vtt" 
      srclang="en" 
      label="English Audio Description"
    >
    <!-- Fallback -->
    <p>Your browser doesn't support video. <a href="video.mp4">Download</a></p>
  </video>
  <figcaption>Video title and description</figcaption>
</figure>
```

### Audio with Transcript

```html
<figure>
  <figcaption>Podcast Episode 42: Topic Name</figcaption>
  <audio controls>
    <source src="podcast.mp3" type="audio/mpeg">
  </audio>
  <details>
    <summary>View transcript</summary>
    <div class="transcript">
      <!-- Full transcript text -->
    </div>
  </details>
</figure>
```

### Image Carousel

```html
<section aria-label="Product images" aria-roledescription="carousel">
  <div aria-live="polite" aria-atomic="true">
    <p class="sr-only">Image 1 of 5</p>
  </div>
  
  <div class="carousel-viewport">
    <ul class="carousel-slides" aria-label="Slides">
      <li role="group" aria-roledescription="slide" aria-label="1 of 5">
        <img src="product-1.jpg" alt="Product front view">
      </li>
      <!-- more slides -->
    </ul>
  </div>
  
  <button aria-label="Previous slide" disabled>
    <svg aria-hidden="true"><!-- prev icon --></svg>
  </button>
  <button aria-label="Next slide">
    <svg aria-hidden="true"><!-- next icon --></svg>
  </button>
  
  <div role="tablist" aria-label="Slide controls">
    <button role="tab" aria-selected="true" aria-label="Slide 1"></button>
    <button role="tab" aria-selected="false" aria-label="Slide 2"></button>
    <!-- more tabs -->
  </div>
</section>
```

---

## Motion & Animation

### Reduced Motion

```css
/* Base animations */
.animated-element {
  transition: transform 0.3s ease-out;
  animation: fadeIn 0.5s ease-out;
}

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Alternative: Provide reduced versions */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    transition: none;
    animation: none;
    opacity: 1; /* Ensure element is visible */
  }
}
```

### Safe Animation Practices

```css
/* ✅ Safe: transform and opacity only */
.card:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}

/* ⚠️ Caution: Can cause motion sickness */
.parallax {
  /* Check prefers-reduced-motion first */
}

/* ❌ Avoid: Autoplay animations without control */
.infinite-animation {
  animation: spin 1s infinite; /* Provide pause control */
}

/* ✅ Better: Provide animation controls */
.animation-container:has([aria-pressed="true"]) .animated {
  animation-play-state: paused;
}
```

### Autoplay Media

```html
<!-- Video autoplay with controls -->
<video 
  autoplay 
  muted 
  loop 
  playsinline
  aria-label="Decorative background video"
>
  <source src="bg-video.mp4" type="video/mp4">
</video>

<!-- Provide pause control -->
<button 
  class="video-control" 
  aria-pressed="false"
  aria-label="Pause video"
>
  <svg aria-hidden="true"><!-- pause icon --></svg>
</button>
```

---

## Testing Checklist

### Automated Testing

| Tool | What It Tests |
|------|---------------|
| axe-core | WCAG violations, best practices |
| Lighthouse | A11y score, common issues |
| WAVE | Visual a11y indicators |
| pa11y | CI/CD integration |

### Manual Testing

| Test | Method |
|------|--------|
| Keyboard only | Navigate entire site without mouse |
| Screen reader | Test with NVDA, VoiceOver, or JAWS |
| Zoom 200% | Ensure content reflows properly |
| High contrast | Test with Windows High Contrast mode |
| Reduced motion | Enable preference, verify behavior |

### Testing Checklist

```markdown
## Keyboard
- [ ] All interactive elements focusable
- [ ] Tab order is logical
- [ ] Focus visible at all times
- [ ] No keyboard traps
- [ ] Skip link works

## Screen Reader
- [ ] All images have appropriate alt text
- [ ] Headings create logical outline
- [ ] Links make sense out of context
- [ ] Form fields properly labeled
- [ ] Errors announced immediately
- [ ] Dynamic content announced

## Visual
- [ ] Color contrast passes (4.5:1 text, 3:1 UI)
- [ ] No information conveyed by color alone
- [ ] Content readable at 200% zoom
- [ ] Text resizable without loss
- [ ] Focus indicators visible

## Motion
- [ ] Animations respect prefers-reduced-motion
- [ ] No flashing content (3 flashes/sec max)
- [ ] Autoplay media can be paused

## Forms
- [ ] All fields have labels
- [ ] Errors clearly described
- [ ] Required fields indicated
- [ ] Autocomplete enabled where appropriate
```

### Common Screen Reader Commands

| Action | NVDA | VoiceOver (Mac) |
|--------|------|-----------------|
| Start reading | NVDA + ↓ | VO + A |
| Stop reading | Ctrl | Ctrl |
| Headings list | NVDA + F7 | VO + U |
| Next heading | H | VO + Cmd + H |
| Landmarks | D | VO + U (then arrows) |
| Forms mode | Enter on field | Auto |
| Exit forms | Escape | Escape |

---

*Keep this guide updated as WCAG guidelines evolve.*
