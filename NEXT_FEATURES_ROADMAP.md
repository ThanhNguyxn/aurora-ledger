# 🗺️ Next Features Roadmap

**Aurora Ledger** - Feature Development Plan

Based on current app state (Nov 3, 2025) and user needs.

---

## 🔥 **RECOMMENDED NEXT SPRINT** (1-2 weeks)

### 1. **Notification System** ⭐ TOP PRIORITY

**Why:** Keep users engaged, prevent budget overruns, celebrate milestones

**Implementation:**
- Week 1: Backend - Create notifications table, email triggers
- Week 2: Frontend - Notification center UI, preferences

**Features:**
- 🔔 Budget alerts (80%, 100% of budget used)
- 🎯 Goal milestones (25%, 50%, 75%, 100% achieved)
- 📅 Recurring reminders (1 day before due date)
- 👨‍👩‍👧‍👦 Family activity (new shared expenses, goal contributions)
- ✉️ Email digests (weekly summary, monthly report)

**Tech Stack:**
- Backend: Node-cron for checking triggers
- Email: Resend API (already integrated, 100/day free)
- Frontend: Toast notifications (react-hot-toast already used)
- Storage: New table `notifications` with read/unread status

**Effort:** MEDIUM (3-5 days)  
**Impact:** HIGH  
**Value:** Keeps users coming back!

---

### 2. **Enhanced Data Import** ⭐ HIGH VALUE

**Why:** Users want to migrate from other apps easily

**Implementation:**
- CSV Import wizard (drag & drop or file picker)
- Column mapping UI (map CSV columns to fields)
- Preview before import (show first 10 rows)
- Validation (check for duplicates, invalid data)
- Bulk create transactions

**Features:**
- 📁 CSV import from Mint, YNAB, Personal Capital
- 🗺️ Smart column mapping (auto-detect common formats)
- 👀 Preview and edit before import
- ⚠️ Duplicate detection (same date + amount + description)
- 📊 Import summary (X created, Y skipped, Z errors)

**Tech Stack:**
- Frontend: File input, Papa Parse (CSV library)
- Backend: Bulk insert endpoint with transaction
- Validation: Check categories exist, valid amounts

**Effort:** MEDIUM (3-4 days)  
**Impact:** HIGH  
**Value:** Easy onboarding for new users!

---

### 3. **Transaction Search & Quick Filters** ⭐ QUICK WIN

**Why:** As data grows, finding specific transactions becomes harder

**Implementation:**
- Add search input above transaction table
- Backend: Add full-text search endpoint
- Frontend: Debounced search, highlight matches

**Features:**
- 🔍 Search by description, merchant, amount
- ⚡ Quick filters: This week, Last month, Last 3 months, YTD, All time
- 💾 Save filter presets ("Dining Out", "Utilities", "Shopping")
- 🎯 Filter shortcuts buttons (one-click common filters)

**Tech Stack:**
- Backend: PostgreSQL `ILIKE` or full-text search
- Frontend: Debounce search input (300ms delay)
- State: Save presets in localStorage

**Effort:** LOW (1-2 days)  
**Impact:** MEDIUM  
**Value:** Quick win, big UX improvement!

---

## 🎯 **FUTURE SPRINTS** (Prioritized)

### Sprint 2 (2-3 weeks out):

**1. Receipt Scanning & OCR**
- Photo upload → Auto-create transaction
- Google Vision API or Tesseract.js
- Effort: HIGH (5-7 days)
- Impact: VERY HIGH

**2. Goals Enhancements**
- Milestones with animations (confetti!)
- Auto-save rules (round-up)
- Goal templates
- Effort: MEDIUM (3-4 days)
- Impact: MEDIUM

**3. Spending Insights Dashboard**
- Personalized insights on Dashboard
- "You spent 20% more..." messages
- Effort: MEDIUM (3-4 days)
- Impact: MEDIUM

---

### Sprint 3 (4-6 weeks out):

**1. Mobile App (React Native)**
- iOS/Android app
- Same backend API
- Effort: VERY HIGH (2-3 weeks)
- Impact: VERY HIGH

**2. Bank Account Sync (Plaid)**
- Auto-import transactions
- Effort: HIGH (1 week)
- Cost: $249/month for Plaid
- Impact: GAME CHANGER

**3. Advanced Family Features**
- Expense splitting calculator
- Debt tracking between members
- Allowance system
- Effort: MEDIUM-HIGH (1 week)
- Impact: HIGH

---

## 📊 Feature Comparison

| Feature | Effort | Impact | Value | Priority |
|---------|--------|--------|-------|----------|
| **Notifications** | Medium | High | ⭐⭐⭐⭐⭐ | 1 |
| **CSV Import** | Medium | High | ⭐⭐⭐⭐⭐ | 1 |
| **Search & Filters** | Low | Medium | ⭐⭐⭐⭐ | 1 |
| **Receipt OCR** | High | Very High | ⭐⭐⭐⭐⭐ | 2 |
| **Goals Milestones** | Medium | Medium | ⭐⭐⭐ | 2 |
| **Insights Dashboard** | Medium | Medium | ⭐⭐⭐⭐ | 2 |
| **Mobile App** | Very High | Very High | ⭐⭐⭐⭐⭐ | 3 |
| **Plaid Integration** | High | Very High | ⭐⭐⭐⭐⭐ | 3 |
| **Family Advanced** | High | High | ⭐⭐⭐⭐ | 3 |

---

## 💡 My Top 3 Recommendations:

### 🥇 #1: Notification System
**Why:** Low effort, high impact, keeps users engaged
- Email notifications already set up (Resend)
- Simple to implement
- Immediate value

### 🥈 #2: CSV Import
**Why:** Makes onboarding SO much easier
- Users can migrate from other apps
- Bulk data entry
- One-time effort, long-term value

### 🥉 #3: Transaction Search
**Why:** Quick win, immediate UX improvement
- Easy to implement (1-2 days)
- Users need this as data grows
- Low risk, high reward

---

## 🚀 Suggested Next Steps:

1. **This week:** Implement Transaction Search (quick win!)
2. **Next week:** Start Notification System
3. **Week 3:** CSV Import wizard
4. **Week 4:** Receipt OCR research & prototype

---

**Estimated Timeline:**
- 4 weeks to complete top 3 features
- App will be SIGNIFICANTLY more powerful
- All are practical and achievable!

---

*Last Updated: November 3, 2025*  
*Status: Ready for next sprint planning*

