import { useState } from 'react';

function useThemes() {
  const [bg1, setBg1] = useState('bg-[#262837]');
  const [bg2, setBg2] = useState('bg-[#1F1D2B]');
  const [bg3, setBg3] = useState('bg-[#312d49]');
  const [bg4, setBg4] = useState('bg-[#ec7c6a]');

  return {
    bg1,
    bg2,
    bg3,
    bg4,
    setBg1,
    setBg2,
    setBg3,
    setBg4
  };
}

export default useThemes;
