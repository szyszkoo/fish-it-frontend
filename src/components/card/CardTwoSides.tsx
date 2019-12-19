import * as React from "react";
import ICardProps from "./ICardProps";

const CardTwoSides = (props: ICardProps) => {
    const [isHovering, setIsHovering] = React.useState<boolean>(false);
    const toggleHoverState = () => {
        setIsHovering(prevValue => !prevValue);
    }
    
    return <>
        <div className="card" onClick={props.onClick} onMouseEnter={toggleHoverState} onMouseLeave={toggleHoverState}>
            <p className="cardDescription">
                {isHovering ? props.description : props.shortDescription}
            </p>
        </div>
    </>
}

export default CardTwoSides;