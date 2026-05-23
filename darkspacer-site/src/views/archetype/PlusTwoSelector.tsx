// component to select a motivation for a character
import React from 'react';
import { Container, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import RandomDiceButton, { DiceButtonStyleRightOfSelect } from '../common/RandomDiceButton';
import { BonusType } from '../../models/rules/BonusType';
import { BonusRule } from '../../models/rules/BonusRule';
import { BonusRules } from '../../utils/BonusRules';
import { GamingLingo } from '../../utils/GamingLingo';

interface PlusTwoSelectorProps {
  handleSelectAbilityScoreRaisedByPlusTwoRule: (abilityScoreType: BonusType | null) => void;  
  randomlyPickAbilityScoreRaisedByPlusTwoRule: () => void;
  abilityScoreRaisedByPlusTwoRule: BonusType | null;
  abilityScoreRule: BonusRule | null;
  id: string;
}

const PlusTwoSelector: React.FC<PlusTwoSelectorProps> = ({ 
    handleSelectAbilityScoreRaisedByPlusTwoRule, 
    randomlyPickAbilityScoreRaisedByPlusTwoRule, 
    abilityScoreRaisedByPlusTwoRule, 
    abilityScoreRule,
    id }) => {
  const { t } = useTranslation();
  let abilityScoreTypeOptions : BonusType[] = BonusRules.getAbilityScoreTypeOptions(abilityScoreRule);

  const optionsContainsExpertKnowledge = abilityScoreTypeOptions.includes(BonusType.ExpertKnowledge);
  let message = t(`Which ability score to apply +2 to?`);  
  if (optionsContainsExpertKnowledge) {
    message = t(`Which bonus would you like?`);
  }

  return (
    <Container>
      <Grid container spacing={2} alignItems="left" style={{ marginBottom: '16px' }}>        
        <Grid size={{xs: 12, md: 12}}>
          <Typography variant="body1" gutterBottom>
            {t(message)}
          </Typography>     
          <Select id={id} 
            className="darkspace-select some-times-wider" 
            title={``}
            value={abilityScoreRaisedByPlusTwoRule ? abilityScoreRaisedByPlusTwoRule : ''}
            onChange={(e:any) => {
              const value = e.target.value as BonusType;          
              if (value) {
                console.log(`Selected Ability Score:`, value);
                handleSelectAbilityScoreRaisedByPlusTwoRule(value);
              }
            }}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0}}
            >
            {abilityScoreTypeOptions.map((abilityScoreType: BonusType) => (
              <MenuItem key={abilityScoreType} value={abilityScoreType} title={`${abilityScoreType}`}>
                {GamingLingo.getBonusName(abilityScoreType)}
              </MenuItem>
            ))}
          </Select>                   
          <RandomDiceButton clickHandler={() => 
            randomlyPickAbilityScoreRaisedByPlusTwoRule()} styles={DiceButtonStyleRightOfSelect} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlusTwoSelector;