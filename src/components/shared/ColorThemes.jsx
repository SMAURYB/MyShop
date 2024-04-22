import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function ColorThemes() {
  const { setThemes } = useTheme();

  const setTheme1 = () => {
    setThemes('bg-[#262837]', 'bg-[#1F1D2B]', 'bg-[#312d49]', 'bg-[#d26554]');
  };

  const setTheme2 = () => {
    setThemes('bg-[#4d452d]', 'bg-[#363023]', 'bg-[#756941]', 'bg-[#e8cc32]');
  };

  const setTheme3 = () => {
    setThemes('bg-[#6a4662]', 'bg-[#4b2d47]', 'bg-[#933b87]', 'bg-[#ad3ad7]');
  };

  const setTheme4 = () => {
    setThemes('bg-[#3e4d7b]', 'bg-[#293747]', 'bg-[#3b57ab]', 'bg-[#3ac9d9]');
  };

  const setTheme5 = () => {
    setThemes('bg-[#364c30]', 'bg-[#253321]', 'bg-[#467f37]', 'bg-[#45eb88]');
  };

  return (
    <div className="w-28 rounded-r-xl p-4">
      <ul className="gap-2 text-gray-300 text-lg list-disc list-inside">
        <li
          className="hover:font-semibold text-[#78388d] cursor-pointer"
          onClick={setTheme1}
        >
          Purple
        </li>
        <li
          className="hover:font-semibold text-[#fad35f] cursor-pointer"
          onClick={setTheme2}
        >
          Beige
        </li>
        <li
          className="hover:font-semibold text-[#fb8e9f] cursor-pointer"
          onClick={setTheme3}
        >
          Pink
        </li>
        <li
          className="hover:font-semibold text-[#7596f8] cursor-pointer"
          onClick={setTheme4}
        >
          Sea
        </li>
        <li
          className="hover:font-semibold text-[#86fc68] cursor-pointer"
          onClick={setTheme5}
        >
          Forest
        </li>
      </ul>
    </div>
  );
}
