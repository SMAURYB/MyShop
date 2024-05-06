export default function Popup ({ message, setShowConfirmZeroPopup, setSi }) {
  const handleSi = () => {
    setShowConfirmZeroPopup(false)
    setSi(true)
  }

  const handleNo = () => {
    setShowConfirmZeroPopup(false)
  }

  return (
    <div className='w-[350px] h-[170px] bg-slate-200/10 rounded-3xl border border-slate-400/20 flex flex-col items-center justify-between py-5 px-5 shadow-2xl'>
      <p className='text-lg font-semibold text-center text-slate-100'>{message}</p>
      <div className="flex flex-row gap-6">
        <button
          onClick={() => handleSi()}
          className='bg-red-500 w-12 border border-slate-200/10 rounded-lg text-md flex flex-row items-center justify-center text-slate-200 px-[10px] py-1 font-semibold shadow-2xl hover:bg-red-500/50 hover:scale-105'>
          <p>SI</p>
        </button>
        <button
          onClick={() => handleNo()}
          className='bg-red-500 w-12 border border-slate-200/10 rounded-lg text-md flex flex-row items-center justify-center text-slate-200 px-[10px] py-1 font-semibold shadow-2xl hover:bg-red-500/50 hover:scale-105'>
          <p>NO</p>
        </button>
      </div>

    </div>
  )
}
