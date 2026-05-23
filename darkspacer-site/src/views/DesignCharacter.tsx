// DesignCharacter component
import React, { useState } from 'react';
import { Button, Container, Typography, Grid, Stack, styled, Paper, Snackbar, SnackbarCloseReason, Fab } from '@mui/material';
import BackgroundComponent from './background/BackgroundComponent';
import AbilityScoresComponent from './ability-scores/AbilityScoresComponent';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useTranslation } from 'react-i18next';
import { Background } from '../models/rules/Background';
import {
  type CharacterState,  
  setGenerated,
  setCharacterMotivationId,
  setCharacterCreds,
  setHasStarterGear,
} from '../slices/characterSlice';
import { RootState } from '../app/store';
import CharacterSpeciesComponent from './character-species/CharacterSpeciesComponent';
import GearSelector from './GearSelector';
import { RangedThingPicker } from '../generators/RangedThingPicker';
import { BackgroundRepository } from '../repository/BackgroundRepository';
import { AbilityScoreGenerator, AbilityScoreRollType } from '../generators/AbilityScoreGenerator';
import { RandomNumberGenerator } from '../generators/RandomNumberGenerator';
import ArchetypeSelector from './archetype/ArchetypeSelector';
import { ArchetypeRepository } from '../repository/ArchetypeRepository';
import { Talent } from '../models/rules/Talent';
import { Archetype } from '../models/rules/Archetype';

import { DarkSpaceCharacterSheetLoader } from '../utils/DarkSpaceCharacterSheetLoader';
import MotivationSelector from './motivation/MotivationSelector';
import { Motivation } from '../models/rules/Motivation';
import { MotivationRepository } from '../repository/MotivationRepository';
import { ThingPicker } from '../generators/ThingPicker';
import { NameRepository } from '../repository/NameRepository';
import RandomDiceButton from './common/RandomDiceButton';
import CharacterNameComponent from './character-name/CharacterNameComponent';
import CharacterSummary from './summary/CharacterSummary';
import { CharacterStateGenerator } from '../slices/CharacterStateGenerator';
import RandomDiceFab from './RandomDiceFab';
import { 
  type CharacterNameState, 
  setCharacterName
} from '../slices/characterNameSlice';
import { CharacterNameStateGenerator } from '../slices/CharacterNameStateGenerator';
import { type AbilityScoresState,
  setCharacterAbilityScores
} from '../slices/abilityScoresSlice';
import { AbilityScoreStateGenerator } from '../slices/AbilityScoreStateGenerator';
import { type CharacterBackgroundState,
  setCharacterBackgroundId
} from '../slices/characterBackgroundsSlice';
import { 
  type CharacterSpeciesState,
  setCharacterSpeciesName,
  setCharacterSpeciesDescriptions,
  setCharacterSpeciesTraitId
} from '../slices/characterSpeciesSlice';
import { CharacterSpeciesStateGenerator } from '../slices/CharacterSpeciesStateGenerator';
import { 
  type ArchetypeState, 
  setAbilityScoreRaisedByPlusOneRule1, 
  setAbilityScoreRaisedByPlusOneRule1Add, 
  setAbilityScoreRaisedByPlusOneRule2, 
  setAbilityScoreRaisedByPlusOneRule2Add, 
  setAbilityScoreRaisedByPlusTwoRule, 
  setAbilityScoreRaisedByPlusTwoRuleAdd, 
  setArchetypeId, 
  setArchetypeTalentAddId, 
  setArchetypeTalentId, 
  setHitPoints 
} from '../slices/archetypeSlice';
import { ArchetypeStateGenerator } from '../slices/ArchetypeStateGenerator';
import { CharacterBackgroundStateGenerator } from '../slices/CharacterBackgroundStateGenerator';


const ComponentItem : any = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  margin: theme.spacing(0),
  padding: theme.spacing('18px'),
  textAlign: 'left',
  color: '#000', 
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
  boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 1.0), 1px 1px 1px 1px rgba(0, 0, 0, 1), 1px 1px 1px 1px rgba(0, 0, 0, 1)',
  borderRadius: '0px',
}));

const WeirdSpace: React.FC<{ length: number }> = ({ length }) => {
  const other: number = 35 - length;
  return (
    <ComponentItem style={{ boxShadow: `rgb(255, 255, 255) ${length}px 0px 0px 0px, rgb(0, 0, 0) ${length}px 0px 0px 0px inset, rgb(0, 0, 0) 0px 0px 0px ${other}px` }}  ></ComponentItem>
  );
}

const DesignCharacter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [openRandoSnack, setOpenRandoSnack] = React.useState(false);    
  const [randoSnack, setRandoSnack] = React.useState('boogers');
  const characterState: CharacterState = useAppSelector((state: RootState) => state.characterState);
  const characterNameState: CharacterNameState = useAppSelector((state: RootState) => state.characterNameState);
  const characterAbilityScoresState: AbilityScoresState = useAppSelector((state: RootState) => state.abilityScoresState);
  const characterSpeciesState: CharacterSpeciesState = useAppSelector((state: RootState) => state.characterSpeciesState);
  const archetypeState: ArchetypeState = useAppSelector((state: RootState) => state.archetypeState);
  
  const [selectedCharacterText, setSelectedCharacterText] = useState<string | null>(JSON.stringify(characterState, null, 2));
  const abilityScoreGenerator = new AbilityScoreGenerator(new RandomNumberGenerator(), AbilityScoreRollType.Standard);
  const characterBackgroundState: CharacterBackgroundState = useAppSelector((state: RootState) => state.characterBackgroundState);

  console.log('Character ', characterNameState.name, characterAbilityScoresState.characterCon);
  
  let regenerateCharacter = () => {
    const generatedCharacterState: CharacterState =
      CharacterStateGenerator.generateNew(characterState);
    dispatch(setGenerated(true));
    dispatch(setCharacterMotivationId(generatedCharacterState.characterMotivationId));
    dispatch(setCharacterCreds(generatedCharacterState.characterCreds));
    dispatch(setHasStarterGear(generatedCharacterState.hasStarterGear));

    const generatedCharacterNameState: CharacterNameState = 
      CharacterNameStateGenerator.generateNew(characterNameState);
    dispatch(setCharacterName(generatedCharacterNameState.name));

    const generatedAbilityScoresState: AbilityScoresState = 
      AbilityScoreStateGenerator.generateNew(characterAbilityScoresState, abilityScoreGenerator);
    dispatch(setCharacterAbilityScores({ ...generatedAbilityScoresState }));

    const generatedCharacterSpeciesState: CharacterSpeciesState = 
      CharacterSpeciesStateGenerator.generateNew(characterSpeciesState);
    dispatch(setCharacterSpeciesTraitId(generatedCharacterSpeciesState.characterSpeciesTraitId));
    dispatch(setCharacterSpeciesDescriptions(generatedCharacterSpeciesState.characterSpeciesDescriptions));
    dispatch(setCharacterSpeciesName(generatedCharacterSpeciesState.characterSpeciesName));
      
    const generatedArchetypeState: ArchetypeState = 
      ArchetypeStateGenerator.generateNew(archetypeState);
    dispatch(setArchetypeId(generatedArchetypeState.archetypeId));
    dispatch(setArchetypeTalentId(generatedArchetypeState.archetypeTalentId));
    dispatch(setArchetypeTalentAddId(generatedArchetypeState.archetypeTalentAddId));
    dispatch(setAbilityScoreRaisedByPlusTwoRule(generatedArchetypeState.abilityScoreRaisedByPlusTwoRule));
    dispatch(setAbilityScoreRaisedByPlusOneRule1(generatedArchetypeState.abilityScoreRaisedByPlusOneRule1));
    dispatch(setAbilityScoreRaisedByPlusOneRule2(generatedArchetypeState.abilityScoreRaisedByPlusOneRule2));
    dispatch(setAbilityScoreRaisedByPlusTwoRuleAdd(generatedArchetypeState.abilityScoreRaisedByPlusTwoRuleAdd));
    dispatch(setAbilityScoreRaisedByPlusOneRule1Add(generatedArchetypeState.abilityScoreRaisedByPlusOneRule1Add));
    dispatch(setAbilityScoreRaisedByPlusOneRule2Add(generatedArchetypeState.abilityScoreRaisedByPlusOneRule2Add));
    dispatch(setHitPoints([generatedArchetypeState.hitPoints, generatedArchetypeState.hitPoints2]));  

    const generatedCharacterBackgroundState: CharacterBackgroundState = 
      CharacterBackgroundStateGenerator.generateNew(characterBackgroundState);
    dispatch(setCharacterBackgroundId(generatedCharacterBackgroundState.characterBackgroundId));    

    setSelectedCharacterText(JSON.stringify(generatedCharacterState, null, 2));
  }

  let loadCharacterSheet = async () => {
    console.log('Character Data:', characterState);

    const originalPdfBytes = await fetch('https://mspspeak.github.io/SpacerSheet.pdf').then(res => res.arrayBuffer());
    
    const filledPdf = await DarkSpaceCharacterSheetLoader.fillPdfForm(
      originalPdfBytes, 
      characterState, 
      characterNameState, 
      characterAbilityScoresState,
      characterBackgroundState,
      characterSpeciesState,
      archetypeState);
    const pdfElement = document.getElementById('pdf') as HTMLIFrameElement | null;
    if (pdfElement) {
      pdfElement.removeAttribute('srcdoc');
      pdfElement.src = typeof filledPdf === 'string'
        ? filledPdf
        : URL.createObjectURL(new Blob([filledPdf instanceof Uint8Array ? new Uint8Array(filledPdf) : filledPdf], { type: 'application/pdf' }));
    }
  }

  const handleSelectMotivation = (motivationId: number | null) => {
    if (motivationId) {
      console.log(`Selected Motivation out here:`, motivationId);
      dispatch(setCharacterMotivationId(motivationId));
      setSelectedCharacterText(JSON.stringify(characterState, null, 2));
    } else {
      console.error('No background selected.');
    }
  }

  const randomlySelectCharacterMotivation = () => {
    // dispatch action to randomize motivation
    const motivation = RangedThingPicker.Pick<Motivation>(MotivationRepository.getAll())
    handleSelectMotivation(motivation?.Id || null);
  }

  const handleSelectCreds = (creds: number | null) => {
    if (creds !== null) {      
      dispatch(setCharacterCreds(creds));
      setSelectedCharacterText(JSON.stringify(characterState, null, 2));
    }
  }

  const randomlySelectCharacterCreds = () => {
    const creds = (new RandomNumberGenerator().generate(1, 6) + new RandomNumberGenerator().generate(1, 6)) * 10;
    handleSelectCreds(creds);
  }

  const handleHasStarterGear = (hasStarterGear: boolean) => {
    dispatch(setHasStarterGear(hasStarterGear));
    const credsBeforeChange = characterState.characterCreds || 0;
    const credsAfterChange = hasStarterGear ? credsBeforeChange - 40 : credsBeforeChange + 40;

    handleSelectCreds(credsAfterChange); // to refresh text
    setSelectedCharacterText(JSON.stringify(characterState, null, 2));
  }

  const handleRandoSnackClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenRandoSnack(false);
  };

  const randomExample = () => {
    const thingsYouCouldRollFor = ['d6', 'name', 'talent', 'background', '3d6', 'bandYouCouldListenTo'];
    const thingToRoll = ThingPicker.Pick<string>(thingsYouCouldRollFor) || 'd6';
    const randoSnack = 'Space Boogers';
    const thingGetterIndex: { [key: string]: () => string } = {
      'd6': () => {
        const d6 = new RandomNumberGenerator().generate(1, 6);
        return `Rando d6: ${d6}`;
      },
      'name': () => {
        let randoName = ThingPicker.Pick<string>(NameRepository.getAll()) || 'Alf';        
        return `Rando Name: ${randoName}`;
      },
      'talent': () => {
        const randoArchetype = ThingPicker.Pick<Archetype>(ArchetypeRepository.getAll());
        const talent = RangedThingPicker.Pick<Talent>(randoArchetype?.FirstLevelTalents || []);
        const randoVal = talent?.Description || 'Booger Picking';
        return `Rando ${randoArchetype?.Name || 'Zoog'} Talent: ${randoVal}`;
      },
      'background': () => {
        const background = RangedThingPicker.Pick<Background>(BackgroundRepository.getAll());
        const name = background?.Name || 'Joy Luck Club Enthusiast';
        return `Rando Background: ${name}`;
      },
      '3d6': () => {
        const scoreYouCouldRoll = ThingPicker.Pick<string>(['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha']) || 'Str';
        let abilityScoreValue = abilityScoreGenerator.generate().value;
        return `Rando 3d6 ${scoreYouCouldRoll} Score: ${abilityScoreValue}`;
      },
      'bandYouCouldListenTo': () => {
        const bands = ['Vangelis', 'Autechre', 'Directrix','Flash Gordon Soundtrack', 'Bowie duh', 'ELO', 'M83', 'Devo', 'Deltron 3000', 'Your Dad\'s Barber Shop Quartet'];
        const band = ThingPicker.Pick<string>(bands) || '';
        return `Rando Thing You Could Listen To: ${band}`;
      }
    }
    
    setRandoSnack(thingGetterIndex[thingToRoll]());
    setOpenRandoSnack(true);
  };

  return (
    <Container>      
      <RandomDiceFab clickHandler={regenerateCharacter} />
      <Snackbar
        open={openRandoSnack}
        autoHideDuration={6000}
        onClose={handleRandoSnackClose}
        message={randoSnack ? randoSnack : t('Unable to randomize')}
      />
      <Typography variant="h3" className={"has-rocket"} style={{ fontFamily: 'RocketRinder' }}>
        <img src="https://mspspeak.github.io/DarkSpace.png" alt="DarkSpace Logo" 
          style={{ verticalAlign: 'middle', marginRight: '8px', height: '1em', padding: '8px' }} />{t('DarkSpace Character Designer')}
      </Typography>
      <Stack spacing={0}>        
        <ComponentItem>
          <Container>
            <Grid container spacing={2} alignItems="left" style={{ marginBottom: '16px' }}>
              <Grid size={{xs: 12, md: 12}}>
                <Typography variant="h6" className={"has-rocket"} style={{ fontFamily: 'RocketRinder' }}  >{t('How to use this:')}</Typography>
                <Typography component={'ul'}>
                  <Typography component={'li'}>{t('As you scroll down you can select or roll different aspects of your character.  WARNING: The dice button to the bottom right will re-roll everything.  #chaos baby!')}</Typography>
                  <Typography component={'li'}>{t('You can hit the Load Sheet button at the bottom and then save the editable PDF in the viewer')}</Typography>
                  <Typography component={'li'}>{t('You can also select new values from dropdowns or hit the dice buttons to roll something else.')}</Typography>
                  <Typography component={'li'}>{t('Highly advised you check out the ')}<a href="https://www.dmingtheworld.com/darkspace">DarkSpace</a> and <a href="https://www.thearcanelibrary.com/pages/shadowdark">Shadowdark</a> {t('books to understand how the elements work')}</Typography>
                  <Typography component={'li'}>{t('And remember, space is dark!  (but not so dark.)')}</Typography>
                </Typography>            
              </Grid>              
            </Grid>
          </Container>
        </ComponentItem>
        <WeirdSpace length={9} />
        <ComponentItem>
          <CharacterNameComponent />
        </ComponentItem>
        <WeirdSpace length={14} />
        <ComponentItem>
          <AbilityScoresComponent />
        </ComponentItem>
        <WeirdSpace length={11}/>
        <ComponentItem>
          <CharacterSpeciesComponent />
        </ComponentItem>
        <WeirdSpace length={12} />
        <ComponentItem>
          <ArchetypeSelector />
        </ComponentItem>
        <WeirdSpace length={13} />
        <ComponentItem>
          <BackgroundComponent />
        </ComponentItem>
        <WeirdSpace length={10} />
        <ComponentItem>
          <MotivationSelector
            handleSelectMotivation={handleSelectMotivation}            
            randomizeCharacterMotivation={randomlySelectCharacterMotivation}
            characterMotivationId={characterState.characterMotivationId}
          />
        </ComponentItem>
        <WeirdSpace length={15} />
        <ComponentItem>
          <GearSelector
            handleSelectCreds={handleSelectCreds}
            randomizeCharacterCreds={randomlySelectCharacterCreds}
            characterCreds={characterState.characterCreds}
            handleHasStarterGear={handleHasStarterGear}
            hasStarterGear={characterState.hasStarterGear}
          /> 
        </ComponentItem>
        <WeirdSpace length={16} />
        <ComponentItem>
          <CharacterSummary 
            character={characterState} 
            characterName={characterNameState} 
            characterAbilityScores={characterAbilityScoresState}
            characterBackground={characterBackgroundState}
            characterSpeciesState={characterSpeciesState}
            archetypeState={archetypeState}
            />
        </ComponentItem>
        <WeirdSpace length={17} />
        <ComponentItem>
          <Container>
            <Grid container spacing={2} alignItems="center" style={{ marginBottom: '16px' }}>
              <Grid size={{xs: 12, md: 12}} style={{ textAlign: 'center' }}>
                  <Button variant="contained" onClick={loadCharacterSheet} style={{ backgroundColor: 'black' }}>
              {t('Load Character Sheet')}</Button>  
              </Grid>
              <Grid size={{xs: 12, md: 12}}>
                <iframe id="pdf" 
                  style={{ width: '100%', height: '700px' }}
                  srcDoc="<p style='text-align: center;font-size: 600px;margin: 0;'>☉</p>"
                ></iframe>                  
              </Grid>
            </Grid>
          </Container>
        </ComponentItem>
        <WeirdSpace length={18} />
        <ComponentItem>
          <Grid size={{xs: 12, md: 12}} style={{ textAlign: 'center' }}>
            <Typography variant="h5" className={"has-rocket"} style={{ fontFamily: 'RocketRinder' }}>
              Rando Shrine
            </Typography>
          </Grid>
          <Grid size={{xs: 12, md: 12}} style={{ textAlign: 'center', marginTop: '8px' }}>
            <RandomDiceButton clickHandler={randomExample} />
          </Grid>
        </ComponentItem>  
      </Stack>
    </Container>
  );
};

export default DesignCharacter;