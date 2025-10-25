import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FinanceProvider } from '@/context/FinanceContext';
import Navbar from '@/components/Navbar';
import Login from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { AddEdit } from '@/pages/AddEdit';
import { Reminders } from '@/pages/Reminders';
import { Insights } from '@/pages/Insights';

function App() {
  return (
    <FinanceProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddEdit />} />
            <Route path="/edit/:id" element={<AddEdit />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </FinanceProvider>
  );
}

export default App;
