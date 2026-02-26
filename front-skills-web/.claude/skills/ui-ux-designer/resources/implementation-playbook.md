# UI/UX Implementation Playbook

Comprehensive guide with detailed implementation examples, patterns, and code snippets for UI/UX design work.

---

## Table of Contents

1. [Design System Implementation](#design-system-implementation)
2. [Component Patterns](#component-patterns)
3. [Accessibility Patterns](#accessibility-patterns)
4. [User Research Templates](#user-research-templates)
5. [Design Token Implementation](#design-token-implementation)
6. [Responsive Design Patterns](#responsive-design-patterns)
7. [Animation & Interaction](#animation--interaction)
8. [Form Design Patterns](#form-design-patterns)
9. [Navigation Patterns](#navigation-patterns)
10. [Data Visualization](#data-visualization)

---

## Design System Implementation

### Atomic Design Hierarchy

```
ATOMS          MOLECULES        ORGANISMS         TEMPLATES      PAGES
─────────────────────────────────────────────────────────────────────
Button         Search Bar       Header            Home Layout    Homepage
Input          Form Field       Footer            Blog Layout    Blog Post
Label          Card             Navigation        Dashboard      Settings
Icon           Menu Item        Hero Section      Profile        Profile
Avatar         List Item        Sidebar           Checkout       Cart
Badge          Breadcrumb       Feature Grid      Article        Article
```

### Design Token Structure (CSS Custom Properties)

```css
/* ==========================================================================
   DESIGN TOKENS - Foundation Layer
   ========================================================================== */

:root {
  /* ========== COLORS ========== */
  
  /* Brand Colors */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  --color-primary-950: #172554;
  
  /* Semantic Colors */
  --color-success: #10b981;
  --color-success-light: #d1fae5;
  --color-success-dark: #065f46;
  
  --color-warning: #f59e0b;
  --color-warning-light: #fef3c7;
  --color-warning-dark: #92400e;
  
  --color-error: #ef4444;
  --color-error-light: #fee2e2;
  --color-error-dark: #991b1b;
  
  --color-info: #3b82f6;
  --color-info-light: #dbeafe;
  --color-info-dark: #1e40af;
  
  /* Background Colors */
  --color-background-primary: #ffffff;
  --color-background-secondary: #f8fafc;
  --color-background-tertiary: #f1f5f9;
  --color-background-inverse: #0f172a;
  
  /* Text Colors */
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-tertiary: #94a3b8;
  --color-text-inverse: #f8fafc;
  --color-text-disabled: #cbd5e1;
  
  /* Border Colors */
  --color-border-default: #e2e8f0;
  --color-border-strong: #cbd5e1;
  --color-border-focus: #3b82f6;
  --color-border-error: #ef4444;
  
  /* ========== SPACING ========== */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  
  /* ========== TYPOGRAPHY ========== */
  
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-serif: 'Merriweather', Georgia, serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */
  --text-6xl: 3.75rem;    /* 60px */
  
  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  
  /* ========== BORDERS ========== */
  --radius-none: 0;
  --radius-sm: 0.125rem;  /* 2px */
  --radius-md: 0.375rem;  /* 6px */
  --radius-lg: 0.5rem;    /* 8px */
  --radius-xl: 0.75rem;   /* 12px */
  --radius-2xl: 1rem;     /* 16px */
  --radius-3xl: 1.5rem;   /* 24px */
  --radius-full: 9999px;
  
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 4px;
  
  /* ========== SHADOWS ========== */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  
  /* ========== ANIMATIONS ========== */
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  /* ========== Z-INDEX ========== */
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-fixed: 30;
  --z-modal-backdrop: 40;
  --z-modal: 50;
  --z-popover: 60;
  --z-tooltip: 70;
  --z-toast: 80;
  
  /* ========== BREAKPOINTS (for reference) ========== */
  /* --breakpoint-sm: 640px;  */
  /* --breakpoint-md: 768px;  */
  /* --breakpoint-lg: 1024px; */
  /* --breakpoint-xl: 1280px; */
  /* --breakpoint-2xl: 1536px; */
}

/* ========== DARK MODE TOKENS ========== */
[data-theme="dark"],
.dark {
  --color-background-primary: #0f172a;
  --color-background-secondary: #1e293b;
  --color-background-tertiary: #334155;
  --color-background-inverse: #f8fafc;
  
  --color-text-primary: #f8fafc;
  --color-text-secondary: #cbd5e1;
  --color-text-tertiary: #64748b;
  --color-text-inverse: #0f172a;
  
  --color-border-default: #334155;
  --color-border-strong: #475569;
}
```

---

## Component Patterns

### Button Component Pattern

```html
<!-- Primary Button -->
<button class="btn btn-primary" type="button">
  <span class="btn-text">Primary Action</span>
</button>

<!-- Button with Icon -->
<button class="btn btn-secondary" type="button">
  <svg class="btn-icon" aria-hidden="true"><!-- icon --></svg>
  <span class="btn-text">With Icon</span>
</button>

<!-- Icon-only Button (requires aria-label) -->
<button class="btn btn-icon-only" type="button" aria-label="Close dialog">
  <svg aria-hidden="true"><!-- close icon --></svg>
</button>

<!-- Loading Button -->
<button class="btn btn-primary btn-loading" type="button" disabled>
  <svg class="btn-spinner" aria-hidden="true"><!-- spinner --></svg>
  <span class="btn-text">Loading...</span>
</button>
```

```css
/* Button Base Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  line-height: var(--leading-tight);
  border-radius: var(--radius-lg);
  border: var(--border-width-thin) solid transparent;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  
  /* Focus styles - NEVER remove, only restyle */
  &:focus-visible {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/* Button Variants */
.btn-primary {
  background-color: var(--color-primary-600);
  color: white;
  
  &:hover:not(:disabled) {
    background-color: var(--color-primary-700);
  }
  
  &:active:not(:disabled) {
    background-color: var(--color-primary-800);
  }
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-text-primary);
  border-color: var(--color-border-default);
  
  &:hover:not(:disabled) {
    background-color: var(--color-background-secondary);
    border-color: var(--color-border-strong);
  }
}

.btn-ghost {
  background-color: transparent;
  color: var(--color-text-primary);
  
  &:hover:not(:disabled) {
    background-color: var(--color-background-secondary);
  }
}

/* Button Sizes */
.btn-sm {
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
}

.btn-lg {
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-base);
}

/* Icon Button */
.btn-icon-only {
  padding: var(--space-3);
  aspect-ratio: 1;
}

/* Loading State */
.btn-loading .btn-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Card Component Pattern

```html
<article class="card">
  <div class="card-image">
    <img src="..." alt="Descriptive alt text" loading="lazy">
  </div>
  <div class="card-content">
    <h3 class="card-title">Card Title</h3>
    <p class="card-description">Card description text goes here.</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</article>
```

```css
.card {
  display: flex;
  flex-direction: column;
  background: var(--color-background-primary);
  border: var(--border-width-thin) solid var(--color-border-default);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: box-shadow var(--duration-fast) var(--ease-out);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

/* Interactive Card */
.card-interactive {
  cursor: pointer;
}

.card-interactive:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

.card-image img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.card-content {
  padding: var(--space-4);
  flex: 1;
}

.card-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.card-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.card-footer {
  padding: var(--space-4);
  border-top: var(--border-width-thin) solid var(--color-border-default);
}
```

### Form Field Pattern

```html
<div class="form-field">
  <label for="email" class="form-label">
    Email Address
    <span class="form-required" aria-hidden="true">*</span>
  </label>
  <input 
    type="email" 
    id="email" 
    name="email"
    class="form-input"
    placeholder="you@example.com"
    required
    aria-describedby="email-hint email-error"
  >
  <p id="email-hint" class="form-hint">We'll never share your email.</p>
  <p id="email-error" class="form-error" role="alert" hidden>
    Please enter a valid email address.
  </p>
</div>
```

```css
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
}

.form-required {
  color: var(--color-error);
}

.form-input {
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  color: var(--color-text-primary);
  background: var(--color-background-primary);
  border: var(--border-width-thin) solid var(--color-border-default);
  border-radius: var(--radius-lg);
  transition: border-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}

.form-input::placeholder {
  color: var(--color-text-tertiary);
}

.form-input:hover:not(:disabled) {
  border-color: var(--color-border-strong);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.form-input:invalid:not(:placeholder-shown),
.form-input[aria-invalid="true"] {
  border-color: var(--color-error);
}

.form-input:invalid:not(:placeholder-shown):focus,
.form-input[aria-invalid="true"]:focus {
  box-shadow: 0 0 0 3px var(--color-error-light);
}

.form-hint {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.form-error {
  font-size: var(--text-sm);
  color: var(--color-error);
}

.form-error[hidden] {
  display: none;
}
```

---

## Accessibility Patterns

### Skip Link Pattern

```html
<body>
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>
  
  <header><!-- Navigation --></header>
  
  <main id="main-content" tabindex="-1">
    <!-- Main content -->
  </main>
</body>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: var(--color-primary-600);
  color: white;
  font-weight: var(--font-medium);
  border-radius: var(--radius-lg);
  z-index: var(--z-tooltip);
  transition: top var(--duration-fast) var(--ease-out);
}

.skip-link:focus {
  top: var(--space-4);
}
```

### Focus Trap Pattern (Modal)

```html
<div 
  class="modal" 
  role="dialog" 
  aria-modal="true" 
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <div class="modal-content">
    <h2 id="modal-title">Modal Title</h2>
    <p id="modal-description">Modal description text.</p>
    
    <div class="modal-actions">
      <button class="btn btn-secondary" data-modal-close>Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </div>
    
    <button 
      class="modal-close" 
      aria-label="Close dialog"
      data-modal-close
    >
      <svg aria-hidden="true"><!-- X icon --></svg>
    </button>
  </div>
</div>
```

```javascript
// Focus trap implementation
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
    
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  firstFocusable.focus();
}
```

### Accessible Icon Button

```html
<!-- Icon-only button with accessible label -->
<button 
  type="button" 
  class="btn btn-icon-only"
  aria-label="Delete item"
>
  <svg aria-hidden="true" class="icon">
    <use href="#icon-trash"></use>
  </svg>
</button>

<!-- Icon with visible label -->
<button type="button" class="btn btn-primary">
  <svg aria-hidden="true" class="icon">
    <use href="#icon-plus"></use>
  </svg>
  <span>Add Item</span>
</button>
```

### Live Region for Announcements

```html
<!-- Polite announcement (queued) -->
<div 
  id="status-message" 
  role="status" 
  aria-live="polite" 
  aria-atomic="true"
  class="sr-only"
>
  <!-- Dynamic content announced to screen readers -->
</div>

<!-- Assertive announcement (immediate) -->
<div 
  id="error-alert" 
  role="alert" 
  aria-live="assertive"
>
  <!-- Error messages -->
</div>
```

```css
/* Screen reader only content */
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

/* Not hidden from screen readers but visually distinguished */
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

---

## User Research Templates

### Interview Notes Template

```markdown
# User Interview Notes

**Participant:** P#
**Date:** YYYY-MM-DD
**Duration:** XX minutes
**Interviewer:** Name

## Background
- Role/Occupation:
- Experience level:
- Current tools used:

## Key Insights

### Pain Points
1. 
2. 
3. 

### Goals & Motivations
1. 
2. 
3. 

### Behaviors & Patterns
- 
- 

## Notable Quotes
> "Quote 1"
> "Quote 2"

## Recommendations
- 
- 

## Follow-up Questions
- 
- 
```

### Usability Test Report Template

```markdown
# Usability Test Report

**Test Name:** [Name]
**Date Range:** [Start] - [End]
**Participants:** [N] users

## Executive Summary
[2-3 sentence overview of findings]

## Methodology
- **Approach:** [Moderated/Unmoderated] [Remote/In-person]
- **Duration:** [Time] per session
- **Tasks:** [Number] tasks tested

## Key Findings

### Critical Issues (Severity 1)
| Issue | Impact | Recommendation |
|-------|--------|----------------|
| | | |

### Major Issues (Severity 2)
| Issue | Impact | Recommendation |
|-------|--------|----------------|
| | | |

### Minor Issues (Severity 3)
| Issue | Impact | Recommendation |
|-------|--------|----------------|
| | | |

## Task Success Rates

| Task | Success Rate | Avg. Time | Errors |
|------|--------------|-----------|--------|
| | | | |

## Recommendations (Prioritized)
1. 
2. 
3. 

## Next Steps
- 
- 
```

---

## Responsive Design Patterns

### Container Query Pattern

```css
/* Container setup */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Container query */
@container card (min-width: 400px) {
  .card {
    flex-direction: row;
  }
  
  .card-image {
    flex: 0 0 40%;
  }
}
```

### Responsive Typography

```css
/* Fluid typography using clamp() */
:root {
  --text-fluid-sm: clamp(0.875rem, 0.8rem + 0.25vw, 1rem);
  --text-fluid-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-fluid-lg: clamp(1.125rem, 1rem + 0.75vw, 1.5rem);
  --text-fluid-xl: clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
  --text-fluid-2xl: clamp(2rem, 1.5rem + 2.5vw, 4rem);
}

h1 {
  font-size: var(--text-fluid-2xl);
}

p {
  font-size: var(--text-fluid-base);
}
```

### Responsive Grid Pattern

```css
/* Auto-fit responsive grid */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: var(--space-6);
}

/* Explicit responsive grid */
.grid-explicit {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .grid-explicit {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-explicit {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## Animation & Interaction

### Micro-interaction Patterns

```css
/* Button press feedback */
.btn:active:not(:disabled) {
  transform: scale(0.98);
}

/* Hover lift effect */
.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Skeleton loading */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-background-secondary) 25%,
    var(--color-background-tertiary) 50%,
    var(--color-background-secondary) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Page Transition Pattern

```css
/* Fade in on page load */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-content {
  animation: fadeIn var(--duration-slow) var(--ease-out);
}

/* Staggered list animation */
.list-item {
  opacity: 0;
  animation: fadeIn var(--duration-normal) var(--ease-out) forwards;
}

.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 50ms; }
.list-item:nth-child(3) { animation-delay: 100ms; }
.list-item:nth-child(4) { animation-delay: 150ms; }
.list-item:nth-child(5) { animation-delay: 200ms; }
```

---

## Navigation Patterns

### Responsive Navigation

```html
<header class="header">
  <nav class="nav" aria-label="Main navigation">
    <a href="/" class="nav-logo" aria-label="Home">
      <img src="logo.svg" alt="" width="120" height="40">
    </a>
    
    <button 
      class="nav-toggle" 
      aria-expanded="false"
      aria-controls="nav-menu"
      aria-label="Toggle navigation menu"
    >
      <span class="nav-toggle-icon"></span>
    </button>
    
    <ul id="nav-menu" class="nav-menu" role="menubar">
      <li role="none">
        <a href="/products" class="nav-link" role="menuitem">Products</a>
      </li>
      <li role="none">
        <a href="/about" class="nav-link" role="menuitem">About</a>
      </li>
      <li role="none">
        <a href="/contact" class="nav-link" role="menuitem">Contact</a>
      </li>
    </ul>
  </nav>
</header>
```

### Breadcrumb Navigation

```html
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">
      <a href="/">Home</a>
    </li>
    <li class="breadcrumb-item">
      <a href="/products">Products</a>
    </li>
    <li class="breadcrumb-item" aria-current="page">
      <span>Product Name</span>
    </li>
  </ol>
</nav>
```

---

## Data Visualization

### Chart Accessibility Pattern

```html
<figure class="chart-container" role="figure" aria-labelledby="chart-title">
  <figcaption id="chart-title">
    Monthly Sales Performance (Q1 2024)
  </figcaption>
  
  <!-- Chart goes here -->
  <div class="chart" aria-hidden="true">
    <!-- Visual chart rendered here -->
  </div>
  
  <!-- Accessible data table alternative -->
  <details class="chart-data">
    <summary>View data table</summary>
    <table>
      <caption class="sr-only">Monthly Sales Performance Data</caption>
      <thead>
        <tr>
          <th scope="col">Month</th>
          <th scope="col">Sales ($)</th>
          <th scope="col">Growth (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">January</th>
          <td>$45,000</td>
          <td>+12%</td>
        </tr>
        <!-- More rows -->
      </tbody>
    </table>
  </details>
</figure>
```

### Color Palette for Data Viz

```css
:root {
  /* Colorblind-safe palette */
  --viz-1: #0077bb; /* Blue */
  --viz-2: #ee7733; /* Orange */
  --viz-3: #009988; /* Teal */
  --viz-4: #cc3311; /* Red */
  --viz-5: #33bbee; /* Cyan */
  --viz-6: #ee3377; /* Magenta */
  --viz-7: #bbbbbb; /* Grey */
  
  /* Sequential palette (light to dark) */
  --viz-seq-1: #f7fbff;
  --viz-seq-2: #deebf7;
  --viz-seq-3: #c6dbef;
  --viz-seq-4: #9ecae1;
  --viz-seq-5: #6baed6;
  --viz-seq-6: #4292c6;
  --viz-seq-7: #2171b5;
  --viz-seq-8: #084594;
  
  /* Diverging palette (negative to positive) */
  --viz-div-neg-3: #d73027;
  --viz-div-neg-2: #fc8d59;
  --viz-div-neg-1: #fee090;
  --viz-div-neutral: #ffffbf;
  --viz-div-pos-1: #e0f3f8;
  --viz-div-pos-2: #91bfdb;
  --viz-div-pos-3: #4575b4;
}
```

---

## Quick Reference

### Spacing Scale
| Token | Value | Use Case |
|-------|-------|----------|
| space-1 | 4px | Inline spacing |
| space-2 | 8px | Compact spacing |
| space-3 | 12px | Tight padding |
| space-4 | 16px | Default padding |
| space-6 | 24px | Section spacing |
| space-8 | 32px | Component gaps |
| space-12 | 48px | Section margins |
| space-16 | 64px | Page sections |

### Z-Index Scale
| Level | Value | Use Case |
|-------|-------|----------|
| Dropdown | 10 | Dropdowns, popovers |
| Sticky | 20 | Sticky headers |
| Fixed | 30 | Fixed elements |
| Modal Backdrop | 40 | Modal overlays |
| Modal | 50 | Modal windows |
| Popover | 60 | Popovers on modals |
| Tooltip | 70 | Tooltips |
| Toast | 80 | Toast notifications |

### Touch Target Sizes
| Size | Value | Use Case |
|------|-------|----------|
| Minimum | 44×44px | All touch targets |
| Comfortable | 48×48px | Primary actions |
| Large | 56×56px | FABs, key actions |

---

*This playbook is a living document. Update patterns as design standards evolve.*
