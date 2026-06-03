import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppRoutes } from './routes';
import { initializeData } from './services/dataService';

function App() {
  useEffect(() => {
    // Initialize data on first load
    initializeData();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
