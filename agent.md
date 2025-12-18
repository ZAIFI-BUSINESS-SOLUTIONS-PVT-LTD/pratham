## Project: InzightEd – IPMAT Pilot Frontend

**Mode:** Frontend only (read-only)
**Audience:** Internal pilot (Pratham / IIM Indore – IPMAT)

---

## 1. ROLE OF THE AGENT

You are acting as a **Senior Frontend Engineer**.

Your responsibility is to:

* Build a **Next.js frontend**
* Strictly follow the provided **wireframe**
* Strictly follow **InzightEd’s visual identity**
* Only **render data** from APIs
* Do **no analytics, no reasoning, no AI**

This is a **display layer only**.

---

## 2. SOURCE OF TRUTH (VERY IMPORTANT)

### Visual References (Assets Folder)

* `assets/1.png`
  → **Wireframe**
  This defines:

  * Layout
  * Section order
  * Component structure
  * What appears where

* `assets/2.png`
  → **InzightEd Design Reference**
  This defines:

  * Font style
  * Font weight
  * Color palette
  * Spacing feel
  * Card aesthetics
  * Overall visual tone

⚠️ **Rule:**
Layout from `1.png`
Design language from `2.png`

Do **NOT** invent new design styles.

---

## 3. TECH STACK (FIXED)

* Framework: **Next.js 14**
* Routing: **App Router**
* Styling: **Tailwind CSS**
* Components: Server Components first
* State:

  * URL params (view, student, exam, stage)
  * Minimal client state only where needed
* Data fetching: `fetch()` from backend APIs

---

## 4. GLOBAL CONSTRAINTS

### HARD NOs

* ❌ No charts
* ❌ No graphs
* ❌ No calculations
* ❌ No score derivations
* ❌ No AI calls
* ❌ No business logic
* ❌ No backend assumptions

### HARD YES

* ✅ Clean cards
* ✅ Clear typography
* ✅ Calm UI
* ✅ Institutional look
* ✅ Demo-safe layout

---

## 5. GLOBAL LAYOUT RULES

### Top Bar (Sticky)

* Left: `inzightEd` (text logo)
* Center: `IPMAT – Pratham | Batch 1`
* Right:

  * `Student View`
  * `Batch View`

Active view must be visually highlighted.

View is controlled via URL:

```
/dashboard?view=student
/dashboard?view=batch
```

---

## 6. STUDENT VIEW – STRUCTURE RULES

### Top Controls (Single Row)

* Student dropdown (searchable)
* Exam dropdown
* Student search input

No exam selected → block content below.

---

### Student Performance Snapshot (Card)

Fields:

* Student Name
* Batch
* Exams Attempted (X / 25)

Purely informational.

---

### Focus & Steady Zone (Two Cards)

**Focus Zone (This Test)**

* Exactly 3 bullet points

**Steady Zone (This Test)**

* Exactly 3 bullet points

Render text as-is from API.

---

### Stage Tabs

* Early Stage
* Mid-Course Stage
* Pre-Exam Stage

Tabs only switch content.
No recomputation.

---

### Stage Insight Section

#### Score Uplift Potential

* Integer value: `1–100`
* Display plainly (no progress bars)

#### Predictive Insight (Card)

* Exactly 3 bullet points

#### Prescriptive Actions (Card)

* Exactly 3 bullet points

If any data missing → show `No data available`.

---

## 7. BATCH VIEW – STRUCTURE RULES

### Top Controls

* Batch dropdown
* Exam dropdown
* Stage dropdown

---

### Cohort Performance Overview (Card)

* Total Students
* Exams Analyzed
* Coverage %

---

### Cohort Focus & Steady Zones

**Cohort Focus Zone**

* Top 3 focus patterns

**Cohort Steady Zone**

* Top 3 gaps

---

### Stage Insights (Batch)

**Predictive Insight**

* 3 bullet points

**Prescriptive Actions**

* 3 bullet points

Same structure as Student View.

---

### Raw Table (Optional)

* Collapsible
* Read-only
* Simple table
* No sorting
* No pagination

---

## 8. DATA HANDLING RULES

* Backend is authoritative
* Frontend must not:

  * Modify
  * Combine
  * Infer
  * Re-rank
  * Re-score

UI validation only:

* Null checks
* Empty arrays
* Loading states

---

## 9. DESIGN RULES (FROM IMAGE 2)

* Use the **same font family**
* Use **same font weights**
* Use **same primary & secondary colors**
* Match:

  * Card radius
  * Spacing rhythm
  * Text hierarchy

⚠️ No bright colors
⚠️ No gradients unless present in Image 2
⚠️ Calm, premium, institutional tone

---

## 10. SUCCESS CRITERIA (LOCK)

This frontend is correct if:

* It visually matches Image 2’s design language
* It structurally matches Image 1’s wireframe
* All dropdowns work
* Stage tabs work
* Data is rendered exactly as received
* No extra intelligence is added

---

## FINAL NOTE (IMPORTANT)

This is a **pilot demo**, not a product rewrite.
Clarity > Cleverness.
Trust > Fancy UI.

Build fast. Build clean. Do not overthink.
