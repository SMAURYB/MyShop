import React from 'react'

export default function Popup({ message, setShowExitoso}) {
  return (
    <div className='w-[300px]  h-[200px] bg-slate-200 rounded-lg flex flex-col items-center justify-center p-4 shadow-lg gap-3 '>
        <p className='text-2xl font-semibold '>{message}</p>
        <button 
            onClick={() => setShowExitoso(false)}
            className='bg-red-500 rounded-lg flex flex-row items-center justify-center text-slate-200 px-4 py-3 font-semibold'>
            ACEPTAR
        </button>
    </div>
  )
}
