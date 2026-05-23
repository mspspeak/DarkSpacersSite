// component to select a motivation for a character
import React from 'react';
import { Container, Grid, MenuItem, Select, Typography } from '@mui/material';
import { MotivationRepository } from '../../repository/MotivationRepository';
import { Motivation } from '../../models/rules/Motivation';
import { useTranslation } from 'react-i18next';
import RandomDiceButton, { DiceButtonStyleRightOfSelect } from '../common/RandomDiceButton';

interface MotivationSelectorProps {
  handleSelectMotivation: (motivationId: number | null) => void
  randomizeCharacterMotivation: () => void
  characterMotivationId: number | null
}



const MotivationSelector: React.FC<MotivationSelectorProps> = ({ handleSelectMotivation, randomizeCharacterMotivation, characterMotivationId }) => {
  const { t } = useTranslation();
  const motivations: Motivation[] = MotivationRepository.getAll(); // Assume this fetches all motivations

  
  const randomlyPickMotivation = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      randomizeCharacterMotivation();
    };

  const selectedMotivation = characterMotivationId ? motivations.find(mot => mot.Id === characterMotivationId) : null;
  const motivationName = selectedMotivation ? selectedMotivation.Name : '';
  const motivationDescription = selectedMotivation ? selectedMotivation.Description : '';


  return (
    <Container>
      <Grid container spacing={2} alignItems="left" style={{ marginBottom: '16px' }}>
        <Grid size={{xs: 12, md: 12}}>
          <Typography variant="h4" className={"has-rocket"} style={{ fontFamily: 'RocketRinder' }} gutterBottom>
            {t(`MOTIVATION: ${motivationName}`)}
          </Typography>                              
        </Grid>
        <Grid size={{xs: 12, md: 12}}>
          <Select id="motivation-select" 
            className="darkspace-select some-times-wider" 
            title={`${motivationName} - ${motivationDescription}`}
            value={characterMotivationId ? characterMotivationId.toString() : ''} 
            onChange={(e) => {
              const value = Number(e.target.value);          
              if (value) {
                console.log(`Selected Motivation:`, value);
                handleSelectMotivation(value);
              }
            }}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0}}
            renderValue={() => {
              return <strong>{motivationName}</strong>;
            }}
            >
            {motivations.map((motivation: Motivation) => (
              <MenuItem key={motivation.Id} 
              value={motivation.Id} title={`${motivation.Name} - ${motivation.Description}`}
              sx={{ whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: 1.2 }}
              >
                <Typography variant='body1'><strong>{motivation.Name}:</strong><br />{motivation.Description}</Typography>
              </MenuItem>
            ))}
          </Select>                   
          <RandomDiceButton clickHandler={randomlyPickMotivation} styles={DiceButtonStyleRightOfSelect} />
        </Grid>    
        {selectedMotivation && <Grid size={{xs: 12, md: 12}}>
          <Typography variant="body1" gutterBottom>
            <strong>{t(`${motivationName}`)}:</strong> {t(`${motivationDescription}`)}
          </Typography>    
        </Grid>}
      </Grid>
    </Container>
  );
};

export default MotivationSelector;
