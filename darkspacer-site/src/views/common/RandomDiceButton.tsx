import { Button } from "@mui/material";
import React, { useState } from "react";

const DiceButtonStyleStandAlone: React.CSSProperties = {
    backgroundColor: '#000', 
    color: '#fff', 
    fontSize: '2.2rem',
    height: '36px',
    width: '36px',
    padding: '0px 0px 0px 0px',
    boxShadow: '0px 0px 0px 0px #ffffff'
};

const DiceButtonStyleGiant: React.CSSProperties = {
    backgroundColor: '#000', 
    color: '#fff', 
    fontSize: '24px',
    height: '27px',
    width: '27px',
    padding: '0px 0px 0px 0px',
    boxShadow: '0px 0px 0px 0px #ffffff'
};

const DiceButtonStyleRightOfSelect: React.CSSProperties = {
     borderTopLeftRadius: 0, 
    borderBottomLeftRadius: 0,  
    backgroundColor: '#000', 
    color: '#fff', 
    fontSize: '2.2rem',
    verticalAlign: 'bottom',
    boxShadow: '0px 0px 0px 0px #ffffff',
    height: '58px' 
};

interface RandomDiceButtonProps {
  clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  styles?: React.CSSProperties;
}

const RandomDiceButton: React.FC<RandomDiceButtonProps> = ({ clickHandler, styles }) => {
    const [dice, setDice] = useState<number>(5);

    const getRandomD6 = () => Math.floor(Math.random() * 6) + 1;
    const diceUnicode = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    const titles = ["buzz", "what could go wrong?", "hit me", "feeling lucky?", "pick a thang", "anz71213z"];
    
    const rollDice = (e: React.MouseEvent<HTMLButtonElement>) => {
        setDice(getRandomD6());
        clickHandler(e);
    };

    const buttonStyles = styles ? styles : DiceButtonStyleStandAlone;

    return <Button variant="contained" 
            style={buttonStyles}    
            title={titles[dice - 1]}            
            onClick={rollDice}>{diceUnicode[dice - 1]}</Button>;
};

export default RandomDiceButton;
export { DiceButtonStyleStandAlone, DiceButtonStyleRightOfSelect, DiceButtonStyleGiant };