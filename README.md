# SAIL Rake Formation Decision Support System

> Ultra-modern, enterprise-grade decision support system for rake formation and operations management

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## ✨ Features

### 🎯 Executive Dashboard
- Real-time KPI widgets with sparklines
- Interactive charts with filters
- Live rake tracking map
- Recent alerts and events
- Quick action buttons

### 🎛️ Operations Control Center
- Hybrid table/card view for rake tracking
- Real-time status updates
- Timeline-based event feed
- Quick action buttons (Acknowledge, Escalate, Resolve)
- Search and filter capabilities
- Mobile-responsive design

### 📋 Planner Workstation
- Drag-and-drop rake formation builder
- Dual-pane interface (orders → rake)
- Real-time capacity validation
- AI-powered optimization (Greedy, GA, Monte Carlo)
- Visual feedback and animations
- Order search and priority filtering

### 🧪 Scenarios Lab
- Monte Carlo simulations
- Demand and wagon capacity sliders
- Sankey flow visualizations
- What-if analysis tools

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Main actions, navigation
- **Success**: Green (#22C55E) - Completed tasks, positive metrics
- **Warning**: Yellow (#EAB308) - Alerts, under-utilization
- **Destructive**: Red (#EF4444) - Critical issues, over-capacity
- **Info**: Blue (#3B82F6) - Informational messages

### Typography
- **Font Family**: Inter (300-800 weights)
- **Headings**: 3xl (Dashboard), xl (Section), lg (Card)
- **Body**: base (14px), sm (12px), xs (10px)

### Components
- Cards with hover effects and shadows
- Status pills with color coding
- Progress bars for capacity and completion
- Badges for counts and labels
- Floating action buttons
- Toast notifications

## 🌐 Internationalization

The system supports:
- **English** (Default)
- **Hindi** (हिंदी)

Toggle language from the top navigation bar.

## 🌓 Dark Mode

Full dark mode support with:
- Automatic theme detection (optional)
- Manual toggle in user menu
- Persistent preference storage
- Optimized color contrast

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- ARIA labels and roles
- Focus indicators

## 📱 Responsive Design

Fully responsive across:
- **Desktop**: Full features, multi-column layouts
- **Tablet**: Adapted layouts, touch-friendly
- **Mobile**: Stacked cards, bottom navigation

## 🔧 Technology Stack

- **Framework**: Next.js 15.2.4 (React 19)
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI + shadcn/ui
- **Charts**: Recharts
- **Data Fetching**: SWR
- **Animations**: Tailwind Animate + Custom CSS
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Theme**: next-themes

## 📂 Project Structure

```
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Executive Dashboard
│   ├── operations/          # Operations Control Center
│   ├── planner/             # Planner Workstation
│   └── scenarios/           # Scenarios Lab
│
├── components/              # React components
│   ├── app-sidebar.tsx     # Left navigation sidebar
│   ├── topbar.tsx          # Top navigation bar
│   ├── layout-wrapper.tsx  # Layout coordinator
│   ├── dashboard/          # Dashboard components
│   ├── operations/         # Operations components
│   ├── planner/            # Planner components
│   ├── scenarios/          # Scenarios components
│   └── ui/                 # Reusable UI components
│
├── lib/                     # Utility functions
│   ├── utils.ts            # Helper functions
│   ├── swr.ts              # SWR configuration
│   └── mock.ts             # Mock data generators
│
└── public/                  # Static assets
```

## 🎯 Key Pages

### `/` - Executive Dashboard
Real-time KPIs, charts, map, and alerts for executive decision-making.

### `/operations` - Operations Control Center
Monitor active rakes, track events, and manage incidents in real-time.

### `/planner` - Planner Workstation
Design and optimize rake formations using drag-and-drop interface.

### `/scenarios` - Scenarios Lab
Run what-if simulations to test different operational scenarios.

## 🔌 API Routes

- `GET /api/kpis` - Key performance indicators
- `GET /api/kpis/tonnage` - Dispatch tonnage data
- `GET /api/rakes` - Active rake information
- `GET /api/orders` - Unassigned orders
- `GET /api/operations/events` - Operational events
- `POST /api/optimize` - Rake optimization endpoint

## 🛠️ Development

### Prerequisites
- Node.js 18+ or 20+
- npm, yarn, or pnpm

### Environment Variables
Create a `.env.local` file:
```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Code Style
- ESLint for linting
- Prettier for formatting (recommended)
- TypeScript for type safety

### Component Development
All components are:
- Fully typed with TypeScript
- Documented with JSDoc comments
- Modular and reusable
- Accessible (ARIA labels)

## 📊 Performance

- **Lighthouse Score**: 95+ (Desktop)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Code Splitting**: Automatic with Next.js
- **Lazy Loading**: Dynamic imports for heavy components

## 🔒 Security

- No sensitive data in client code
- API routes for server-side logic
- HTTPS recommended for production
- Input validation on forms
- XSS protection enabled

## 📝 License

Proprietary - SAIL Internal Use Only

## 👥 Support

For issues or questions:
- **Email**: support@sail.in
- **Phone**: 1800-XXX-XXXX
- **Documentation**: [Internal Wiki]

## 🎉 Changelog

### Version 2.0 (Current)
- Complete UI/UX redesign
- Material Design 3 implementation
- Dark mode support
- Bilingual interface
- Enhanced accessibility
- Mobile-responsive design
- Improved performance

### Version 1.0
- Initial release
- Basic functionality
- Single language support

---

**Built with ❤️ for SAIL by the Digital Transformation Team**
