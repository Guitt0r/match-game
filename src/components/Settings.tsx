import {FC, useState} from "react";

type Props = {
    onSave: (matches: number, maxPickNumber: number,isPlayerFist:boolean) => void
    matches: number
    maxPickValue: number
    isPlayerTurn: boolean
}
const Settings: FC<Props> = ({onSave, matches, maxPickValue, isPlayerTurn}) => {
    const [newMatches, setNewMatches] = useState(matches);
    const [newMaxPickValue, setNewMaxPickValue] = useState(maxPickValue);
    const [isPlayerFirst, setisPlayerFirst] = useState(isPlayerTurn);

    const handleMatchesChange = (e: any) => {
        setNewMatches(+e.target.value);
    };
    const handleMaxPickNumberChange = (e: any) => {
        setNewMaxPickValue(+e.target.value);
    };
    const handleIsPlayerFirstChange = () => {
        setisPlayerFirst(!isPlayerFirst)
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSave(newMatches, newMaxPickValue,isPlayerFirst);
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Select number of matches:
                    <input type="number" step="2" min="1" value={newMatches}
                           onChange={handleMatchesChange}/>
                </label>
            </div>
            <div>
                <label>
                    Select number of max pick Number:
                    <input type="number" min="1" value={newMaxPickValue}
                           onChange={handleMaxPickNumberChange}/>
                </label>
            </div>
            <div>
                <label>
                    Player go first:
                    <input type="checkbox" checked={isPlayerFirst}
                           onChange={handleIsPlayerFirstChange}/>
                </label>
            </div>
            <button type="submit">Save Settings</button>
        </form>
    )
}
export default Settings