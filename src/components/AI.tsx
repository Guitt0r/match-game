import {FC, useState} from "react";

type Props = {
    matches: number,
    maxNumberOfMatchesToPick: number
    onTurn: (numMatches: number) => void
}
const AI: FC<Props> = ({onTurn, maxNumberOfMatchesToPick, matches}) => {
    const [numMatches, setNumMatches] = useState(1);
    return (
        <div>
            <p>AI is thinking...</p>
            {/* Add some AI thinking animation or message */}
            {setTimeout(() => {
                setNumMatches(bestStrategy(matches, maxNumberOfMatchesToPick))
                onTurn(numMatches)
            }, 2000)}
        </div>
    );
};

export default AI;
