import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { COLORS } from '@/constants/theme';

// Define theme types
interface ThemeColors {
  background: string;
  text: string;
  cardBackground: string;
  border: string;
}

interface Theme {
  colors: ThemeColors;
  isDark: boolean;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Light and dark theme configurations
const lightTheme: Theme = {
  colors: {
    background: COLORS.lightGray,
    text: COLORS.black,
    cardBackground: COLORS.white,
    border: COLORS.gray,
  },
  isDark: false,
};

const darkTheme: Theme = {
  colors: {
    background: '#121212',
    text: COLORS.white,
    cardBackground: '#1E1E1E',
    border: '#2C2C2C',
  },
  isDark: true,
};

// Provider component
export const AppThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get device color scheme
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(colorScheme === 'dark' ? darkTheme : lightTheme);

  // Update theme when device color scheme changes
  useEffect(() => {
    setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
  }, [colorScheme]);

  // Toggle theme function (for manual control)
  const toggleTheme = () => {
    setTheme(theme.isDark ? lightTheme : darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within an AppThemeProvider');
  }
  return context;
};