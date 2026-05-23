// component for selecting an archetype for a character
import React from 'react';
import { Container, Grid, MenuItem, Select, Typography } from '@mui/material';
import { Archetype } from '../../models/rules/Archetype';
import { useTranslation } from 'react-i18next';
import { ArchetypeRepository } from '../../repository/ArchetypeRepository';
import { Talent } from '../../models/rules/Talent';
import RandomDiceButton, { DiceButtonStyleRightOfSelect } from '../common/RandomDiceButton';
import { HitPointRule } from '../../models/rules/HitPointRule';
import { BonusRule } from '../../models/rules/BonusRule';
import { BonusRules } from '../../utils/BonusRules';
import PlusTwoSelector from './PlusTwoSelector';
import { BonusType } from '../../models/rules/BonusType';
import ChooseTalentOrPickTwoPlusOneSelector from './ChooseTalentOrPickTwoPlusOneSelector';
import { GameMath } from '../../utils/GameMath';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { ArchetypeState, setAbilityScoreRaisedByPlusOneRule1, setAbilityScoreRaisedByPlusOneRule1Add, setAbilityScoreRaisedByPlusOneRule2, setAbilityScoreRaisedByPlusOneRule2Add, setAbilityScoreRaisedByPlusTwoRule, setAbilityScoreRaisedByPlusTwoRuleAdd, setArchetypeId, setArchetypeTalentAddId, setArchetypeTalentId, setHitPoints } from '../../slices/archetypeSlice';
import { TraitRules } from '../../utils/TraitRules';
import { RandomSelector } from '../../utils/RandomSelector';
import { RandomNumberGenerator } from '../../generators/RandomNumberGenerator';

const generateViewModel:any = (archetypeTalentId: number | null, archetypeTalentAddId: number | null, selectedArchetype: Archetype, archetypes: Archetype[]) => {
  if (!selectedArchetype) {
    return {
      "selectedArchetype": {
        "Id": 0,
        "Name": " - ",
        "Description": " - ",
        "HitPointDie": 0,
        "Weapons": " - ",
        "ArmorAllowed": " - ",
        "Talents": [],
        "FirstLevelTalents": []
      },
      "selectedArchetypeFirstLevelTalents": [],
      "selectedArchetypeTalents": [],
      "selectedArchetypeFirstLevelTalent": null,
      "selectedArchetypeFirstLevelTalentAdd": null,
      "hpList": [],
      "hasStout": false,
      "hasPickPlusTwoStatsRule": false,
      "hasAddPlusTwoRule": false,
      "abiltyScorePlusTwoRule": null,
      "hasPickPlusTwoStatsRuleAdd": false,
      "hasAddPlusTwoRuleAdd": false,
      "abiltyScorePlusTwoRuleAdd": null,
    };
  } else {
    const selectedArchetypeFirstLevelTalents = selectedArchetype ? selectedArchetype.FirstLevelTalents : [];
    const selectedArchetypeTalents = selectedArchetype ? selectedArchetype.Talents : [];
    const selectedArchetypeFirstLevelTalent : Talent | null |undefined = archetypeTalentId ? selectedArchetypeFirstLevelTalents.find(talent => talent.Id === archetypeTalentId) : null;  
    const selectedArchetypeFirstLevelTalentAdd : Talent | null |undefined = archetypeTalentAddId ? selectedArchetypeFirstLevelTalents.find(talent => talent.Id === archetypeTalentAddId) : null;  
    
    const hpList = Array.from({ length: selectedArchetype.HitPointDie }, (_, i) => i + 1);
    
    // If the selected archetype or the archectype first level talent has the Stout hit point rule,
    const hasStout = selectedArchetype.Talents.some(talent => talent.HitPointRule === HitPointRule.Stout) ||
      selectedArchetypeFirstLevelTalent?.HitPointRule === HitPointRule.Stout;

    const hasPickPlusTwoStatsRule = BonusRules.hasPickPlusTwoStatsRule(selectedArchetype, selectedArchetypeFirstLevelTalent);
    const hasAddPlusTwoRule = BonusRules.hasAddPlusTwoRule(selectedArchetype, selectedArchetypeFirstLevelTalent);
    const abiltyScorePlusTwoRule : BonusRule | null = BonusRules.getAddPlusTwoRule(selectedArchetypeFirstLevelTalent);

    const hasPickPlusTwoStatsRuleAdd = BonusRules.hasPickPlusTwoStatsRule(selectedArchetype, selectedArchetypeFirstLevelTalentAdd);
    const hasAddPlusTwoRuleAdd = BonusRules.hasAddPlusTwoRule(selectedArchetype, selectedArchetypeFirstLevelTalentAdd);
    const abiltyScorePlusTwoRuleAdd : BonusRule | null = BonusRules.getAddPlusTwoRule(selectedArchetypeFirstLevelTalentAdd);

    return {
      "selectedArchetype": selectedArchetype,
      "selectedArchetypeFirstLevelTalents": selectedArchetypeFirstLevelTalents,
      "selectedArchetypeTalents": selectedArchetypeTalents,
      "selectedArchetypeFirstLevelTalent": selectedArchetypeFirstLevelTalent,
      "selectedArchetypeFirstLevelTalentAdd": selectedArchetypeFirstLevelTalentAdd,
      "hpList": hpList,
      "hasStout": hasStout,
      "hasPickPlusTwoStatsRule": hasPickPlusTwoStatsRule,
      "hasAddPlusTwoRule": hasAddPlusTwoRule,
      "abiltyScorePlusTwoRule": abiltyScorePlusTwoRule,
      "hasPickPlusTwoStatsRuleAdd": hasPickPlusTwoStatsRuleAdd,
      "hasAddPlusTwoRuleAdd": hasAddPlusTwoRuleAdd,
      "abiltyScorePlusTwoRuleAdd": abiltyScorePlusTwoRuleAdd,
    };
  }

};

const ArchetypeSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const archetypeState: ArchetypeState = useAppSelector((state: RootState) => state.archetypeState);
  const characterAbilityScoresState = useAppSelector((state: RootState) => state.abilityScoresState);
  const characterSpeciesState = useAppSelector((state: RootState) => state.characterSpeciesState);


  const archetypeId: number | null = archetypeState.archetypeId;
  const archetypeTalentId: number | null = archetypeState.archetypeTalentId;
  const abilityScoreRaisedByPlusTwoRule: BonusType | null = archetypeState.abilityScoreRaisedByPlusTwoRule;
  const abilityScoreRaisedByPlusOneRule1: BonusType | null = archetypeState.abilityScoreRaisedByPlusOneRule1;  
  const abilityScoreRaisedByPlusOneRule2: BonusType | null = archetypeState.abilityScoreRaisedByPlusOneRule2;
  const characterSpeciesTraitIsAmbitious: boolean = TraitRules.isAmbitious(characterSpeciesState);
  const archetypeTalentAddId: number | null = archetypeState.archetypeTalentAddId;
  const abilityScoreRaisedByPlusTwoRuleAdd: BonusType | null = archetypeState.abilityScoreRaisedByPlusTwoRuleAdd;
  const abilityScoreRaisedByPlusOneRule1Add: BonusType | null = archetypeState.abilityScoreRaisedByPlusOneRule1Add;
  const abilityScoreRaisedByPlusOneRule2Add: BonusType | null = archetypeState.abilityScoreRaisedByPlusOneRule2Add;
  const hitPoints: number = archetypeState.hitPoints;
  const hitPoints2: number = archetypeState.hitPoints2;
  const characterCon: number = characterAbilityScoresState.characterCon;


  const archetypes = ArchetypeRepository.getAll();
  const selectedArchetype = archetypes.find((archetype) => archetype.Id === archetypeId) || ''
  const vm = generateViewModel(archetypeTalentId, archetypeTalentAddId, selectedArchetype, archetypes);

  const conModValue = GameMath.AbilityScoreToModifier(characterCon);
  const conMod = GameMath.AbilityScoreToModifierString(characterCon);
  const totalHitPoints = BonusRules.calcHp(hitPoints, hitPoints2, conModValue, vm.hasStout);


  const handleSelectArchetype = (archetypeId: number | null) => {
    if (archetypeId) {
      console.log(`Selected Archetype ID:`, archetypeId);
      if (archetypeId !== archetypeState.archetypeId) {
        // if archetype changed, clear out talent selection
        dispatch(setArchetypeTalentId(null));
      }
      dispatch(setArchetypeId(archetypeId));      
    }
  }

  const handleSelectArchetypeTalent = (archetypeTalentId: number | null) => {
    if (archetypeTalentId) {
      dispatch(setArchetypeTalentId(archetypeTalentId));
    }
  }

  const handleSelectArchetypeTalentAdd = (archetypeTalentId: number | null) => {
    if (archetypeTalentId) {
      dispatch(setArchetypeTalentAddId(archetypeTalentId));
    }
  }

  const randomlyPickArchetypeTalent = (selectedArchetypeId: number | null) => {
    console.log('get talent for archetype:', selectedArchetypeId, archetypeState.archetypeId);
    const archetypeId = selectedArchetypeId || archetypeState.archetypeId;
    const archetypeTalentId = RandomSelector.SelectArchetypeTalentIdFromArchetype(archetypeId);
    dispatch(setArchetypeTalentId(archetypeTalentId));
  }

  const randomlyPickArchetypeTalentAdd = (selectedArchetypeId: number | null) => {
    console.log('get talent for archetype:', selectedArchetypeId, archetypeState.archetypeId);
    const archetypeId = selectedArchetypeId || archetypeState.archetypeId;
    const archetypeTalentId = RandomSelector.SelectArchetypeTalentIdFromArchetype(archetypeId);    
    dispatch(setArchetypeTalentAddId(archetypeTalentId));
  }

  const handleSelectAbilityScoreRaisedByPlusTwoRule = (abilityScoreType: BonusType | null) => {
    dispatch(setAbilityScoreRaisedByPlusTwoRule(abilityScoreType));    
  }  

  const randomlyPickAbilityScoreRaisedByPlusTwoRule = () => {
    const abilityScoreType = RandomSelector.SelectAbilityScoreFromRuleOnTalent(archetypeState.archetypeId, archetypeState.archetypeTalentId);  
    handleSelectAbilityScoreRaisedByPlusTwoRule(abilityScoreType || null);
  }

  const handleSelectAbilityScoreRaisedByPlusTwoRuleAdd = (abilityScoreType: BonusType | null) => {
    dispatch(setAbilityScoreRaisedByPlusTwoRuleAdd(abilityScoreType));
  }

  const randomlyPickAbilityScoreRaisedByPlusTwoRuleAdd = () => {
    const abilityScoreType = RandomSelector.SelectAbilityScoreFromRuleOnTalent(archetypeState.archetypeId, archetypeState.archetypeTalentAddId);  
    handleSelectAbilityScoreRaisedByPlusTwoRuleAdd(abilityScoreType || null);
  }  

  const handleSelectAbilityScoreRaisedByPlusOneRule1 = (abilityScoreType: BonusType | null) => {
    dispatch(setAbilityScoreRaisedByPlusOneRule1(abilityScoreType));        
  }

  const handleSelectAbilityScoreRaisedByPlusOneRule1Add = (abilityScoreType: BonusType | null) => {
    dispatch(setAbilityScoreRaisedByPlusOneRule1Add(abilityScoreType));
  }

  const randomlyPickAbilityScoreRaisedByPlusOneRule1 = () => {
    const abilityScoreType = RandomSelector.SelectAbilityScoreFromRuleOnTalent(archetypeState.archetypeId, archetypeState.archetypeTalentId);  
    handleSelectAbilityScoreRaisedByPlusOneRule1(abilityScoreType || null);
  }

  const randomlyPickAbilityScoreRaisedByPlusOneRule1Add = () => {
    const abilityScoreType = RandomSelector.SelectAbilityScoreFromRuleOnTalent(archetypeState.archetypeId, archetypeState.archetypeTalentAddId);  
    handleSelectAbilityScoreRaisedByPlusOneRule1Add(abilityScoreType || null);
  }

  const handleSelectAbilityScoreRaisedByPlusOneRule2 = (abilityScoreType: BonusType | null) => {
    dispatch(setAbilityScoreRaisedByPlusOneRule2(abilityScoreType));
  }

  const handleSelectAbilityScoreRaisedByPlusOneRule2Add = (abilityScoreType: BonusType | null) => {
    dispatch(setAbilityScoreRaisedByPlusOneRule2Add(abilityScoreType));
  }

  const randomlyPickAbilityScoreRaisedByPlusOneRule2 = () => {
    const abilityScoreType = RandomSelector.SelectAbilityScoreFromRuleOnTalent(archetypeState.archetypeId, archetypeState.archetypeTalentId);
    handleSelectAbilityScoreRaisedByPlusOneRule2(abilityScoreType || null);
  }

  const randomlyPickAbilityScoreRaisedByPlusOneRule2Add = () => {
    const abilityScoreType = RandomSelector.SelectAbilityScoreFromRuleOnTalent(archetypeState.archetypeId, archetypeState.archetypeTalentAddId);
    handleSelectAbilityScoreRaisedByPlusOneRule2Add(abilityScoreType || null);
  }

  const handleSelectHitPoints = (hitPoints: number, hitPoints2: number) => {
    console.log(`Selected Hit Points:`, hitPoints);
    dispatch(setHitPoints([hitPoints, hitPoints2]));
  }
  
  const randomlyPickHitPoints = (selectedArchetypeId: number | null) => {
    const archetypeId = selectedArchetypeId || archetypeState.archetypeId;
    const archeType: Archetype | undefined = ArchetypeRepository.getAll().find((a) => a.Id === archetypeId);
    if (archeType) {
      const hitPoints = new RandomNumberGenerator().generate(1, archeType.HitPointDie);
      const hitPoints2 = new RandomNumberGenerator().generate(1, archeType.HitPointDie);
      handleSelectHitPoints(hitPoints, hitPoints2);
    }
  }

  return (
    <Container>
      <Grid container spacing={2} alignItems="left" style={{ marginBottom: '16px' }}>
        <Grid size={{ xs: 12, sm: 12 }}>
          <Typography variant="h4" className={"has-rocket"} style={{ fontFamily: 'RocketRinder' }} gutterBottom>
            {t(`Archetype${ vm.selectedArchetype.Id !== 0 ? ": " + vm.selectedArchetype?.Name : ''}`)}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Select id="archetype-select"
            className="darkspace-select"
            value={archetypeId ? archetypeId : ''}
            onChange={(e: any) => {
              console.log('Archetype select change:', e.target.value);
              const value = Number(e.target.value);
              handleSelectArchetype(value);
            }}
            fullWidth>
            {archetypes.map((archetype: Archetype) => (
              <MenuItem key={archetype.Id} value={archetype.Id}>
                <strong>{archetype.Name}</strong>&nbsp;- d{archetype.HitPointDie}
              </MenuItem>
            ))}
          </Select>
        </Grid>        
        {vm.selectedArchetype.Id !== 0 && 
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body1" gutterBottom>
              {vm.selectedArchetype.Description}
              </Typography>
              <Typography variant="body1" gutterBottom>
              <strong>Weapons: </strong> {vm.selectedArchetype.Weapons}
              </Typography>
              <Typography variant="body1" gutterBottom>
              <strong>Armor: </strong> {vm.selectedArchetype.ArmorAllowed}
              </Typography>
            </Grid>     
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body1" gutterBottom>
              Hit Point per Level: {vm.selectedArchetype.HitPointDie ? `d${vm.selectedArchetype.HitPointDie}` : ' - '}
              </Typography>
              <Typography variant="body1" gutterBottom>
              {vm.selectedArchetype.Name} Talents:
              <ul>
                {vm.selectedArchetypeTalents.map((talent: Talent) => (
                  <li key={talent.Id}>
                    <strong>{talent.Name}</strong> - {talent.Description}
                  </li>
                ))}
              </ul>
              </Typography>
            </Grid>  
            <Grid size={{ xs: 12, md: 12 }}> 
              <Typography variant="h5" gutterBottom>
                {vm.selectedArchetype.Name} First Level Talent:
              </Typography>
              <table cellSpacing={0} cellPadding={3}>
                <tr>
                  <td className={"ranged-cell-header"}><strong>2d6</strong></td>
                  <td className={"ranged-cell-header left"}><strong>Talents</strong></td>
                </tr>
                {vm.selectedArchetypeFirstLevelTalents.map((talent: Talent) => (
                  <tr key={talent.Id}>
                    <td className={"ranged-cell nobr"}><strong>{ talent.Name }</strong></td>
                    <td className={"ranged-cell left"}>{talent.Description}</td>
                  </tr>
                ))}
              </table>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>          
              <Typography variant="body1" gutterBottom>
                <Select id="archetype-first-level-talent-select"
                  className="darkspace-select"
                  value={vm.selectedArchetypeFirstLevelTalent?.Id || ''}
                  title={`${vm.selectedArchetypeFirstLevelTalent?.Name} - ${vm.selectedArchetypeFirstLevelTalent?.Description}`}
                  onChange={(e) => {
                    console.log('Archetype select change:', e.target.value);
                    const value = Number(e.target.value);
                    handleSelectArchetypeTalent(value);
                  }}
                  style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, maxWidth: '70%', minWidth: '70%' }}
                  renderValue={() => {
                    return <strong>{vm.selectedArchetypeFirstLevelTalent?.Name}</strong>;
                  }}
                  >
                  {vm.selectedArchetypeFirstLevelTalents.map((talent: Talent) => (
                    <MenuItem key={talent.Id} 
                      value={talent.Id} 
                      title={`${talent.Name} - ${talent.Description}`}
                      sx={{ whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: 1.2 }}
                      >
                      <Typography variant='body1'><strong>{talent.Name}:</strong><br />{talent.Description}</Typography>
                    </MenuItem>
                  ))}
                </Select>
                <RandomDiceButton clickHandler={() => randomlyPickArchetypeTalent(null)} 
                  styles={DiceButtonStyleRightOfSelect} />
              </Typography>
            </Grid> 
            { vm.hasAddPlusTwoRule && 
              <Grid size={{ xs: 12, md: 12 }}>
                <PlusTwoSelector
                  id={"ability-score-select"}
                  handleSelectAbilityScoreRaisedByPlusTwoRule={handleSelectAbilityScoreRaisedByPlusTwoRule}
                  randomlyPickAbilityScoreRaisedByPlusTwoRule={randomlyPickAbilityScoreRaisedByPlusTwoRule}
                  abilityScoreRaisedByPlusTwoRule={abilityScoreRaisedByPlusTwoRule}
                  abilityScoreRule={vm.abiltyScorePlusTwoRule}
                />
              </Grid> 
            }
            { vm.hasPickPlusTwoStatsRule && 
              <Grid size={{ xs: 12, md: 12 }}>
                <ChooseTalentOrPickTwoPlusOneSelector
                  id={"ability-score-select-pick-two"}
                  handleSelectAbilityScoreRaisedByPlusOneRule1={handleSelectAbilityScoreRaisedByPlusOneRule1}
                  randomlyPickAbilityScoreRaisedByPlusOneRule1={randomlyPickAbilityScoreRaisedByPlusOneRule1}
                  abilityScoreRaisedByPlusOneRule1={abilityScoreRaisedByPlusOneRule1}
                  handleSelectAbilityScoreRaisedByPlusOneRule2={handleSelectAbilityScoreRaisedByPlusOneRule2}
                  randomlyPickAbilityScoreRaisedByPlusOneRule2={randomlyPickAbilityScoreRaisedByPlusOneRule2}
                  abilityScoreRaisedByPlusOneRule2={abilityScoreRaisedByPlusOneRule2}
                />
              </Grid> 
            }

          { characterSpeciesTraitIsAmbitious &&
            <Grid size={{ xs: 12, md: 12 }}>          
              <Typography variant="body1" gutterBottom>
                <Select id="archetype-first-level-talent-select-add"
                  className="darkspace-select"
                  value={vm.selectedArchetypeFirstLevelTalentAdd?.Id || ''}
                  title={`${vm.selectedArchetypeFirstLevelTalentAdd?.Name} - ${vm.selectedArchetypeFirstLevelTalentAdd?.Description}`}
                  onChange={(e) => {
                    console.log('Archetype select change:', e.target.value);
                    const value = Number(e.target.value);
                    handleSelectArchetypeTalentAdd(value);
                  }}
                  style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, maxWidth: '70%', minWidth: '70%' }}
                  renderValue={() => {
                    return <strong>{vm.selectedArchetypeFirstLevelTalentAdd?.Name}</strong>;
                  }}
                  >
                  {vm.selectedArchetypeFirstLevelTalents.map((talent: Talent) => (
                    <MenuItem key={talent.Id} 
                      value={talent.Id} 
                      title={`${talent.Name} - ${talent.Description}`}
                      sx={{ whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: 1.2 }}
                      >
                      <Typography variant='body1'><strong>{talent.Name}:</strong><br />{talent.Description}</Typography>
                    </MenuItem>
                  ))}
                </Select>
                <RandomDiceButton clickHandler={() => randomlyPickArchetypeTalentAdd(null)} 
                  styles={DiceButtonStyleRightOfSelect} />
              </Typography>
            </Grid> 
            }
            { vm.hasAddPlusTwoRuleAdd && 
              <Grid size={{ xs: 12, md: 12 }}>
                <PlusTwoSelector
                  id={"ability-score-select-add"}
                  handleSelectAbilityScoreRaisedByPlusTwoRule={handleSelectAbilityScoreRaisedByPlusTwoRuleAdd}
                  randomlyPickAbilityScoreRaisedByPlusTwoRule={randomlyPickAbilityScoreRaisedByPlusTwoRuleAdd}
                  abilityScoreRaisedByPlusTwoRule={abilityScoreRaisedByPlusTwoRuleAdd}
                  abilityScoreRule={vm.abiltyScorePlusTwoRuleAdd}
                />
              </Grid> 
            }
            { vm.hasPickPlusTwoStatsRuleAdd && 
              <Grid size={{ xs: 12, md: 12 }}>
                <ChooseTalentOrPickTwoPlusOneSelector
                  id={"ability-score-select-pick-two-add"}                
                  handleSelectAbilityScoreRaisedByPlusOneRule1={handleSelectAbilityScoreRaisedByPlusOneRule1Add}
                  randomlyPickAbilityScoreRaisedByPlusOneRule1={randomlyPickAbilityScoreRaisedByPlusOneRule1Add}
                  abilityScoreRaisedByPlusOneRule1={abilityScoreRaisedByPlusOneRule1Add}
                  handleSelectAbilityScoreRaisedByPlusOneRule2={handleSelectAbilityScoreRaisedByPlusOneRule2Add}
                  randomlyPickAbilityScoreRaisedByPlusOneRule2={randomlyPickAbilityScoreRaisedByPlusOneRule2Add}
                  abilityScoreRaisedByPlusOneRule2={abilityScoreRaisedByPlusOneRule2Add}
                />
              </Grid> 
            }            
            <Grid size={{ xs: 12, md: 12 }}>
              <Typography variant="h5" gutterBottom>
                {t('Hit Points:')}
              </Typography>
              <Typography variant="body1" gutterBottom>
                  <Select id="hp-select"
                    className="darkspace-select" 
                    title={`d${vm.selectedArchetype.HitPointDie} per level`}
                    value={hitPoints || ''}
                    onChange={(e) => {
                      const value = Number(e.target.value);          
                      if (value) {
                        console.log(`Selected HP:`, value);                    
                        handleSelectHitPoints(value, value);
                      }
                    }}
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, maxWidth: '70%', minWidth: '70%' }}
                    >
                    {vm.hpList.map((hp: number) => (
                      <MenuItem key={hp} value={hp} title={`d${vm.selectedArchetype.HitPointDie} roll`}>
                        {`${hp}`}
                      </MenuItem>
                    ))}
                  </Select>                   
                <RandomDiceButton clickHandler={() => randomlyPickHitPoints(null)} styles={DiceButtonStyleRightOfSelect} />
              </Typography>
            </Grid>
            {hitPoints > 0 && 
              <Grid size={{ xs: 12, md: 12 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>Total Hit points:</strong> { totalHitPoints } ({`${conMod} Con mod, `}  
                    { vm.hasStout ? `+2 hp from Stout, plus advantage on hp rolls where rolls were: ${hitPoints} and ${hitPoints2}`: `rolled ${hitPoints}` })
                </Typography>           
              </Grid>}        
          </>
        }
      </Grid>
    </Container>
  );
};

export default ArchetypeSelector;
