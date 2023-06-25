import {useEffect, useState} from 'react';
import MatchPile from './MatchPile';
import Player from './Player';
import {bestStrategy} from "../utils/bestStrategy.ts";
import Settings from "./Settings.tsx";

const Game = () => {

    const [isGameStarted, setIsGameStarted] = useState(false);
    const [changeSettingsMode, setChangeSettingsMode] = useState(false);
    const [matches, setMatches] = useState(25);
    const [maxPickValue, setMaxPickValue] = useState(3);
    const [isPlayerTurn, setPlayerTurn] = useState(true);
    const [playerScore, setPlayerScore] = useState(0);
    const [aiScore, setAiScore] = useState(0);
    const [winner, setWinner] = useState<string | null>();
    useEffect(() => {
        const localStorageMatches = localStorage.getItem('matches')
        const localStorageMaxPickNumber = localStorage.getItem('maxPickValue')
        if (localStorageMatches)
            setMatches(+localStorageMatches)
        if (localStorageMaxPickNumber)
            setMaxPickValue(+localStorageMaxPickNumber)
        const isPlayerFirst = localStorage.getItem('isPlayerFirst') === 'true'
        setPlayerTurn(isPlayerFirst)
    }, [])
    const handlePlayerTurn = (numMatches: number) => {
        setPlayerScore(playerScore + numMatches)
        setMatches(matches - numMatches);
        setPlayerTurn(false);
        checkGameStatus(matches - numMatches, true);
    };

    const handleAITurn = () => {
        const aiNumMatches = bestStrategy(matches, maxPickValue)
        setAiScore(aiScore + aiNumMatches)
        setMatches(matches - aiNumMatches);
        setPlayerTurn(true);
        checkGameStatus(matches - aiNumMatches, false);
    };

    const checkGameStatus = (matchesRemaining: number, isPlayerTurn: boolean) => {
        if (matchesRemaining === 0) {
            if (isPlayerTurn) {
                if (aiScore % 2 === 0) setWinner('AI')
                else setWinner('Player')
            } else {
                if (playerScore % 2 === 0) setWinner('Player')
                else setWinner('AI')
            }
            setIsGameStarted(false)
        }
    };
    const onSettingsSave = (matches: number, maxPickValue: number, isPlayerFirst: boolean) => {
        setMatches(matches)
        setMaxPickValue(maxPickValue)
        setPlayerTurn(isPlayerFirst)
        setChangeSettingsMode(false)
        localStorage.setItem('matches', matches.toString())
        localStorage.setItem('maxPickValue', maxPickValue.toString())
        localStorage.setItem('isPlayerFirst', isPlayerFirst ? 'true' : 'false')
    }
    const startNewGame = () => {
        setIsGameStarted(true)
        setWinner(null)
        setAiScore(0)
        setPlayerScore(0)
        const localStorageMatches = localStorage.getItem('matches')
        const localStorageMaxPickNumber = localStorage.getItem('maxPickValue')
        if (localStorageMatches)
            setMatches(+localStorageMatches)
        if (localStorageMaxPickNumber)
            setMaxPickValue(+localStorageMaxPickNumber)
        const isPlayerFirst = localStorage.getItem('isPlayerFirst') === 'true'
        setPlayerTurn(isPlayerFirst)
    }
    return (
        <div className="game">
            <h1>Match Game</h1>
            {!changeSettingsMode
                ? <button onClick={() => setChangeSettingsMode(true)}>Settings</button>
                : <Settings onSave={onSettingsSave} matches={matches} maxPickValue={maxPickValue}
                            isPlayerTurn={isPlayerTurn}/>
            }
            <MatchPile matches={matches}/>
            <div>Player{playerScore}</div>
            <div>AI:{aiScore}</div>
            {!isGameStarted ? (
                <div>
                    {winner && <h2>Winner: {winner}</h2>}
                    <button onClick={startNewGame}>Start new game</button>
                </div>
            ) : (
                <>
                    {isPlayerTurn
                        ? (<Player onTurn={handlePlayerTurn} maxPickValue={maxPickValue} matches={matches}/>)
                        : setTimeout(() => handleAITurn(), 1)
                    }
                </>
            )}
        </div>
    );
};

export default Game;
