# Component Usage Guide

When to use each component — and when not to.

---

## Shared UI (`@ui/shared-ui`)

### Accordion

**Use when:** You have multiple sections of content and the user only needs to see one at a time. FAQs, settings panels, collapsible filters.

**Don't use when:** All content should be visible at once. Use separate cards or sections instead.

---

### Alert

**Use when:** You need to display a contextual message that the user should notice — success confirmations, warnings, errors, or informational banners within the page flow.

**Don't use when:** The message is ephemeral and should disappear after a few seconds. Use **Toast** instead. Don't use for inline field validation — use **Form Field** error states.

---

### Avatar

**Use when:** You need to represent a user visually — in navigation, comments, user lists, or profile sections.

**Don't use when:** You're showing a generic icon that isn't a person. Use **Icon** instead.

---

### Badge

**Use when:** You need a small visual indicator — status labels ("Active", "Draft"), notification counts, category tags in compact spaces.

**Don't use when:** The label is removable or interactive. Use **Tag** instead. Don't use for long text — badges are for short labels (1-3 words).

---

### Breadcrumb

**Use when:** Your app has a deep navigation hierarchy and users need to understand where they are and navigate back to parent pages.

**Don't use when:** Your app is flat (1-2 levels deep). Don't use as a replacement for browser back navigation.

---

### Button

**Use when:** You need a primary action the user can take — submitting forms, triggering operations, navigating to key pages.

**Don't use when:** The action is secondary and icon-only (use **Icon Button**). Don't use for navigation links that should be `<a>` tags — use buttons for actions, links for navigation.

---

### Card

**Use when:** You need to group related content visually — project summaries, product listings, dashboard widgets, article previews.

**Don't use when:** Content is a single list item in a repeating list. Use **List Item** instead. Don't use clickable cards for critical actions — the click target is too large and ambiguous.

---

### Dropdown Menu

**Use when:** You need a contextual action menu — row actions in tables, "more" menus, settings menus triggered by a button click.

**Don't use when:** You're selecting a value from a list. Use **Select** or **Multi Select** instead. Don't use for navigation — use **Navbar** or **Sidebar**.

---

### Empty State

**Use when:** A page, table, or list has no content to display — empty inbox, no search results, first-time user with no data.

**Don't use when:** Content is loading. Use **Spinner** instead. Don't use as a generic error page.

---

### Icon

**Use when:** You need a standalone icon to convey meaning — in buttons, navigation items, status indicators, or decorative contexts.

**Don't use when:** The icon is the sole interactive element. Use **Icon Button** instead, which adds proper aria-label, tooltip, and focus handling.

---

### Icon Button

**Use when:** You need a compact, icon-only action — close buttons, settings toggles, favorite hearts, share actions. Includes built-in tooltip and accessibility.

**Don't use when:** The action needs a visible text label. Use **Button** with an icon instead.

---

### List Item

**Use when:** You're building a list of items with consistent structure — settings lists, file lists, contact lists, notification lists.

**Don't use when:** Items are displayed in a grid layout. Use **Card** instead. For tabular data, use **Table**.

---

### Modal

**Use when:** You need to interrupt the user for a focused task — confirmation dialogs, form overlays, detail views that require full attention.

**Don't use when:** The content can be displayed inline or in a panel. Modals are disruptive — use them sparingly. Don't use for simple yes/no questions if a toast or inline confirmation would suffice.

---

### Navbar

**Use when:** Your app needs a horizontal top navigation bar — public websites, dashboards with few top-level sections, landing pages.

**Don't use when:** You have many navigation items or deep nesting. Use **Sidebar** instead. Don't use both Navbar and Sidebar for the same navigation items.

---

### Page Header

**Use when:** Every page that needs a clear title, optional description, breadcrumbs, and action buttons at the top.

**Don't use when:** The page is a full-bleed layout (landing page, login screen) where a structured header would feel rigid.

---

### Progress Bar

**Use when:** You need to show progress toward completion — file uploads, multi-step forms, loading states with known progress.

**Don't use when:** Progress is indeterminate. Use **Spinner** instead.

---

### Sidebar

**Use when:** Your app has multiple navigation sections with grouped items — admin dashboards, document editors, settings panels. Supports collapsible mode.

**Don't use when:** You have fewer than 5 navigation items. Use **Navbar** instead. Don't use for content that changes frequently — sidebar is for stable navigation.

---

### Spinner

**Use when:** Content is loading and you need to indicate activity — page loads, API calls, lazy-loaded sections.

**Don't use when:** You know the progress percentage. Use **Progress Bar** instead. Don't use tiny spinners where a skeleton or placeholder would provide better UX.

---

### Stats Block

**Use when:** You need to display key metrics at a glance — dashboard KPIs, summary statistics, financial overviews. Supports trends (up/down/neutral).

**Don't use when:** You're showing detailed data that needs columns and sorting. Use **Table** instead.

---

### Tabs

**Use when:** You have multiple views of the same content or related content sections that the user switches between — settings categories, data views, detail panels.

**Don't use when:** Tabs would create navigation — use **Navbar** or **Sidebar** instead. Don't use more than 6-7 tabs; consider a different information architecture.

---

### Tag

**Use when:** You need removable or interactive labels — selected filters, applied tags, skill badges, categorization chips.

**Don't use when:** The label is static and non-interactive. Use **Badge** instead.

---

### Toast

**Use when:** You need to show a brief, auto-dismissing notification — "Saved successfully", "Email sent", "Error occurred". Appears as a floating overlay.

**Don't use when:** The message is critical and requires user acknowledgment. Use **Alert** (inline) or **Modal** (blocking) instead. Don't use for form validation errors.

---

### Tooltip

**Use when:** You need to provide additional context on hover — explaining an icon, showing full text for truncated content, describing a button's action.

**Don't use when:** The information is essential and shouldn't be hidden behind hover. Don't use for rich content (images, links) — use a popover or dropdown instead.

---

### Wizard Bottom Bar

**Use when:** You have a multi-step wizard or form flow and need persistent navigation at the bottom — onboarding flows, checkout processes, configuration wizards.

**Don't use when:** The form is a single page. Use regular **Button** at the bottom instead. Don't use if steps can be completed in any order — the wizard pattern implies sequential progression.

---

## Shared Forms (`@ui/shared-forms`)

### Checkbox

**Use when:** The user needs to toggle one or more independent boolean options — terms acceptance, feature toggles, multi-select in a list.

**Don't use when:** Options are mutually exclusive. Use **Radio** instead. For a single on/off toggle, consider **Toggle** for a more visual switch.

---

### Date Picker

**Use when:** The user needs to select a specific date — appointment booking, deadline setting, date filtering.

**Don't use when:** The user needs to type a date quickly (like a birth year). A simple text input with validation may be faster. Don't use for date ranges — you'll need two date pickers.

---

### File Upload

**Use when:** The user needs to upload files — profile photos, document attachments, import files. Supports drag-and-drop.

**Don't use when:** You're collecting text content. Don't use for large batch uploads without progress indication.

---

### Form Field

**Use when:** Wrapping any form control that needs a label, hint text, or error message display. Use it around **Input**, **Select**, **Textarea**, etc.

**Don't use when:** The input is standalone without labels (e.g., a search bar in a navbar). Don't nest Form Fields.

---

### Input

**Use when:** The user needs to enter short text — names, emails, passwords, numbers, search queries.

**Don't use when:** The user needs to enter long text. Use **Textarea** instead. For selecting from predefined options, use **Select**.

---

### Multi Select

**Use when:** The user needs to choose multiple options from a long list — assigning tags, selecting recipients, choosing categories. Includes search.

**Don't use when:** There are fewer than 5 options. Use **Checkbox** group instead. For single selection, use **Select**.

---

### Radio

**Use when:** The user must choose exactly one option from a small set (2-5 options) — payment method, plan selection, shipping option.

**Don't use when:** There are many options. Use **Select** instead. For boolean on/off, use **Toggle** or **Checkbox**.

---

### Search Bar

**Use when:** You need a dedicated search input with clear button — searching within a page, filtering a list, global search.

**Don't use when:** Search is part of a larger form. Use **Input** with `type="search"` inside a **Form Field** instead.

---

### Select

**Use when:** The user needs to choose one option from a dropdown list — country, category, status, role selection.

**Don't use when:** There are fewer than 3 options that can all be shown at once. Use **Radio** instead. For multiple selections, use **Multi Select**.

---

### Slider

**Use when:** The user needs to pick a value from a continuous range — volume, brightness, price range, quantity.

**Don't use when:** Precision matters (e.g., entering an exact dollar amount). Use **Input** with `type="number"` instead.

---

### Textarea

**Use when:** The user needs to enter multi-line text — comments, descriptions, notes, messages.

**Don't use when:** The text is short (one line). Use **Input** instead.

---

### Toggle

**Use when:** You need a visual on/off switch — enabling features, activating settings, switching modes. More visually prominent than a checkbox.

**Don't use when:** You have multiple related boolean options. Use **Checkbox** group instead. Don't use for actions that have immediate irreversible effects without confirmation.

---

## Shared Table (`@ui/shared-table`)

### Table

**Use when:** You need to display structured tabular data — data grids, reports, admin lists. Supports sorting, row selection, striped/bordered variants.

**Don't use when:** Each item has complex visual content (images, multi-line descriptions). Use a list of **Cards** instead. Don't use for simple key-value pairs — use a description list.

---

### Pagination

**Use when:** You have a large dataset split into pages — table data, search results, list views with many items.

**Don't use when:** The dataset is small enough to show entirely. Don't use with infinite scroll — they serve the same purpose.
