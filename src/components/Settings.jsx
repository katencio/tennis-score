import { useState } from 'react'

const Settings = ({ 
  player1Name, 
  player2Name, 
  setsToWin,
  onSave,
  onClose 
}) => {
  const [name1, setName1] = useState(player1Name)
  const [name2, setName2] = useState(player2Name)
  const [sets, setSets] = useState(setsToWin)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      player1Name: name1,
      player2Name: name2,
      setsToWin: sets
    })
  }

  const handleCancel = () => {
    // Just close without saving changes
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Player 1 Name</label>
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Player 2 Name</label>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Sets to Win Match</label>
            <select
              value={sets}
              onChange={(e) => setSets(Number(e.target.value))}
              className="w-full border p-2 rounded"
            >
              <option value={1}>1 Set</option>
              <option value={2}>2 Sets</option>
              <option value={3}>3 Sets</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded border border-blue-600 hover:bg-blue-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded border border-blue-600 hover:bg-blue-50"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings 