// component for generating ability scores for a character
import React from 'react';
import { Container, Typography, Grid, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import RandomDiceButton from '../common/RandomDiceButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { AbilityScoresState, setCharacterAbilityScores } from '../../slices/abilityScoresSlice';
import { AbilityScoreGenerator } from '../../generators/AbilityScoreGenerator';
import { AbilityScoreRollType } from '../../generators/AbilityScoreGenerator';
import { RandomNumberGenerator } from '../../generators/RandomNumberGenerator';


const AbilityScoresComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();  
  const allowedAbilityScoreValues = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
  const characterAbilityScoresState: AbilityScoresState = useAppSelector((state: RootState) => state.abilityScoresState);
  const abilityScoreGenerator = new AbilityScoreGenerator(new RandomNumberGenerator(), AbilityScoreRollType.Standard);

  //handleAcceptAbilityScores, generateScores, 
  let str = characterAbilityScoresState.characterStr;
  let dex = characterAbilityScoresState.characterDex;
  let con = characterAbilityScoresState.characterCon;
  let int = characterAbilityScoresState.characterInt;
  let wis = characterAbilityScoresState.characterWis;
  let cha = characterAbilityScoresState.characterCha;

  const generateScores = () => {
    const str: number = abilityScoreGenerator.generate().value;
    const dex: number = abilityScoreGenerator.generate().value;
    const con: number = abilityScoreGenerator.generate().value;
    const int: number = abilityScoreGenerator.generate().value;
    const wis: number = abilityScoreGenerator.generate().value;
    const cha: number = abilityScoreGenerator.generate().value;

    handleAcceptAbilityScores(str, dex, con, int, wis, cha);
  }

  const handleAcceptAbilityScores = (str: number, dex: number, con: number, int: number, wis: number, cha: number) => {
    dispatch(setCharacterAbilityScores({ characterStr: str, characterDex: dex, characterCon: con, characterInt: int, characterWis: wis, characterCha: cha }));
  }

  return (
    <Container>
      <Grid container spacing={2} alignItems="left" style={{ marginBottom: '16px' }}>
        <Grid size={{ xs: 12, sm: 12 }}>
          <Typography variant="h4" className={"has-rocket"} style={{ fontFamily: 'RocketRinder' }}>{t('Stat Rolls')}</Typography>          
        </Grid>
        <Grid size={12}><RandomDiceButton clickHandler={generateScores} /></Grid>
        <Grid direction={{ xs:"column", sm:"row"}} 
          sx={{
            display: { xs: 'grid', sm: 'flex' },
            gridAutoFlow: { xs:"column", sm:"row"},
            gridTemplateRows: { xs:"repeat(3, 1fr)", sm:"repeat(3, 1fr)"}, // Sets 3 equal-height rows
            gap: 2, // Adjust as needed
          }} 
          container 
          size={{ xs: 12, sm: 12 }} 
          spacing={2}>
          <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
            <Typography variant="body1" gutterBottom>
              {t('STR')}
            </Typography>
            <Select
              label={t('STR')}
              variant="outlined"
              className="darkspace-select-small"
              value={str === 0 ? '' : str}
              onChange={(e) => {
                handleAcceptAbilityScores(Number(e.target.value), dex, con, int, wis, cha);
              }}              
            >
                {allowedAbilityScoreValues.map((_, index) => (
                  <MenuItem key={index + 3} value={index + 3}>{index + 3}</MenuItem>
                ))} 
            </Select>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
            <Typography variant="body1" gutterBottom>
              {t('DEX')}
            </Typography>
            <Select
              label={t('DEX')}
              variant="outlined"
              className="darkspace-select-small"
              value={dex === 0 ? '' : dex}
              onChange={(e) => {
                handleAcceptAbilityScores(str, Number(e.target.value), con, int, wis, cha);
              }}              
            >
                {allowedAbilityScoreValues.map((_, index) => (
                  <MenuItem key={index + 3} value={index + 3}>{index + 3}</MenuItem>
                ))} 
            </Select>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
            <Typography variant="body1" gutterBottom>
              {t('CON')}
            </Typography>
            <Select
              label={t('CON')}
              variant="outlined"
              className="darkspace-select-small"
              value={con === 0 ? '' : con}
              onChange={(e) => {
                handleAcceptAbilityScores(str, dex, Number(e.target.value), int, wis, cha);
              }}              
            >
                {allowedAbilityScoreValues.map((_, index) => (
                  <MenuItem key={index + 3} value={index + 3}>{index + 3}</MenuItem>
                ))} 
            </Select>
          </Grid>        
          <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
            <Typography variant="body1" gutterBottom>
              {t('INT')}
            </Typography>
            <Select              
              label={t('INT')}
              variant="outlined"
              className="darkspace-select-small"
              value={int === 0 ? '' : int}
              onChange={(e) => {
                handleAcceptAbilityScores(str, dex, con, Number(e.target.value), wis, cha);
              }}              
            >
                {allowedAbilityScoreValues.map((_, index) => (
                  <MenuItem key={index + 3} value={index + 3}>{index + 3}</MenuItem>
                ))} 
            </Select>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
            <Typography variant="body1" gutterBottom>
              {t('WIS')}
            </Typography>
            <Select              
              label={t('WIS')}
              variant="outlined"              
              className="darkspace-select-small" 
              value={wis === 0 ? '' : wis}
              onChange={(e) => {
                handleAcceptAbilityScores(str, dex, con, int, Number(e.target.value), cha);
              }}              
            >
                {allowedAbilityScoreValues.map((_, index) => (
                  <MenuItem key={index + 3} value={index + 3}>{index + 3}</MenuItem>
                ))} 
            </Select>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
            <Typography variant="body1" gutterBottom>
              {t('CHA')}
            </Typography>
            <Select              
              label={t('CHA')}
              variant="outlined"
              className="darkspace-select-small" 
              value={cha === 0 ? '' : cha}
              onChange={(e) => {                                
                handleAcceptAbilityScores(str, dex, con, int, wis, Number(e.target.value));
              }}              
            >               
               {allowedAbilityScoreValues.map((_, index) => (
                 <MenuItem key={index + 3} value={index + 3}>{index + 3}</MenuItem>
               ))} 
            </Select>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AbilityScoresComponent;
