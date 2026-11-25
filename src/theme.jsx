import React,{createContext,useContext,useEffect,useState} from 'react';
const ThemeContext=createContext(null);
export function ThemeProvider({children}){
 const [theme,setTheme]=useState(()=>document.documentElement.dataset.theme==='dark'?'dark':'light');
 useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem('sunstar-theme',theme)}catch{}},[theme]);
 return <ThemeContext.Provider value={{theme,toggleTheme:()=>setTheme(value=>value==='light'?'dark':'light')}}>{children}</ThemeContext.Provider>;
}
export function useTheme(){return useContext(ThemeContext)}
