import { useState, useEffect } from 'react';
import { ThemeContext } from '@/contexts/theme.context';
import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode; 
}

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const lsTheme = localStorage.getItem('theme');
    if (lsTheme) {
      setTheme(lsTheme);
        
      if (lsTheme === 'dark') {
        document.body.classList.add('dark-theme')
      } else if (lsTheme === 'light') {
        document.body.classList.remove('dark-theme')
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      document.body.classList.add('dark-theme')
    } else if (newTheme === 'light') {
      document.body.classList.remove('dark-theme')
    }
  }  

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}