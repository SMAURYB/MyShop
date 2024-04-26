import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function ColorThemes({ setShowColorOptions, bg2 }) {
  const { setThemes } = useTheme();

  // Define an array of theme objects
  const themes = [
    {
      name: 'Purple',
      colors: ['bg-[#262837]', 'bg-[#1F1D2B]', 'bg-[#312d49]', 'bg-[#d26554]'],
      txColor: 'text-[#6a55e4]'
    },
    {
      name: 'Beige',
      colors: ['bg-[#4d452d]', 'bg-[#363023]', 'bg-[#756941]', 'bg-[#e8cc32]'],
      txColor: 'text-[#dabf67]'
    },
    {
      name: 'Pink',
      colors: ['bg-[#6a4662]', 'bg-[#4b2d47]', 'bg-[#933b87]', 'bg-[#ad3ad7]'],
      txColor: 'text-[#e750d3]'
    },
    {
      name: 'Sea',
      colors: ['bg-[#3e4d7b]', 'bg-[#293747]', 'bg-[#3b57ab]', 'bg-[#3ac9d9]'],
      txColor: 'text-[#4d74e9]'
    },
    {
      name: 'Forest',
      colors: ['bg-[#364c30]', 'bg-[#253321]', 'bg-[#467f37]', 'bg-[#45eb88]'],
      txColor: 'text-[#86e76b]'
    },
    {
      name: 'Slate',
      colors: ['bg-[#8d8d8d]', 'bg-[#5d6c6d]', 'bg-[#7e9496]', 'bg-[#70b38b]'],
      txColor: 'text-[#cdf7c2]'
    },
  ];

  // Function to set theme
  const setTheme = (colors) => {
    setThemes(...colors);
    setShowColorOptions(false);
  };

  return (
    <div className={`w-32 rounded-xl p-4 ${bg2}`}>
      <ul className="gap-2 text-gray-300 text-lg list-disc list-inside">
        {themes.map((theme, index) => (
          <li
            key={index}
            className={`hover:font-bold  cursor-pointer ${theme.txColor}`}
            onClick={() => setTheme(theme.colors)}
          >
            {theme.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
