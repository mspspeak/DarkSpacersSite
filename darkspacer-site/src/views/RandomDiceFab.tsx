import { Fab } from "@mui/material";
import React, { useState } from "react";


interface RandomDiceFabProps {
  clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const RandomDiceFab: React.FC<RandomDiceFabProps> = ({ clickHandler }) => {
    const [dice, setDice] = useState<number>(5);

    const getRandomD6 = () => Math.floor(Math.random() * 6) + 1;
    const diceUnicode = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    const titles = ["buzz", "what could go wrong?", "hit me", "feeling lucky?", "pick a thang", "anz71213z"];
    
    const rollDice = (e: React.MouseEvent<HTMLButtonElement>) => {
        setDice(getRandomD6());
        clickHandler(e);
    };

    return <Fab 
        aria-label={titles[dice - 1]}
        title={titles[dice - 1]}
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16, 
          backgroundColor: '#fff',
          fontSize: '48px', 
        }} 
        onClick={rollDice}
      >{diceUnicode[dice - 1]}</Fab>        
};

export default RandomDiceFab;
