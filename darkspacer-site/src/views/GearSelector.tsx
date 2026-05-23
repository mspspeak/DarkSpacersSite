// component that shows a characters gear and allows them to select new items to add to their gear
import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import RandomDiceButton from './common/RandomDiceButton';

interface GearSelectorProps {
  handleSelectCreds: (creds: number | null) => void
  randomizeCharacterCreds: () => void
  characterCreds: number | null
  handleHasStarterGear: (hasGear: boolean) => void
  hasStarterGear: boolean
}


const GearSelector: React.FC<GearSelectorProps> = ({
  handleSelectCreds,
  randomizeCharacterCreds,
  characterCreds,
  handleHasStarterGear,
  hasStarterGear}) => {

  const { t } = useTranslation();
  
  return (
    <Container>
      <Grid container spacing={2} alignItems="left" style={{ marginBottom: '16px' }}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography variant="h4" className={"has-rocket"} style={{ fontFamily: 'RocketRinder' }} gutterBottom>
            {t('Starting Gear & Credits')}
          </Typography>
        </Grid>
        <Grid size={{xs: 12, md: 5}}>  
          <Typography variant="body1" gutterBottom>          
            <RandomDiceButton clickHandler={randomizeCharacterCreds} /> {characterCreds !== null ? characterCreds : '?'} {t('credits')}
          </Typography>
        </Grid>
        <Grid size={{xs: 12, md: 5}}>  
          <Typography variant="body1" gutterBottom>          
            <label>
              <input
                type="checkbox"
                disabled={!hasStarterGear && (characterCreds == null || characterCreds < 40)}
                checked={hasStarterGear}
                onChange={(e) => {
                  handleHasStarterGear(e.target.checked);
                }}
              />
              <strong>{t('Include Spacer\'s Kit')}</strong> - {t('It costs 40cr.  It uses five slots and includes the following')}:
              Backpack, Synthetic Cable, CredStick, Energy Cells (2), Glowrod, Grapple, Rations (3 pack)
            </label>
          </Typography> 
        </Grid>
      </Grid>
    </Container>
  );
};

export default GearSelector;
