# MarketingQuill Frontend Guidelines

**Date**: June 18, 2025  
**Project**: MarketingQuill – AI Copy Copilot for SaaS Marketing Managers  
**Purpose**: Defines the design system, UI/UX standards, and implementation details for the *MarketingQuill* frontend, ensuring a consistent, accessible, and visually appealing interface. This document provides clear guidance for developers and AI tools like Cursor and Lovable/Bolt, with a focus on the editor’s three-pane layout.

## 1. Design System

### 1.1 Color Palette
- **Primary**: Indigo `#6366F1` (buttons, links, active states).  
- **Secondary**: Neutral Gray `#F3F4F6` (backgrounds).  
- **Success**: Green `#10B981` (accept buttons, positive feedback).  
- **Warning**: Yellow `#FBBF24` (alerts).  
- **Error**: Red `#EF4444` (reject buttons, errors).  

### 1.2 Typography
- **Font Families**:  
  - Editor: JetBrains Mono (monospace).  
  - UI: Inter (sans-serif).  
- **Font Sizes**:  
  - Base: 16px (body text).  
  - Secondary: 14px (labels, tooltips).  
  - Headings: 24px (titles).  

### 1.3 Component Styles
- **Buttons**: Rounded corners (4px), 8px padding, hover state lightens by 10%, focus state with 2px indigo outline.  
- **Cards**: Glassmorphism effect (subtle blur, light shadow), 4px border radius.  
- **Tabs**: Indigo underline for active tab, gray for inactive.  

### 1.4 Accessibility
- WCAG 2.1 AA compliance:  
  - Keyboard navigation for all interactive elements.  
  - Visible focus indicators (2px indigo outline).  
  - High-contrast mode toggle for users with visual impairments.  
- ARIA labels for buttons, modals, and interactive elements to support screen readers.

## 2. Editor Interface Layout Overview

The editor interface is the core of *MarketingQuill*, designed with three distinct panes to keep navigation, writing, and tools separate yet cohesive:
- **Left Sidebar**: For navigation and draft management.  
- **Content Area**: The main writing space with inline feedback.  
- **Right Sidebar**: For contextual tools like grammar, tone, and SEO suggestions.

### 2.1 Left Sidebar
**What It Looks Like**:  
- **Structure**: Vertical, collapsible sidebar fixed to the left edge of the screen.  
- **Size**:  
  - Collapsed: 60px wide (icons only).  
  - Expanded: 240px wide (icons and text labels).  
- **Appearance**:  
  - **Background**: Light gray `#F3F4F6`.  
  - **Content** (top to bottom):  
    - **Logo**: Small *MarketingQuill* logo or icon.  
    - **Drafts Icon**: Document stack icon to view saved drafts.  
    - **New Draft Icon**: Plus sign to create a new draft.  
    - **Settings Icon**: Gear icon for workspace/user settings.  
    - **Profile Icon**: Avatar icon for user profile and logout.  
    - **Toggle Button**: Arrow or hamburger icon to expand/collapse.  
  - **Icons**: Indigo `#6366F1` when active, gray when inactive, with a 10% lighten hover effect.  
  - **Tooltips**: In collapsed state, hovering over an icon shows a tooltip (e.g., “Drafts”).  

**Purpose**: Provides quick navigation and access to drafts, settings, and user options without cluttering the writing space.

### 2.2 Content Area (Editor Pane)
**What It Looks Like**:  
- **Structure**: Wide, central pane that dominates the screen, flexible in width to fill the space between the sidebars.  
- **Size**: Dynamically expands (60%–80% of screen width) based on sidebar states.  
- **Appearance**:  
  - **Background**: Light gray `#F9FAFB`.  
  - **Editor**: Monospace font (JetBrains Mono), dark gray text `#1F2937`.  
  - **Inline Suggestions**:  
    - Grammar issues: Red underlines `#EF4444`.  
    - Tone suggestions: Blue underlines `#3B82F6`.  
    - SEO recommendations: Purple underlines `#8B5CF6`.  
    - Hovering over underlines displays a tooltip with suggestion details.  
  - **Sticky Footer**: Fixed at the bottom of the pane, containing:  
    - **Word Count**: e.g., “250 words”.  
    - **SEO Score**: e.g., “SEO Score: 85/100”.  
    - **Export Button**: Dropdown with options (“Copy Markdown”, “Download HTML”, “Share Link”).  
  - **Footer Style**: Slightly darker gray `#E5E7EB` background, indigo buttons.  

**Purpose**: The primary workspace for writing and editing, designed to be clean and focused with real-time feedback.

### 2.3 Right Sidebar
**What It Looks Like**:  
- **Structure**: Vertical, toggleable sidebar fixed to the right edge of the screen.  
- **Size**: 300px wide when open, hidden when closed.  
- **Appearance**:  
  - **Background**: White `#FFFFFF`.  
  - **Tabs**: Three tabs at the top:  
    - Grammar: For spelling and syntax suggestions.  
    - Tone: For style and tone adjustments.  
    - SEO: For search optimization tips.  
    - Active tab highlighted in indigo `#6366F1`, inactive tabs in gray.  
  - **Suggestion Cards**: Scrollable list below tabs, each card showing:  
    - Issue description: e.g., “Passive voice detected”.  
    - Suggested fix: e.g., “Use active voice: ‘The team launched the product’”.  
    - Buttons: **Accept** (green `#10B981`), **Reject** (red `#EF4444`).  
  - **Toggle Button**: Arrow or “X” icon to show/hide the sidebar.  
  - **Card Style**: Light shadow, rounded corners (4px).  

**Purpose**: Offers actionable tools to refine content, kept separate to avoid overwhelming the editor pane.

### 2.4 Visual Layout Summary
- **Layout Overview**: The editor interface consists of three vertical panes arranged side by side:
  - **Left Sidebar**: 60px (collapsed) or 240px (expanded) wide, containing navigation icons and a toggle button.
  - **Content Area**: Flexible width (60%–80% of screen), hosting the editor pane and sticky footer.
  - **Right Sidebar**: 300px wide when open, featuring tabs and suggestion cards with a toggle button.
- **Spatial Relationships**: The Left Sidebar is on the left, the Content Area occupies the center, and the Right Sidebar is on the right. The Content Area adjusts dynamically based on the Left Sidebar’s state (collapsed or expanded).
- **Optional Visual Reference**: For a detailed diagram, refer to a Figma mockup (to be created) or the CSS Grid implementation in section 3.1.





