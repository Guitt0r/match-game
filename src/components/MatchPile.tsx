import {FC} from "react";

type Props = {
    matches: number
}
const MatchPile: FC<Props> = ({matches}) => {

    return (
        <div className="match-pile">
            <p>Matches Remaining: {matches}</p>
            <div style={{height:50 }} className="match-pile-visual">
                {[...Array(matches)].map((e, i) => <span className="busterCards" key={i}>🪵</span>)}
            </div>
        </div>
    );
};
export default MatchPile