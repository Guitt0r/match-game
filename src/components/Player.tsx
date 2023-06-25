import {FC, useEffect, useState} from 'react';

type Props = {
    onTurn: (numMatches: number) => void
    maxPickValue: number
    matches: number
}
const Player: FC<Props> = ({onTurn, maxPickValue, matches}) => {
    useEffect(() => {
        const matchesLocalStorage = localStorage.getItem('numMatches')
        if (matchesLocalStorage !== null && parseInt(matchesLocalStorage) <= Math.min(matches, maxPickValue))
            setNumMatches(+matchesLocalStorage)
    }, [maxPickValue])
    const [numMatches, setNumMatches] = useState(1);

    const handleChange = (e: any) => {
        setNumMatches(+e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onTurn(numMatches);
        localStorage.setItem('numMatches', numMatches.toString())
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Select number of matches (1-{maxPickValue}):
                <input type="number" min="1" max={Math.min(matches, maxPickValue)} value={numMatches}
                       onChange={handleChange}/>
            </label>
            <button type="submit">Take Matches</button>
        </form>
    );
};

export default Player;
