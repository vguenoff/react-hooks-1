// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import {useState} from 'react'
import {useLocalStorageState} from '../utils'

const calculateStatus = (winner, squares, nextValue) => {
    return winner
        ? `Winner: ${winner}`
        : squares.every(Boolean)
        ? `Scratch: Cat's game`
        : `Next player: ${nextValue}`
}

const calculateNextValue = squares => {
    const xSquaresCount = squares.filter(r => r === 'X').length
    const oSquaresCount = squares.filter(r => r === 'O').length
    return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

const calculateWinner = squares => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]

        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a]
        }
    }

    return null
}

const initialSquares = Array(9).fill(null)

const Board = ({selectSquare, currentSquares, currentStep, setCurrentStep}) => {
    const renderSquare = i => (
        <button
            className="square"
            onClick={() => {
                selectSquare(i)
                setCurrentStep(currentStep + 1)
            }}
        >
            {currentSquares[i]}
        </button>
    )

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}

const Game = () => {
    const [squares, setSquares] = useLocalStorageState(
        'squares',
        initialSquares,
    )
    const [history, setHistory] = useState([])
    const [currentStep, setCurrentStep] = useState(0)

    const nextValue = calculateNextValue(squares)
    const winner = calculateWinner(squares)
    const status = calculateStatus(winner, squares, nextValue)

    const selectSquare = square => {
        if (winner || squares[square]) {
            return
        }

        const squaresCopy = [...squares]
        squaresCopy[square] = nextValue

        setSquares(squaresCopy)

        if (currentStep >= history.length) {
            setHistory([...history, squaresCopy])
        } else {
            setHistory([...history.slice(0, currentStep), squaresCopy])
        }
    }

    const restart = () => {
        setHistory([])
        setSquares(initialSquares)
        setCurrentStep(0)
    }

    const currentSquares = squares

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    {...{
                        selectSquare,
                        currentSquares,
                        currentStep,
                        setCurrentStep,
                    }}
                />
                <button className="restart" onClick={restart}>
                    restart
                </button>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>
                    <li>
                        <button
                            onClick={() => {
                                setSquares(initialSquares)
                                setCurrentStep(0)
                            }}
                        >
                            Go to game start
                        </button>
                    </li>
                    {history.map((move, i) => {
                        const current = i + 1 === currentStep
                        return (
                            <li key={i}>
                                <button
                                    onClick={() => {
                                        setSquares(move)
                                        setCurrentStep(
                                            history.indexOf(move) + 1,
                                        )
                                    }}
                                    disabled={current}
                                >
                                    Go to move #{i} {current && '(current)'}
                                </button>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}

const App = () => {
    return <Game />
}

export default App
