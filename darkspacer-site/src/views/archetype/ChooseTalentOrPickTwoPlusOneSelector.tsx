// component to select a motivation for a character
import React from 'react';
import { Container, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import RandomDiceButton, { DiceButtonStyleRightOfSelect } from '../common/RandomDiceButton';
import { BonusType } from '../../models/rules/BonusType';
import { BonusRule } from '../../models/rules/BonusRule';
import { BonusRules } from '../../utils/BonusRules';


interface ChooseTalentOrPickTwoPlusOneSelectorProps {
  handleSelectAbilityScoreRaisedByPlusOneRule1: (abilityScoreType: BonusType | null) => void;  
  randomlyPickAbilityScoreRaisedByPlusOneRule1: () => void;
  abilityScoreRaisedByPlusOneRule1: BonusType | null;
  handleSelectAbilityScoreRaisedByPlusOneRule2: (abilityScoreType: BonusType | null) => void;  
  randomlyPickAbilityScoreRaisedByPlusOneRule2: () => void;
  abilityScoreRaisedByPlusOneRule2: BonusType | null;
  id: string;
}

const ChooseTalentOrPickTwoPlusOneSelector: React.FC<ChooseTalentOrPickTwoPlusOneSelectorProps> = ({ 
    handleSelectAbilityScoreRaisedByPlusOneRule1, 
    randomlyPickAbilityScoreRaisedByPlusOneRule1, 
    abilityScoreRaisedByPlusOneRule1, 
    handleSelectAbilityScoreRaisedByPlusOneRule2, 
    randomlyPickAbilityScoreRaisedByPlusOneRule2, 
    abilityScoreRaisedByPlusOneRule2, 
    id }) => {
  const { t } = useTranslation();
  let abilityScoreTypeOptions : BonusType[] = BonusRules.getAbilityScoreTypeOptions(BonusRule.PickPlusTwoStats);
  return (
    <Container>
      <Grid container spacing={2} alignItems="left" style={{ marginBottom: '16px' }}>
        <Grid size={{xs: 12, md: 12}}>
          <Typography variant="body1" gutterBottom>
            {t(`Choose another talent above or pick two ability scores to apply +1 to:`)}
          </Typography>    
        </Grid>
        <Grid size={{xs: 12, md: 6}}> 
          <Select id={`${id}-1`} 
            className="darkspace-select" 
            title={``}
            value={abilityScoreRaisedByPlusOneRule1 ? abilityScoreRaisedByPlusOneRule1 : ''}
            onChange={(e:any) => {
              const value = e.target.value as BonusType;          
              if (value) {
                console.log(`Selected Ability Score:`, value);
                handleSelectAbilityScoreRaisedByPlusOneRule1(value);
              }
            }}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, width: '50%'}}
            >
            {abilityScoreTypeOptions.map((abilityScoreType: BonusType) => (
              <MenuItem key={abilityScoreType} value={abilityScoreType} title={`${abilityScoreType}`}>
                {abilityScoreType}
              </MenuItem>
            ))}
          </Select>                   
          <RandomDiceButton clickHandler={() => 
            randomlyPickAbilityScoreRaisedByPlusOneRule1()} styles={DiceButtonStyleRightOfSelect} />
        </Grid>
        <Grid size={{xs: 12, md: 6}}> 
          <Select 
            id={`${id}-2`}
            className="darkspace-select" 
            title={``}
            value={abilityScoreRaisedByPlusOneRule2 ? abilityScoreRaisedByPlusOneRule2 : ''}
            onChange={(e:any) => {
              const value = e.target.value as BonusType;          
              if (value) {
                console.log(`Selected Ability Score:`, value);
                handleSelectAbilityScoreRaisedByPlusOneRule2(value);
              }
            }}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, width: '50%'}}
            >
            {abilityScoreTypeOptions.map((abilityScoreType: BonusType) => (
              <MenuItem key={abilityScoreType} value={abilityScoreType} title={`${abilityScoreType}`}>
                {abilityScoreType}
              </MenuItem>
            ))}
          </Select>                   
          <RandomDiceButton clickHandler={() => 
            randomlyPickAbilityScoreRaisedByPlusOneRule2()} styles={DiceButtonStyleRightOfSelect} />  
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChooseTalentOrPickTwoPlusOneSelector;