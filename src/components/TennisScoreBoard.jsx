import { useState, useEffect } from 'react'
import Settings from './Settings'
import Stats from './Stats'

const TennisScoreBoard = () => {
  // Load initial state from localStorage or use defaults
  const [player1Score, setPlayer1Score] = useState(() => 
    JSON.parse(localStorage.getItem('player1Score')) || 0
  )
  const [player2Score, setPlayer2Score] = useState(() => 
    JSON.parse(localStorage.getItem('player2Score')) || 0
  )
  const [currentSet, setCurrentSet] = useState(() => 
    JSON.parse(localStorage.getItem('currentSet')) || 0
  )
  const [player1Sets, setPlayer1Sets] = useState(() => 
    JSON.parse(localStorage.getItem('player1Sets')) || [0, 0, 0, 0, 0]
  )
  const [player2Sets, setPlayer2Sets] = useState(() => 
    JSON.parse(localStorage.getItem('player2Sets')) || [0, 0, 0, 0, 0]
  )
  const [isTiebreak, setIsTiebreak] = useState(() => 
    JSON.parse(localStorage.getItem('isTiebreak')) || false
  )
  const [isBreakPoint, setIsBreakPoint] = useState(() => 
    JSON.parse(localStorage.getItem('isBreakPoint')) || false
  )
  const [tiebreakScore1, setTiebreakScore1] = useState(() => 
    JSON.parse(localStorage.getItem('tiebreakScore1')) || 0
  )
  const [tiebreakScore2, setTiebreakScore2] = useState(() => 
    JSON.parse(localStorage.getItem('tiebreakScore2')) || 0
  )
  const [player1Name, setPlayer1Name] = useState(() => 
    localStorage.getItem('player1Name') || "Player 1 Name"
  )
  const [player2Name, setPlayer2Name] = useState(() => 
    localStorage.getItem('player2Name') || "Player 2 Name"
  )
  const [showSettings, setShowSettings] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [setsToWin, setSetsToWin] = useState(() => 
    JSON.parse(localStorage.getItem('setsToWin')) || 2
  )

  const statsInitialValues = {
    player1Points: 0,
    player2Points: 0,
    player1BreakPoints: 0,
    player2BreakPoints: 0,
    player1BreakPointsWon: 0,
    player2BreakPointsWon: 0,
    player1MatchPoints: 0,
    player2MatchPoints: 0,
    player1MatchPointsWon: 0,
    player2MatchPointsWon: 0
  }

  const [stats, setStats] = useState(() => 
    JSON.parse(localStorage.getItem('stats')) || statsInitialValues
  )
  const [server, setServer] = useState(() => 
    JSON.parse(localStorage.getItem('server')) || null
  )
  const [matchWinner, setMatchWinner] = useState(() => 
    JSON.parse(localStorage.getItem('matchWinner')) || null
  )
  const [isStatsHighlighted, setIsStatsHighlighted] = useState(() => 
    JSON.parse(localStorage.getItem('isStatsHighlighted')) || false
  )

  const scores = ['0', '15', '30', '40', 'Ad']

  // Add useEffect hooks to save state changes to localStorage
  useEffect(() => {
    localStorage.setItem('player1Score', JSON.stringify(player1Score))
  }, [player1Score])

  useEffect(() => {
    localStorage.setItem('player2Score', JSON.stringify(player2Score))
  }, [player2Score])

  useEffect(() => {
    localStorage.setItem('currentSet', JSON.stringify(currentSet))
  }, [currentSet])

  useEffect(() => {
    localStorage.setItem('player1Sets', JSON.stringify(player1Sets))
  }, [player1Sets])

  useEffect(() => {
    localStorage.setItem('player2Sets', JSON.stringify(player2Sets))
  }, [player2Sets])

  useEffect(() => {
    localStorage.setItem('isTiebreak', JSON.stringify(isTiebreak))
  }, [isTiebreak])

  useEffect(() => {
    localStorage.setItem('isBreakPoint', JSON.stringify(isBreakPoint))
  }, [isBreakPoint])

  useEffect(() => {
    localStorage.setItem('tiebreakScore1', JSON.stringify(tiebreakScore1))
  }, [tiebreakScore1])

  useEffect(() => {
    localStorage.setItem('tiebreakScore2', JSON.stringify(tiebreakScore2))
  }, [tiebreakScore2])

  useEffect(() => {
    localStorage.setItem('player1Name', player1Name)
  }, [player1Name])

  useEffect(() => {
    localStorage.setItem('player2Name', player2Name)
  }, [player2Name])

  useEffect(() => {
    localStorage.setItem('setsToWin', JSON.stringify(setsToWin))
  }, [setsToWin])

  useEffect(() => {
    localStorage.setItem('stats', JSON.stringify(stats))
  }, [stats])

  useEffect(() => {
    localStorage.setItem('server', JSON.stringify(server))
  }, [server])

  useEffect(() => {
    localStorage.setItem('matchWinner', JSON.stringify(matchWinner))
  }, [matchWinner])

  useEffect(() => {
    localStorage.setItem('isStatsHighlighted', JSON.stringify(isStatsHighlighted))
  }, [isStatsHighlighted])

  useEffect(() => {
    if (server === null) {
      setServer(Math.random() < 0.5 ? 1 : 2)
    }
  }, [])

  useEffect(() => {
    if (!player1Name || player1Name === "Player 1 Name") {
      setShowSettings(true)
    }
  }, [])

  const checkMatchWinner = () => {
    const setsWon1 = player1Sets.filter(s => s >= 6).length
    const setsWon2 = player2Sets.filter(s => s >= 6).length

    if (setsWon1 >= setsToWin) {
      setMatchWinner(1)
      setIsStatsHighlighted(true)
    } else if (setsWon2 >= setsToWin) {
      setMatchWinner(2)
      setIsStatsHighlighted(true)
    }
  }

  useEffect(() => {
    checkMatchWinner()
  }, [player1Sets, player2Sets])

  const handlePoint = (player) => {

    if (matchWinner) return

    // Update stats
    const newStats = { ...stats }
    
    // Track points won
    if (player === 1) {
      newStats.player1Points++
    } else {
      newStats.player2Points++
    }

    setStats(newStats)

    console.log({'stats': { ...stats}})

    // // Check for break point (when returning server's serve)
    // if ((player === 1 && server === 2) || (player === 2 && server === 1)) {
    //   // Break point scenarios:
    //   // 1. Returner at 30, Server at 0, 15, or 30 (next point could be break point)
    //   // 2. Returner at 40 or Ad (current point is break point)
    //   if (player === 1) {
    //     if (player1Score === 3 || player1Score === 4) {
    //       // Current point is a break point
    //       newStats.player1BreakPoints++
    //       if (
    //         (player1Score === 3 && player2Score < 3) || // Will win on 40
    //         player1Score === 4 // Will win on Ad
    //       ) {
    //         newStats.player1BreakPointsWon++
    //       }
    //     }
    //   } else {
    //     if (player2Score === 3 || player2Score === 4) {
    //       // Current point is a break point
    //       newStats.player2BreakPoints++
    //       if (
    //         (player2Score === 3 && player1Score < 3) || // Will win on 40
    //         player2Score === 4 // Will win on Ad
    //       ) {
    //         newStats.player2BreakPointsWon++
    //       }
    //     }
    //   }
    // }

    // Check for match point
    const setsWon1 = player1Sets.filter(s => s >= 6).length
    const setsWon2 = player2Sets.filter(s => s >= 6).length
    
    // Match point scenarios
    // if (
    //   (setsWon1 === setsToWin - 1 && player === 1) || 
    //   (setsWon2 === setsToWin - 1 && player === 2)
    // ) {
    //   // Current game situation where player could win the match
    //   if (
    //     (player === 1 && player1Score === 3 && player2Score < 3) ||
    //     (player === 2 && player2Score === 3 && player1Score < 3) ||
    //     (player === 1 && player1Score === 4) ||
    //     (player === 2 && player2Score === 4)
    //   ) {
    //     if (player === 1) {
    //       newStats.player1MatchPoints++
    //       if (
    //         (player1Score === 3 && player2Score < 3) || // Will win on 40
    //         player1Score === 4 // Will win on Ad
    //       ) {
    //         newStats.player1MatchPointsWon++
    //       }
    //     } else {
    //       newStats.player2MatchPoints++
    //       if (
    //         (player2Score === 3 && player1Score < 3) || // Will win on 40
    //         player2Score === 4 // Will win on Ad
    //       ) {
    //         newStats.player2MatchPointsWon++
    //       }
    //     }
    //   }
    // }

    if (isTiebreak) {
      handleTiebreakPoint(player)
      return
    }

    const newPlayerStats = { ...stats }

    if (player === 1) { // If the winner of the point is player 1
      if (player1Score === 3 && player2Score === 3) {
        setPlayer1Score(4) // Advantage
        if (server === 2) { // If is serving player 2 this is breakpoint
          setIsBreakPoint(true)
          newPlayerStats.player1BreakPoints++
          setStats(newPlayerStats)
        }
      } else if (player1Score === 4) {
        // Player 1 wins the game
        handleGameWin(1)
        resetScore()
      } else if (player2Score === 4) {
        setPlayer2Score(3) // Remove advantage
        setIsBreakPoint(false)
      } else if (player1Score < 3) {
        if (server === 2 && player1Score >= 2 && player2Score < 3) {
          setIsBreakPoint(true)
          newPlayerStats.player1BreakPoints++
          setStats(newPlayerStats)
        }
        if (server === 1 && player2Score >= 2 && player1Score < 3) {
          newPlayerStats.player2BreakPoints++
          setStats(newPlayerStats)
        }
        setPlayer1Score(player1Score + 1)
      } else {
        // Win game
        handleGameWin(1)
        resetScore()
      }
    } else { // If the winnder of the point is player 2
      // Similar logic for player 2
      if (player2Score === 3 && player1Score === 3) {
        setPlayer2Score(4) // Advantage
        if (server === 1) { // If is serving player 2 this is breakpoint
          setIsBreakPoint(true)
          newPlayerStats.player2BreakPoints++
          setStats(newPlayerStats)
        }
      } else if (player2Score === 4) {
        // Player 2 Wins the game
        handleGameWin(2)
        resetScore()
      } else if (player1Score === 4) {
        setPlayer1Score(3) // Remove advantage
        setIsBreakPoint(false)
      } else if (player2Score < 3) {
        if (server === 1 && player2Score >= 2 && player1Score < 3) {
          setIsBreakPoint(true)
          newPlayerStats.player2BreakPoints++
          setStats(newPlayerStats)
        }
        if (server === 2 && player1Score >= 2 && player2Score < 3) {
          newPlayerStats.player1BreakPoints++
          setStats(newPlayerStats)
        }
        setPlayer2Score(player2Score + 1)
      } else {
        // Win game
        handleGameWin(2)
        resetScore()
      }
    }
  }

  const handleTiebreakPoint = (player) => {
    if (player === 1) {
      setTiebreakScore1(tiebreakScore1 + 1)
    } else {
      setTiebreakScore2(tiebreakScore2 + 1)
    }

    // Check for tiebreak win (7 points with 2-point lead)
    if (tiebreakScore1 >= 6 && tiebreakScore1 >= tiebreakScore2 + 1) {
      handleSetWin(1)
    } else if (tiebreakScore2 >= 6 && tiebreakScore2 >= tiebreakScore1 + 1) {
      handleSetWin(2)
    }
  }

  const handleGameWin = (player) => {
    // Update the set score
    const newPlayer1Sets = [...player1Sets]
    const newPlayer2Sets = [...player2Sets]

    const newStats = { ...stats }


    if (isBreakPoint) {
      if (player === 1) {
        newStats.player1BreakPointsWon++
      } else {
        newStats.player2BreakPointsWon++
      }
    }

    setStats(newStats)
    setIsBreakPoint(false)

    if (player === 1) {
      newPlayer1Sets[currentSet]++
    } else {
      newPlayer2Sets[currentSet]++
    }

    setPlayer1Sets(newPlayer1Sets)
    setPlayer2Sets(newPlayer2Sets)

    // Check for tiebreak condition
    if (newPlayer1Sets[currentSet] === 6 && newPlayer2Sets[currentSet] === 6) {
      setIsTiebreak(true)
      return
    }

    // Check for set win
    if (newPlayer1Sets[currentSet] >= 6 && 
        newPlayer1Sets[currentSet] >= newPlayer2Sets[currentSet] + 2) {
      handleSetWin(1)
    } else if (newPlayer2Sets[currentSet] >= 6 && 
               newPlayer2Sets[currentSet] >= newPlayer1Sets[currentSet] + 2) {
      handleSetWin(2)
    }

    // Switch server after each game
    setServer(server === 1 ? 2 : 1)
  }

  const handleSetWin = (player) => {
    if (currentSet < 4) {
      // Update the set score for tiebreak
      if (isTiebreak) {
        const newPlayer1Sets = [...player1Sets]
        const newPlayer2Sets = [...player2Sets]
        
        if (player === 1) {
          newPlayer1Sets[currentSet] = 7
          newPlayer2Sets[currentSet] = 6
        } else {
          newPlayer1Sets[currentSet] = 6
          newPlayer2Sets[currentSet] = 7
        }
        
        setPlayer1Sets(newPlayer1Sets)
        setPlayer2Sets(newPlayer2Sets)
      }
      
      // Move to next set and reset tiebreak
      setCurrentSet(currentSet + 1)
      setIsTiebreak(false)
      setTiebreakScore1(0)
      setTiebreakScore2(0)
    }
  }

  const resetScore = () => {
    setPlayer1Score(0)
    setPlayer2Score(0)
  }

  const resetMatch = () => {
    resetScore()
    setCurrentSet(0)
    setPlayer1Sets([0, 0, 0, 0, 0])
    setPlayer2Sets([0, 0, 0, 0, 0])
    setIsTiebreak(false)
    setIsBreakPoint(false)
    setTiebreakScore1(0)
    setTiebreakScore2(0)
    setServer(1)
    setMatchWinner(null)
    setIsStatsHighlighted(false)
    setShowSettings(true)
    setStats(statsInitialValues)
    
    // Clear localStorage except for player names and stats
    const savedNames = {
      player1Name: localStorage.getItem('player1Name'),
      player2Name: localStorage.getItem('player2Name'),
      stats: statsInitialValues
    }
    localStorage.clear()
    localStorage.setItem('player1Name', savedNames.player1Name)
    localStorage.setItem('player2Name', savedNames.player2Name)
    localStorage.setItem('stats', statsInitialValues)
  }

  const handleSettingsSave = (settings) => {
    const currentSetsWon1 = player1Sets.filter(s => s >= 6).length
    const currentSetsWon2 = player2Sets.filter(s => s >= 6).length
    const maxSetsWon = Math.max(currentSetsWon1, currentSetsWon2)

    if (settings.setsToWin < maxSetsWon) {
      alert(`Cannot set sets to win lower than ${maxSetsWon} as a player has already won that many sets`)
      return
    }

    setPlayer1Name(settings.player1Name)
    setPlayer2Name(settings.player2Name)
    setSetsToWin(settings.setsToWin)
    setShowSettings(false)
    setServer(1)
  }

  return (
    <div 
      className="min-h-screen w-full fixed inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/img/tennis-score-app.jpg")',
      }}
    >
      {/* Overlay for the entire screen */}
      <div 
        className="inset-0" 
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'brightness(1.1)',
        }}
      />
      
      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-6">Tennis Score</h1>
          
          <div className="flex justify-end mb-4">
            <div className="space-x-4">
              <button
                onClick={() => setShowSettings(true)}
                className="text-blue-600 hover:text-blue-800 p-2"
              >
                <img 
                  src="/img/settings.jpg" 
                  alt="Settings" 
                  className="w-6 h-6 object-contain"
                />
              </button>
              <button
                onClick={() => setShowStats(true)}
                className={`p-2 ${isStatsHighlighted ? 'animate-pulse' : ''}`}
              >
                <img 
                  src="/img/stats-icon.png" 
                  alt="Stats" 
                  className="w-6 h-6 object-contain"
                />
              </button>
            </div>
          </div>
          
          <div className="flex justify-center">
               {server === 1 && !matchWinner && (
                <span className="text-yellow-400 font-bold text-xl pt-1.5">●</span>
              )}<span className="p-2 sm:p-1">{player1Name}</span>
              <span className='text-xl font-bold p-1'>{isTiebreak ? tiebreakScore1 : scores[player1Score]}</span>
              <span className='text-xl font-bold p-1'> - </span>
              <span className='font-bold text-xl p-1'>{isTiebreak ? tiebreakScore2 : scores[player2Score]}</span>
              <span className="p-2">{player2Name}</span>
              {server === 2 && !matchWinner && (
                <span className="text-yellow-400 font-bold text-xl pt-1.5">●</span>
              )}
          </div>
            
          <div className="flex justify-center">
            <table className="border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-400">Players</th>
                  {player1Sets.slice(0, Math.max(currentSet + 1, setsToWin * 2 - 1)).map((_, index) => (
                    <th key={index} className="border border-gray-400 px-2 py-2">
                      Set {index + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400">
                    <div className="flex justify-between items-center px-2">
                      <span className={`flex items-center gap-2 ${
                        matchWinner === 1 ? 'text-blue-600 font-bold' : ''
                      }`}>
                        {player1Name}
                      </span>
                    </div>
                  </td>
                  {player1Sets.slice(0, Math.max(currentSet + 1, setsToWin * 2 - 1)).map((set, index) => (
                    <td key={index} className={`border border-gray-400 py-2 text-center ${
                      currentSet === index ? 'bg-yellow-100' : ''
                    }`}>
                      {set}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-400">
                    <div className="flex justify-between items-center px-2">
                      <span className={`flex items-center gap-2 ${
                        matchWinner === 2 ? 'text-blue-600 font-bold' : ''
                      }`}>
                        {player2Name}
                      </span>
                    </div>
                  </td>
                  {player2Sets.slice(0, Math.max(currentSet + 1, setsToWin * 2 - 1)).map((set, index) => (
                    <td key={index} className={`border border-gray-400 py-2 text-center ${
                      currentSet === index ? 'bg-yellow-100' : ''
                    }`}>
                      {set}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {matchWinner && (
            <div className="text-center mt-4 text-lg font-bold text-blue-600">
              {matchWinner === 1 ? player1Name : player2Name} wins the match!
            </div>
          )}

          {isBreakPoint && (
            <div className="text-center mt-4 text-lg font-bold text-red-600">
              BreakPoint
            </div>
          )}

          {isTiebreak && !matchWinner && (
            <div className="text-center mt-4 text-lg font-bold text-red-600">
              Tiebreak in progress
            </div>
          )}

          <div className="flex justify-center mt-6">
            <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
              <button
                onClick={() => handlePoint(1)}
                className={`text-blue-600 hover:text-blue-800 px-4 py-2 rounded border border-blue-600 hover:bg-blue-50 ${
                  matchWinner ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={matchWinner !== null}
              >
                Point {player1Name}
              </button>
              <button
                onClick={() => handlePoint(2)}
                className={`text-blue-600 hover:text-blue-800 px-4 py-2 rounded border border-blue-600 hover:bg-blue-50 ${
                  matchWinner ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={matchWinner !== null}
              >
                Point {player2Name}
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={resetMatch}
              className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded border border-blue-600 hover:bg-blue-50"
            >
              Reset Match
            </button>
          </div>

          {showSettings && (
            <Settings
              player1Name={player1Name}
              player2Name={player2Name}
              setsToWin={setsToWin}
              onSave={handleSettingsSave}
              onClose={() => setShowSettings(false)}
            />
          )}

          {showStats && (
            <Stats
              stats={{
                ...stats,
                player1Name,
                player2Name
              }}
              onClose={() => setShowStats(false)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default TennisScoreBoard 