import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [bg1, setBg1] = useState('bg-[#262837]')
  const [bg2, setBg2] = useState('bg-[#1F1D2B]')
  const [bg3, setBg3] = useState('bg-[#312d49]')
  const [bg4, setBg4] = useState('bg-[#ec7c6a]')

  const setThemes = (theme1, theme2, theme3, theme4) => {
    setBg1(theme1)
    setBg2(theme2)
    setBg3(theme3)
    setBg4(theme4)
  }

  return (
    <ThemeContext.Provider value={{ bg1, setBg1, bg2, setBg2, bg3, setBg3, bg4, setBg4, setThemes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext)
}
