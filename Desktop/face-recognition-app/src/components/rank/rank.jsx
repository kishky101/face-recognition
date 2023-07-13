import React from "react";

const Rank = ({userRank, userName}) => {

    return (
        <div>
            <div className="white f3 tc">
                {`${userName} your current entries are....`}
            </div>
            <div className="f1 tc">{`#${userRank}`}</div>
        </div>
    )
}

export default Rank;