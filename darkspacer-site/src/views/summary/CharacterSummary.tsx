//component that summarizes the data loaded from a Character class defined 
// in /home/msp/dev/DarkSpacersSite/darkspacer-site/src/models/game/Character.ts in a table format
import React from 'react';
import { Container, Grid, Typography }
from '@mui/material';
import {
  type CharacterState,  
} from '../../slices/characterSlice';
import { useTranslation } from 'react-i18next';
import { GameMath } from '../../utils/GameMath';
import { CalculatedCharacter } from '../../models/view/CalculatedCharacter';
import { CharacterNameState } from '../../slices/characterNameSlice';
import { AbilityScoresState } from '../../slices/abilityScoresSlice';
import { CharacterBackgroundState } from '../../slices/characterBackgroundsSlice';

interface CharacterSummaryProps {
  character: CharacterState | null;
  characterName: CharacterNameState | null;
  characterAbilityScores: AbilityScoresState | null;
  characterBackground: CharacterBackgroundState | null;
  characterSpeciesState: any | null;
  archetypeState: any | null;
}


const getAbilityScoreText = (abilityScore: number) : string => {
  if (abilityScore == 0) {
    return '-';
  }

  return `${abilityScore} (${GameMath.AbilityScoreToModifierString(abilityScore)})`;
}

const CharacterSummary: React.FC<CharacterSummaryProps> = ({ character, characterName, characterAbilityScores, characterBackground, characterSpeciesState, archetypeState }) => {
  const { t } = useTranslation();

  if (!character || !characterName || !characterAbilityScores || !characterBackground || !characterSpeciesState || !archetypeState) {
    return <Typography variant="body1">{t('No character data available.')}</Typography>;
  }

  const calcChar = new CalculatedCharacter(character, characterName, characterAbilityScores, characterBackground, characterSpeciesState, archetypeState);

  let rolledHitPointsExplanation : React.ReactElement = <> - </>;
  
  if (calcChar.rolledHitPoints > 0) {
    rolledHitPointsExplanation = <>
      { calcChar.rolledHitPoints }    
      { calcChar.hasStout && ` (+2 hp from stout plus advantage on hp rolls Rolls: ${calcChar.hitPoints} and ${calcChar.hitPoints2})` }
      {` Con modifier: ${GameMath.AbilityScoreToModifierString(calcChar.modifiedConstitution)}`}</>;
  }


  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={{xs: 12, md: 12}}>
          <Typography variant="h4" className={"has-rocket"} style={{ fontFamily: 'RocketRinder' }} gutterBottom>
            {t('Character Summary')}
          </Typography>
          <Grid size={{xs: 12, md: 12}}>
            <Typography variant="body1" gutterBottom>
              <strong>{t('Name')}</strong>: {calcChar.characterName}
            </Typography>
          </Grid>
          <Grid size={{xs: 12, md: 12}}>
            <Typography variant="body1" gutterBottom>
              <strong>{t('Ability Scores')}</strong>
            </Typography>
          </Grid>
          <Grid size={{xs: 12, md: 12}}>
            <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>{t('STR')}</strong>: { getAbilityScoreText(calcChar.modifiedStrength) }
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>{t('DEX')}</strong>: { getAbilityScoreText(calcChar.modifiedDexterity) }
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>{t('CON')}</strong>: { getAbilityScoreText(calcChar.modifiedConstitution) }
              </Typography>
            </Grid>        
            <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>{t('INT')}</strong>: { getAbilityScoreText(calcChar.modifiedIntelligence) }
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>{t('WIS')}</strong>: { getAbilityScoreText(calcChar.modifiedWisdom) }
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>{t('CHA')}</strong>: { getAbilityScoreText(calcChar.modifiedCharisma) }
              </Typography>
            </Grid>
          </Grid> 
          <Grid size={{xs: 12, md: 12}}>
            <Typography variant="body1" gutterBottom>
              <strong>{t('Species')}</strong>: {calcChar.characterSpeciesName} - {calcChar.characterSpeciesDescriptions?.join(' ')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>{t('Species Trait')}</strong>: {calcChar.selectedCharacterSpeciesTrait ? `${calcChar.selectedCharacterSpeciesTrait.Name} - ${calcChar.selectedCharacterSpeciesTrait.Description}` : ' - '}
            </Typography>
          </Grid>
          <Grid size={{xs: 12, md: 12}}>
            <Typography variant="body1" gutterBottom>
              <strong>{t('Archetype')}</strong>: {calcChar.selectedArchetype ? `${calcChar.selectedArchetype.Name} - ${calcChar.selectedArchetype.Description}` : ' - '}
            </Typography>
            {calcChar.selectedArchetypeFirstLevelTalents && (
              <Typography variant="body1" gutterBottom>
                <strong>{t('Archetype First Level Talent')}</strong>: {calcChar.selectedArchetypeFirstLevelTalent?.Name} - {calcChar.selectedArchetypeFirstLevelTalent?.Description}
              </Typography>
            )}
          </Grid>
          <Grid size={{xs: 12, md: 12}}>
            <Typography variant="body1" gutterBottom>
              <strong>{t('Rolled Hit points')}</strong>: 
                { rolledHitPointsExplanation}
            </Typography>        
            <Typography variant="body1" gutterBottom>
              <strong>{t('Total HP')}</strong>: { calcChar.rolledHitPoints > 0 ? calcChar.totalHitPoints : ' - '}
            </Typography>
          </Grid>
          <Grid size={{xs: 12, md: 12}}>
            <Typography variant="body1" gutterBottom>
              <strong>{t(`Background:`)}</strong> {calcChar.selectedBackground ? `${calcChar.selectedBackground.Name}: ${calcChar.selectedBackground.Description}` : ' - '}
            </Typography>
          </Grid>       
        
          <Grid size={{xs: 12, md: 12}}>
            <Typography variant="body1" gutterBottom>
              <strong>{t('Motivation')}</strong>:  {calcChar.selectedMotivation ? `${calcChar.selectedMotivation.Name} - ${calcChar.selectedMotivation.Description}` : ' - '}
            </Typography>
          </Grid>
        </Grid>                          
      </Grid>
    </Container>  
  );
};
export default CharacterSummary;
