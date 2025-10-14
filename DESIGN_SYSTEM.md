# 🎨 SAIL Rake Formation System - Visual Design Showcase

## 🌟 Design Highlights

### Modern Layout Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  TOPBAR (Fixed)                                             │
│  [SAIL Logo]  Dashboard > Overview    🔔 🌓 👤             │
├──────┬──────────────────────────────────────────────────────┤
│      │                                                       │
│  S   │  📊 EXECUTIVE DASHBOARD                              │
│  I   │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐               │
│  D   │  │ KPI  │ │ KPI  │ │ KPI  │ │ KPI  │               │
│  E   │  │  📈  │ │  ⏱️  │ │  📦  │ │  ⚠️  │               │
│  B   │  └──────┘ └──────┘ └──────┘ └──────┘               │
│  A   │                                                       │
│  R   │  ┌─────────────────┐ ┌─────────────┐               │
│      │  │ Tonnage Chart   │ │ Live Map    │               │
│  🏠  │  │      📊         │ │     🗺️     │               │
│  🎯  │  └─────────────────┘ └─────────────┘               │
│  📋  │                                                       │
│  🧪  │  [Floating Action Button +]                         │
│  ⚙️  │                                                       │
└──────┴──────────────────────────────────────────────────────┘
```

## 🎨 Color System

### Light Mode Palette
```
Primary    : #3B82F6 ████ (Actions, Navigation)
Success    : #22C55E ████ (Completed, Positive)
Warning    : #EAB308 ████ (Alerts, Caution)
Destructive: #EF4444 ████ (Critical, Error)
Info       : #3B82F6 ████ (Information)
Muted      : #9CA3AF ████ (Secondary Text)
Border     : #E5E7EB ████ (Dividers)
Background : #FAFAFA ████ (Page Background)
```

### Dark Mode Palette
```
Primary    : #60A5FA ████ (Actions, Navigation)
Success    : #4ADE80 ████ (Completed, Positive)
Warning    : #FCD34D ████ (Alerts, Caution)
Destructive: #F87171 ████ (Critical, Error)
Info       : #60A5FA ████ (Information)
Muted      : #6B7280 ████ (Secondary Text)
Border     : #374151 ████ (Dividers)
Background : #1F2937 ████ (Page Background)
```

## 📊 Component Showcase

### KPI Cards
```
┌─────────────────────────┐
│ Cost per ton-km      💰 │
│                         │
│      ₹1.92             │
│      ▼ 3.1%  📈        │
│                         │
│      [Sparkline]        │
└─────────────────────────┘
```

### Status Pills
```
🟢 ARRIVED     ⬤ Arrived
🔵 IN_TRANSIT  ⬤ In Transit
🟡 LOADING     ⬤ Loading
🔴 DELAYED     ⬤ Delayed
```

### Progress Indicators
```
Capacity: 75%
[████████████████────────] 1500/2000 tons

Route Progress: 60%
[████████████────────────] Bokaro → Mumbai
```

## 🎯 Interactive Elements

### Floating Action Button (FAB)
```
Location: Bottom-right corner
States:
  - Default: [+] icon
  - Hover: Scale up + shadow
  - Active: Rotate 45° + menu
  - Menu: 3-5 contextual actions

Mobile: 56x56px circle
Desktop: Pill shape with label
```

### Drag & Drop Interface
```
┌─────────────────────┐     ┌─────────────────────┐
│ Unassigned Orders   │ ──► │ Rake Assembly       │
│                     │     │                     │
│ [Order 1] 👆       │     │ Drop Zone 📦        │
│ [Order 2] 👆       │     │ [Order 3]           │
│ [Order 3] 👆       │     │ [Order 5]           │
│ [Order 4] 👆       │     │                     │
│ [Order 5] 👆       │     │ [Optimize Button]   │
└─────────────────────┘     └─────────────────────┘
```

### Event Timeline
```
│ 
├─⬤ ALERT    Weather alert at Bokaro        [Acknowledge] [Escalate]
│             Heavy rainfall expected
│             5 minutes ago
│
├─⬤ WARNING  Rake R-2401 delayed            [View Details]
│             Technical issue resolved
│             15 minutes ago
│
├─○ INFO     Optimization complete          ✓ Resolved
│             New suggestions available
│             1 hour ago
```

## 📱 Responsive Breakpoints

### Desktop (≥1024px)
- Full sidebar (256px width)
- Multi-column grids (2-5 columns)
- Table view for data
- All features visible

### Tablet (768px - 1023px)
- Collapsible sidebar (72px collapsed)
- 2-3 column grids
- Hybrid table/card view
- Touch-optimized spacing

### Mobile (<768px)
- Hidden sidebar (hamburger menu)
- Single column layout
- Card-only views
- Bottom navigation
- Larger tap targets (44x44px min)

## 🎭 Animations & Transitions

### Page Transitions
```css
.animate-in-fade {
  animation: fadeIn 0.2s ease-out;
}

.animate-in-up {
  animation: slideInUp 0.3s ease-out;
}
```

### Hover Effects
```css
.card-hover {
  transition: all 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  }
}
```

### Loading States
```
Skeleton Loading:
┌─────────────┐
│ ▓▓▓▓▓▓      │ ← Shimmer effect
│ ▓▓▓▓        │
│ ▓▓▓▓▓▓▓▓    │
└─────────────┘
```

## 🔔 Notification System

### Toast Notifications
```
┌─────────────────────────────┐
│ ✓ Success                   │
│ Rake optimized successfully │
│                          [×] │
└─────────────────────────────┘

Position: Top-right
Duration: 3-5 seconds
Types: Success, Error, Info, Warning
```

### Notification Bell
```
  🔔 (3)
  └─────────────────────┐
        │ 🔴 Rake delayed      │
        │ 🟡 New order         │
        │ ⚪ Optimization done │
        └──────────────────────┘
```

## 🎨 Typography Scale

```
Page Title    : 3xl (30px) Bold
Section Title : xl (20px) Semibold
Card Title    : lg (18px) Semibold
Body Text     : base (14px) Regular
Caption       : sm (12px) Regular
Label         : xs (10px) Medium
```

## 📐 Spacing System

```
xs  : 0.25rem (4px)   - Icon gaps
sm  : 0.5rem  (8px)   - Tight spacing
md  : 1rem    (16px)  - Default spacing
lg  : 1.5rem  (24px)  - Section spacing
xl  : 2rem    (32px)  - Page margins
2xl : 3rem    (48px)  - Large gaps
```

## 🎯 Iconography

### Icon Library: Lucide React
```
Navigation  : Home, Activity, Layout, Settings
Actions     : Plus, Trash, Edit, Download
Status      : Check, Alert, Info, Clock
Data        : TrendingUp, TrendingDown, BarChart
Transport   : Package, Truck, MapPin
UI          : ChevronRight, MoreVertical, Search
```

### Icon Sizes
```
xs  : 12px (0.75rem)
sm  : 16px (1rem)
md  : 20px (1.25rem)
lg  : 24px (1.5rem)
xl  : 32px (2rem)
```

## 🌐 Accessibility Features

### Keyboard Navigation
```
Tab       : Move to next interactive element
Shift+Tab : Move to previous
Enter     : Activate button/link
Space     : Toggle checkbox/switch
Esc       : Close modal/dropdown
Arrow Keys: Navigate within lists
```

### Screen Reader Support
```html
<button aria-label="Close notification">
  <X className="h-4 w-4" />
</button>

<div role="status" aria-live="polite">
  Loading data...
</div>
```

### Focus Indicators
```css
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

## 📊 Data Visualization

### Chart Types Used
1. **Sparklines** - Micro trends in KPI cards
2. **Area Charts** - Tonnage over time
3. **Sankey Diagrams** - Material flow visualization
4. **Progress Bars** - Capacity and completion
5. **Status Indicators** - Real-time rake status

### Chart Color Scheme
```
Chart 1: #3B82F6 (Blue)
Chart 2: #22C55E (Green)
Chart 3: #EAB308 (Yellow)
Chart 4: #EF4444 (Red)
Chart 5: #8B5CF6 (Purple)
```

## 🎨 UI Patterns

### Empty States
```
        📦
   No orders found
Try adjusting your filters
   [Action Button]
```

### Error States
```
        ⚠️
  Something went wrong
Unable to load data
     [Try Again]
```

### Loading States
```
      ⏳
   Loading...
Please wait while we
  fetch your data
```

---

**Design System Version:** 2.0  
**Last Updated:** October 15, 2025  
**Maintained by:** Digital Transformation Team, SAIL
