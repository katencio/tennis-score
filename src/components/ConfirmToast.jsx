export default function ConfirmToast({confirmAction, closeToast}) {
  return (
    <div className='bg-gray-100'>
      <p className='p-2'>Are you sure you want to reset the match?</p>
      <button 
        className='float-right p-3 m-2 cursor-pointer !bg-gray-400 text-white'
        onClick={() => {
          confirmAction(); // Call your function
          closeToast(); // Close the toast
        }}
      >
        Confirm
      </button>
    </div>
  )
}