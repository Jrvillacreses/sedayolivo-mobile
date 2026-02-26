# Component Patterns Library

A comprehensive collection of reusable UI component patterns with accessibility built-in.

---

## Table of Contents

1. [Buttons](#buttons)
2. [Cards](#cards)
3. [Forms](#forms)
4. [Navigation](#navigation)
5. [Modals & Dialogs](#modals--dialogs)
6. [Data Display](#data-display)
7. [Feedback](#feedback)
8. [Layout](#layout)

---

## Buttons

### Button Variants

| Variant | Use Case | Visual Style |
|---------|----------|--------------|
| Primary | Main actions | Filled, brand color |
| Secondary | Alternative actions | Outlined or subtle |
| Ghost | Tertiary actions | Text only, minimal |
| Destructive | Dangerous actions | Red/warning color |
| Link | Navigation actions | Underlined text style |

### Button States

```
┌─────────────────────────────────────────────────────────────┐
│  DEFAULT → HOVER → FOCUS → ACTIVE → DISABLED → LOADING     │
└─────────────────────────────────────────────────────────────┘

DEFAULT:    Base appearance
HOVER:      Subtle background/color change
FOCUS:      Visible focus ring (2px+ outline)
ACTIVE:     Pressed state (slight scale or darker)
DISABLED:   50% opacity, cursor: not-allowed
LOADING:    Spinner icon, disabled state
```

### Button Sizes

| Size | Height | Padding | Font Size | Use Case |
|------|--------|---------|-----------|----------|
| xs | 28px | 8px 12px | 12px | Compact UI, tables |
| sm | 32px | 8px 14px | 13px | Dense layouts |
| md | 40px | 10px 16px | 14px | Default, most uses |
| lg | 48px | 12px 20px | 16px | CTAs, hero sections |
| xl | 56px | 16px 24px | 18px | Primary landing CTAs |

### Button Icon Patterns

```html
<!-- Icon before text -->
<button class="btn">
  <svg class="icon icon-left" aria-hidden="true">...</svg>
  <span>Button Text</span>
</button>

<!-- Icon after text -->
<button class="btn">
  <span>Button Text</span>
  <svg class="icon icon-right" aria-hidden="true">...</svg>
</button>

<!-- Icon only (MUST have aria-label) -->
<button class="btn btn-icon" aria-label="Close">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Loading state -->
<button class="btn btn-loading" disabled>
  <svg class="spinner" aria-hidden="true">...</svg>
  <span>Loading...</span>
</button>
```

---

## Cards

### Card Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────┐   │
│  │                      IMAGE                          │   │
│  │                   (optional)                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  HEADER                                              │   │
│  │  Title • Subtitle • Meta                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  BODY                                                │   │
│  │  Main content, description, details                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  FOOTER                                              │   │
│  │  Actions • Links • Meta                             │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Card Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| Default | Standard card with border | General content |
| Elevated | Drop shadow, no border | Featured items |
| Outlined | Border only, no shadow | Dense layouts |
| Filled | Solid background | Highlighted content |
| Interactive | Clickable with hover state | Navigation cards |
| Selectable | Toggleable selection state | Multi-select UI |

### Interactive Card Pattern

```html
<article class="card card-interactive" tabindex="0" role="article">
  <img src="..." alt="Product description" class="card-image">
  <div class="card-content">
    <h3 class="card-title">
      <a href="/product" class="card-link">Product Name</a>
    </h3>
    <p class="card-description">Description text...</p>
  </div>
  <footer class="card-footer">
    <span class="card-price">$99.00</span>
    <button class="btn btn-sm">Add to Cart</button>
  </footer>
</article>
```

**Accessibility Notes:**
- Use `<article>` for content cards
- Make entire card clickable with stretched link or click handler
- Ensure focus state is visible
- Use `cursor: pointer` for interactive cards

---

## Forms

### Form Field Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│  LABEL                                          REQUIRED   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  PREFIX │         INPUT VALUE          │ SUFFIX    │   │
│  └─────────────────────────────────────────────────────┘   │
│  HELPER TEXT / ERROR MESSAGE                                │
│  COUNTER (x/max)                                            │
└─────────────────────────────────────────────────────────────┘
```

### Input States

| State | Visual Indicator | Behavior |
|-------|------------------|----------|
| Default | Normal border | Ready for input |
| Hover | Darker border | Preview focus |
| Focus | Blue border + ring | Active editing |
| Filled | Normal + value | Contains data |
| Error | Red border + message | Validation failed |
| Disabled | Muted colors | Not editable |
| Read-only | Muted, no border change | View only |

### Form Validation Pattern

```html
<div class="form-field" data-state="error">
  <label for="email" class="form-label">
    Email Address
    <span class="required" aria-label="required">*</span>
  </label>
  
  <input 
    type="email"
    id="email"
    name="email"
    class="form-input"
    aria-required="true"
    aria-invalid="true"
    aria-describedby="email-error"
  >
  
  <p id="email-error" class="form-error" role="alert">
    <svg class="icon" aria-hidden="true"><!-- error icon --></svg>
    Please enter a valid email address.
  </p>
</div>
```

### Form Layout Patterns

**Vertical (Default)**
```
Label
[Input                    ]
Helper text

Label
[Input                    ]
Helper text
```

**Horizontal (Wide screens)**
```
Label          [Input                    ]
               Helper text

Label          [Input                    ]
               Helper text
```

**Inline**
```
[First Name       ] [Last Name        ]
[Email                               ]
```

---

## Navigation

### Navigation Patterns

| Pattern | Use Case | Breakpoint |
|---------|----------|------------|
| Top Navbar | Primary navigation | All sizes |
| Sidebar | Dashboard, admin | Desktop |
| Bottom Tab | Mobile apps | Mobile only |
| Hamburger Menu | Collapsed nav | Mobile |
| Mega Menu | Large sites, e-commerce | Desktop |
| Breadcrumbs | Deep hierarchies | All sizes |
| Tab Navigation | Page sections | All sizes |

### Navbar Structure

```html
<header class="header">
  <nav class="nav" aria-label="Main">
    <!-- Logo/Brand -->
    <a href="/" class="nav-brand">
      <img src="logo.svg" alt="Company Name" width="120" height="40">
    </a>
    
    <!-- Mobile Toggle -->
    <button 
      class="nav-toggle"
      aria-expanded="false"
      aria-controls="nav-menu"
      aria-label="Toggle menu"
    >
      <span class="hamburger"></span>
    </button>
    
    <!-- Navigation Menu -->
    <ul id="nav-menu" class="nav-menu">
      <li><a href="/products" class="nav-link">Products</a></li>
      <li><a href="/pricing" class="nav-link">Pricing</a></li>
      <li><a href="/about" class="nav-link">About</a></li>
    </ul>
    
    <!-- Actions -->
    <div class="nav-actions">
      <a href="/login" class="btn btn-ghost">Login</a>
      <a href="/signup" class="btn btn-primary">Sign Up</a>
    </div>
  </nav>
</header>
```

### Tab Navigation Pattern

```html
<div class="tabs">
  <div class="tab-list" role="tablist" aria-label="Account settings">
    <button 
      role="tab" 
      aria-selected="true" 
      aria-controls="panel-1"
      id="tab-1"
      tabindex="0"
    >
      Profile
    </button>
    <button 
      role="tab" 
      aria-selected="false" 
      aria-controls="panel-2"
      id="tab-2"
      tabindex="-1"
    >
      Security
    </button>
    <button 
      role="tab" 
      aria-selected="false" 
      aria-controls="panel-3"
      id="tab-3"
      tabindex="-1"
    >
      Notifications
    </button>
  </div>
  
  <div 
    role="tabpanel" 
    id="panel-1" 
    aria-labelledby="tab-1"
    tabindex="0"
  >
    <!-- Profile content -->
  </div>
  
  <!-- Hidden panels -->
  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
    <!-- Security content -->
  </div>
</div>
```

---

## Modals & Dialogs

### Modal Anatomy

```
┌──────────────────────────────────────────────────────────────┐
│ BACKDROP (semi-transparent overlay)                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ MODAL CONTAINER                                        │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │ HEADER                                     [X]   │  │  │
│  │  │ Title • Description                              │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │ BODY                                             │  │  │
│  │  │ Main content area                                │  │  │
│  │  │                                                  │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │ FOOTER                                           │  │  │
│  │  │                    [Cancel] [Confirm]            │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Modal Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Focus trap | Tab stays within modal |
| Initial focus | First focusable or close button |
| Return focus | Return to trigger on close |
| Escape key | Closes modal |
| Backdrop click | Closes modal (optional) |
| aria-modal | Set to "true" |
| aria-labelledby | Points to title |
| aria-describedby | Points to description |
| role="dialog" | On modal container |

### Modal Code Pattern

```html
<div 
  class="modal-backdrop" 
  aria-hidden="true"
></div>

<div 
  class="modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
>
  <div class="modal-content">
    <header class="modal-header">
      <h2 id="modal-title">Modal Title</h2>
      <p id="modal-desc">Optional description text.</p>
      <button 
        class="modal-close" 
        aria-label="Close modal"
        data-dismiss="modal"
      >
        <svg aria-hidden="true"><!-- X icon --></svg>
      </button>
    </header>
    
    <div class="modal-body">
      <!-- Content here -->
    </div>
    
    <footer class="modal-footer">
      <button class="btn btn-ghost" data-dismiss="modal">Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </footer>
  </div>
</div>
```

### Dialog Sizes

| Size | Max Width | Use Case |
|------|-----------|----------|
| sm | 400px | Simple confirmations |
| md | 560px | Standard dialogs |
| lg | 720px | Forms, detailed content |
| xl | 900px | Complex workflows |
| full | 100vw | Immersive experiences |

---

## Data Display

### Table Pattern

```html
<div class="table-container" role="region" aria-label="User data" tabindex="0">
  <table class="table">
    <caption class="sr-only">List of users and their details</caption>
    <thead>
      <tr>
        <th scope="col">
          <button class="table-sort" aria-sort="ascending">
            Name
            <svg class="sort-icon" aria-hidden="true">...</svg>
          </button>
        </th>
        <th scope="col">Email</th>
        <th scope="col">Status</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>john@example.com</td>
        <td><span class="badge badge-success">Active</span></td>
        <td>
          <button class="btn btn-ghost btn-sm" aria-label="Edit John Doe">
            Edit
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### List Patterns

**Simple List**
```html
<ul class="list">
  <li class="list-item">Item 1</li>
  <li class="list-item">Item 2</li>
  <li class="list-item">Item 3</li>
</ul>
```

**Interactive List**
```html
<ul class="list" role="listbox" aria-label="Select option">
  <li 
    class="list-item" 
    role="option" 
    aria-selected="false"
    tabindex="0"
  >
    Option 1
  </li>
  <!-- ... -->
</ul>
```

**Description List**
```html
<dl class="description-list">
  <div class="description-item">
    <dt>Status</dt>
    <dd><span class="badge badge-success">Active</span></dd>
  </div>
  <div class="description-item">
    <dt>Created</dt>
    <dd>January 1, 2024</dd>
  </div>
</dl>
```

---

## Feedback

### Toast/Notification Pattern

```html
<div 
  class="toast toast-success"
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  <div class="toast-icon" aria-hidden="true">
    <svg><!-- success icon --></svg>
  </div>
  <div class="toast-content">
    <p class="toast-title">Success!</p>
    <p class="toast-message">Your changes have been saved.</p>
  </div>
  <button class="toast-close" aria-label="Dismiss">
    <svg aria-hidden="true"><!-- X icon --></svg>
  </button>
</div>
```

### Toast Variants

| Variant | Icon | Color | Use Case |
|---------|------|-------|----------|
| Success | ✓ | Green | Successful actions |
| Error | ✕ | Red | Failed actions |
| Warning | ⚠ | Amber | Potential issues |
| Info | ℹ | Blue | Neutral information |

### Alert Pattern

```html
<div class="alert alert-warning" role="alert">
  <svg class="alert-icon" aria-hidden="true"><!-- warning icon --></svg>
  <div class="alert-content">
    <h4 class="alert-title">Attention needed</h4>
    <p class="alert-message">Your subscription expires in 3 days.</p>
  </div>
  <button class="alert-close" aria-label="Dismiss alert">
    <svg aria-hidden="true"><!-- X icon --></svg>
  </button>
</div>
```

### Loading States

**Skeleton Loading**
```html
<div class="card skeleton">
  <div class="skeleton-image"></div>
  <div class="skeleton-text skeleton-title"></div>
  <div class="skeleton-text skeleton-line"></div>
  <div class="skeleton-text skeleton-line short"></div>
</div>
```

**Spinner**
```html
<div class="spinner" role="status">
  <svg aria-hidden="true"><!-- spinner SVG --></svg>
  <span class="sr-only">Loading...</span>
</div>
```

**Progress Bar**
```html
<div 
  class="progress" 
  role="progressbar" 
  aria-valuenow="45" 
  aria-valuemin="0" 
  aria-valuemax="100"
  aria-label="Upload progress"
>
  <div class="progress-bar" style="width: 45%">
    <span class="sr-only">45% complete</span>
  </div>
</div>
```

### Empty States

```html
<div class="empty-state">
  <svg class="empty-state-icon" aria-hidden="true">
    <!-- Illustration or icon -->
  </svg>
  <h3 class="empty-state-title">No results found</h3>
  <p class="empty-state-description">
    Try adjusting your search or filter to find what you're looking for.
  </p>
  <button class="btn btn-primary">Clear filters</button>
</div>
```

---

## Layout

### Container Widths

| Size | Max Width | Use Case |
|------|-----------|----------|
| sm | 640px | Narrow content, auth pages |
| md | 768px | Blog posts, forms |
| lg | 1024px | Standard layouts |
| xl | 1280px | Wide content |
| 2xl | 1536px | Full-width dashboards |
| full | 100% | Edge-to-edge |

### Grid System

```css
/* 12-column grid */
.grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(12, 1fr);
}

.col-span-1  { grid-column: span 1; }
.col-span-2  { grid-column: span 2; }
.col-span-3  { grid-column: span 3; }
.col-span-4  { grid-column: span 4; }
.col-span-6  { grid-column: span 6; }
.col-span-12 { grid-column: span 12; }

/* Auto-fit responsive grid */
.grid-auto {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
}
```

### Stack Pattern

```css
/* Vertical stack with consistent spacing */
.stack {
  display: flex;
  flex-direction: column;
}

.stack > * + * {
  margin-top: var(--stack-space, var(--space-4));
}

/* Usage: <div class="stack" style="--stack-space: var(--space-6)"> */
```

### Cluster Pattern

```css
/* Horizontal grouping with wrapping */
.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cluster-space, var(--space-4));
  align-items: center;
}
```

### Split Pattern

```css
/* Two elements pushed to opposite ends */
.split {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-4);
}
```

---

## Component Checklist

Before shipping any component, verify:

### Visual
- [ ] All states designed (default, hover, focus, active, disabled)
- [ ] Dark mode variant exists
- [ ] Responsive at all breakpoints
- [ ] Consistent with design system tokens

### Accessibility
- [ ] Keyboard navigable
- [ ] Focus states visible
- [ ] Screen reader friendly
- [ ] Color contrast meets WCAG AA
- [ ] Reduced motion respected

### Documentation
- [ ] Usage guidelines written
- [ ] Props/variants documented
- [ ] Do/Don't examples provided
- [ ] Code snippets available

---

*Patterns updated regularly based on accessibility standards and user research.*
