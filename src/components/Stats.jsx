const Stats = ({ stats, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Match Statistics</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center font-bold">{stats.player1Name}</div>
          <div className="text-center">Statistic</div>
          <div className="text-center font-bold">{stats.player2Name}</div>

          <div className="text-center">{stats.player1Points}</div>
          <div className="text-center">Points Won</div>
          <div className="text-center">{stats.player2Points}</div>

          <div className="text-center">{stats.player1BreakPoints}</div>
          <div className="text-center">Break Points Played</div>
          <div className="text-center">{stats.player2BreakPoints}</div>

          <div className="text-center">{stats.player1BreakPointsWon}</div>
          <div className="text-center">Break Points Won</div>
          <div className="text-center">{stats.player2BreakPointsWon}</div>

          <div className="text-center">{stats.player1MatchPoints}</div>
          <div className="text-center">Match Points Played</div>
          <div className="text-center">{stats.player2MatchPoints}</div>

          <div className="text-center">{stats.player1MatchPointsWon}</div>
          <div className="text-center">Match Points Won</div>
          <div className="text-center">{stats.player2MatchPointsWon}</div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Stats 