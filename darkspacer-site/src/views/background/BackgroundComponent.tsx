//component for generating a background for a character
import React from 'react';
import { Grid, Select, MenuItem, Container, Typography } from '@mui/material';
 
import { Background } from '../../models/rules/Background';       
import { useTranslation } from 'react-i18next';
import { BackgroundRepository } from '../../repository/BackgroundRepository';
import RandomDiceButton, { DiceButtonStyleRightOfSelect } from '../common/RandomDiceButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { CharacterBackgroundState, setCharacterBackgroundId } from '../../slices/characterBackgroundsSlice';
import { RangedThingPicker } from '../../generators/RangedThingPicker';


const BackgroundComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();  
  const characterBackgroundState: CharacterBackgroundState = useAppSelector((state: RootState) => state.characterBackgroundState);
  let characterBackgroundId = characterBackgroundState.characterBackgroundId;
  const backgrounds = BackgroundRepository.getAll();  

  const handleSelectBackground = (backgroundId: number | null) => {
    if (backgroundId) {
      dispatch(setCharacterBackgroundId(backgroundId));      
    } else {
      console.error('No background selected.');
    }
  }

  const randomlyPickBackground = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();    
    const background = RangedThingPicker.Pick<Background>(BackgroundRepository.getAll());
    handleSelectBackground(background?.Id || null);    
  };

  const selectedBackground = characterBackgroundId ? backgrounds.find(bg => bg.Id === characterBackgroundId) : null;
  const backGroundName = selectedBackground ? selectedBackground.Name : '';
  const backGroundDescription = selectedBackground ? selectedBackground.Description : '';

  return (
    <Container>
      <Grid container spacing={2} alignItems="left" style={{ marginBottom: '16px' }}>
        <Grid size={{xs: 12, md: 12}}>
          <Typography variant="h4"  className={"has-rocket"} style={{ fontFamily: 'RocketRinder' }}  gutterBottom>
            {t(`BACKGROUND: ${backGroundName}`)}
          </Typography>            
        </Grid>
        <Grid size={{xs: 12, md: 12}}>          
          <Select id="background-select"             
            className="darkspace-select some-times-wider" 
            title={`${backGroundName} - ${backGroundDescription}`}
            value={characterBackgroundId ? characterBackgroundId.toString() : ''} 
            onChange={(e) => {
              const value = Number(e.target.value);          
              if (value) {
                console.log(`Selected Background:`, value);
                handleSelectBackground(value);
              }
            }}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0}}
            renderValue={() => {
              return <strong>{backGroundName}</strong>;
            }}
            >
            {backgrounds.map((background: Background) => (
              <MenuItem key={background.Id} 
                value={background.Id} 
                title={`${background.Name} - ${background.Description}`}
                sx={{ whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: 1.2 }}>
                <Typography variant='body1'><strong>{background.Name}:</strong><br />{background.Description}</Typography>
              </MenuItem>
            ))}
          </Select>                   
          <RandomDiceButton clickHandler={randomlyPickBackground} styles={DiceButtonStyleRightOfSelect} />
        </Grid>        
        { selectedBackground && <Grid size={{xs: 12, md: 12}}>
          <Typography variant="body1" gutterBottom>
             <strong>{t(`${backGroundName}`)}:</strong> {t(`${backGroundDescription}`)}            
          </Typography>
        </Grid>} 
      </Grid>
    </Container>
  );
};
export default BackgroundComponent;