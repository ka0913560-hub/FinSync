# FinSync Web

A modern React web application for managing your finances - Insurance, SIPs, Loans, and Bank accounts all in one dashboard.

## Features

- 📊 **Dashboard**: View all your financial records with visual charts and summary cards
- ➕ **Add/Edit Records**: Create and update financial records with ease
- 🔔 **Reminders**: Track upcoming payments and due dates
- 📈 **Insights**: Analyze your finances with interactive charts
- 💾 **Local Storage**: All data saved securely in your browser
- 🎨 **Clean Design**: Professional UI with Tailwind CSS and shadcn/ui components

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Navigate to the web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
web/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Navbar.tsx   # Navigation bar
│   │   ├── RecordCard.tsx   # Record display card
│   │   └── SummaryCard.tsx  # Dashboard summary card
│   ├── context/         # React Context providers
│   │   └── FinanceContext.tsx
│   ├── lib/            # Utility functions
│   │   ├── storage.ts  # localStorage operations
│   │   └── utils.ts    # Helper functions
│   ├── pages/          # Page components
│   │   ├── Dashboard.tsx
│   │   ├── AddEdit.tsx
│   │   ├── Reminders.tsx
│   │   ├── Insights.tsx
│   │   └── Login.tsx
│   ├── types/          # TypeScript types
│   │   └── index.ts
│   ├── App.tsx         # Main app with routing
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML template
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── tailwind.config.js  # Tailwind config
├── postcss.config.js   # PostCSS config
└── vite.config.ts      # Vite config
```

## Usage

### Login
- Enter any email and password, or click "Continue as Guest"
- Data is stored locally in your browser

### Dashboard
- View summary cards for Insurance, SIPs, Loans, and Bank accounts
- See distribution chart of your finances
- Click any record to edit

### Add Record
- Click "Add Record" button or the "+" icon in navigation
- Fill in Name, Type, Amount, Due Date (optional), and Notes (optional)
- Click "Save" to add the record

### Edit/Delete Record
- Click on any record card to edit
- Modify fields and click "Update"
- Click "Delete" button to remove the record

### Reminders
- View all records with due dates
- Filter by: All, Overdue, This Week, Next Week, This Month
- See badges for overdue and upcoming payments

### Insights
- View statistics: Total Amount, Average, Highest, Total Records
- Analyze with Bar Chart and Pie Chart
- See Top 5 records by amount

## Data

The app comes with 5 seed records for demo purposes:
1. BlueChip Mutual Fund (SIP) - ₹5,000
2. Home Loan - ₹25,00,000
3. Savings Account (Bank) - ₹75,000
4. Term Life Insurance - ₹15,000
5. Tech Sector SIP - ₹3,000

All data is stored in `localStorage` under keys:
- `finsync_records_v1` - Financial records
- `finsync_user` - User information

## Color Theme

- **Primary Blue**: `#0f6fff` - Insurance
- **Accent Green**: `#16a34a` - SIP
- **Red**: `#ef4444` - Loan
- **Cyan**: `#06b6d4` - Bank

## Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

## Demo

This is a demo application created for educational purposes. Perfect for ideathons and showcasing modern React development practices.

## License

MIT

---

Built with ❤️ using Vite + React + TypeScript + Tailwind CSS
