// component to define a species for a character
import React from 'react';
import { TextField, Container, Typography, Grid, Select, MenuItem, Autocomplete } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Trait } from '../../models/rules/Trait';
import { TraitRepository } from '../../repository/TraitRepository';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import RandomDiceButton, { DiceButtonStyleRightOfSelect } from '../common/RandomDiceButton';
import { SpeciesNameRepository } from '../../repository/SpeciesNameRepository';
import { SpeciesDescriptionRepository } from '../../repository/SpeciesDescriptionRepository';
import { CharacterSpeciesState, setCharacterSpeciesDescriptions, setCharacterSpeciesName, setCharacterSpeciesTraitId } from '../../slices/characterSpeciesSlice';
import { RootState } from '../../app/store';
import { RangedThingPicker } from '../../generators/RangedThingPicker';
import { ThingPicker } from '../../generators/ThingPicker';
import { RandomNumberGenerator } from '../../generators/RandomNumberGenerator';


const CharacterSpeciesComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const characterSpeciesState: CharacterSpeciesState = useAppSelector((state: RootState) => state.characterSpeciesState);
  const traits = TraitRepository.getAll();
  const selectedCharacterSpeciesTrait = characterSpeciesState.characterSpeciesTraitId ? traits.find(trait => trait.Id === characterSpeciesState.characterSpeciesTraitId) : null;
  const selectedTraitName = selectedCharacterSpeciesTrait ? selectedCharacterSpeciesTrait.Name : '';
  const selectedTraitDescription = selectedCharacterSpeciesTrait ? selectedCharacterSpeciesTrait.Description : '';
  const speciesNames = SpeciesNameRepository.getAll();
  const speciesDescriptions = SpeciesDescriptionRepository.getAll();


  const handleSaveSpeciesTrait = (traitId: number | null) => {
    if (traitId) {
      dispatch(setCharacterSpeciesTraitId(traitId));      
    }
  }

  const randomlyPickTrait = () => {
    // dispatch action to randomize species trait
    const trait = RangedThingPicker.Pick<Trait>(TraitRepository.getAll())
    handleSaveSpeciesTrait(trait?.Id || null);
  }

  const handleSaveCharacterSpeciesName = (name: string) => {
    if (name) {
      dispatch(setCharacterSpeciesName(name));
    }
  }

  const randomlySelectCharacterSpeciesName = () => {
    // dispatch action to randomize species name
    const speciesName = ThingPicker.Pick<string>(SpeciesNameRepository.getAll()); // Replace [] with the actual list of species names
    handleSaveCharacterSpeciesName(speciesName || '');
  }

  const handleSaveCharacterSpeciesDescriptions = (descriptions: string[]) => {
    if (descriptions) {
      dispatch(setCharacterSpeciesDescriptions(descriptions));
    }
  }

  const randomlySelectCharacterSpeciesDescriptions = () => {
    const numberOfThings = new RandomNumberGenerator().generate(2, 5);
    const descriptions: string[] = [];

    for (let i = 0; i < numberOfThings; i++) {
        let thing = ThingPicker.Pick<string>(SpeciesDescriptionRepository.getAll()) || 'Cute';
        descriptions.push(thing);
    }
    handleSaveCharacterSpeciesDescriptions(descriptions);
  }

  return (
    <Container>
      <Grid container spacing={2} alignItems="left" style={{ marginBottom: '16px' }}>
        <Grid size={{ xs: 12, sm: 12 }}>
          <Typography variant="h4" className={"has-rocket"} style={{ fontFamily: 'RocketRinder' }} gutterBottom>
            {t('Species')}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 12 }}>
          <Typography variant="body1" gutterBottom>
            {t('Name')}
          </Typography>
          <Autocomplete
            id="species-name-select"
            freeSolo
            title={characterSpeciesState.characterSpeciesName || ''}
            className="darkspace-select some-times-wider"
            value={characterSpeciesState.characterSpeciesName}
            onChange={ (e, value) => {
                if (e) {
                    e.preventDefault();                            
                    handleSaveCharacterSpeciesName(value || '');
                }
            }}
            inputValue={characterSpeciesState.characterSpeciesName || ''}
            onInputChange={(event, newInputValue) => {
                //console.log('Name input changed to:', event);
                //nameSelected(event as React.ChangeEvent<HTMLInputElement>);
                if (event) {                            
                    handleSaveCharacterSpeciesName(newInputValue);
                }
            }}
            options={speciesNames}
            renderInput={(params) => (
                <TextField {...params} 
                    label=""
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                        border: '0 none', // Removes the border
                        },
                        // You might also want to remove focus/hover borders
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        border: '0 none',
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '0 none',
                        },
                    }}                            
                    />
            )}
            style={{ 
                borderTopRightRadius: 0, 
                borderBottomRightRadius: 0,    
                minWidth: '70%',
                maxWidth: '70%',
                display: 'inline-flex'                     
            }}                                                   
          />
          <RandomDiceButton clickHandler={randomlySelectCharacterSpeciesName} styles={DiceButtonStyleRightOfSelect} />
        </Grid>
        <Grid size={{ xs: 12, sm: 12 }}>
          <Typography variant="body1" gutterBottom>
            {t('Species Description')}
          </Typography>
          <TextField            
            value={characterSpeciesState.characterSpeciesDescriptions.join(' ') || ''}
            className="darkspace-textarea"
            onChange={(e) => {
              let descriptions = [];
              descriptions.push(e.target.value);
              handleSaveCharacterSpeciesDescriptions(descriptions);
            }}            
            multiline 
            style={{ 
                    borderTopRightRadius: 0, 
                    borderBottomRightRadius: 0,    
                    minWidth: '70%',
                    maxWidth: '70%',
                    display: 'inline-flex',                    
                  }} 
            sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '0 none', // Removes the border
                  borderTopRightRadius: 0, 
                  borderBottomRightRadius: 0,
                },
                // You might also want to remove focus/hover borders
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  border: '0 none', // Removes the border
                  borderTopRightRadius: 0, 
                  borderBottomRightRadius: 0,
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: '0 none', // Removes the border
                  borderTopRightRadius: 0, 
                  borderBottomRightRadius: 0,
                },
              }}   
          />
          {/* <Autocomplete
            id="species-description-select"
            multiple={true}
            freeSolo
            title={characterSpeciesDescriptions.join('. ') || ''}
            className="darkspace-select some-times-wider"
            value={characterSpeciesDescriptions}
            onChange={ (e, value) => {
                //console.log('on change');
                if (e) {
                    e.preventDefault();                            
                    handleSaveCharacterSpeciesDescriptions(value || '');
                }
            }}            
            onInputChange={(event, newInputValue) => {
                //console.log('on input change');
                //nameSelected(event as React.ChangeEvent<HTMLInputElement>);
                if (false) {                          
                    let newDescriptions = [...characterSpeciesDescriptions];
                    newDescriptions.push(newInputValue); 
                    handleSaveCharacterSpeciesDescriptions(newDescriptions);
                }
            }}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    const input = (event.target as HTMLInputElement).value;
                    let newDescriptions = [...characterSpeciesDescriptions];
                    newDescriptions.push(input); 
                    handleSaveCharacterSpeciesDescriptions(newDescriptions);
                }
                event.stopPropagation();
            }}
            options={speciesDescriptions}
            renderInput={(params) => (
                <TextField {...params} 
                    label=""
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                        border: '0 none', // Removes the border
                        },
                        // You might also want to remove focus/hover borders
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        border: '0 none',
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '0 none',
                        },
                    }}                            
                 />
            )}
            style={{ 
                borderTopRightRadius: 0, 
                borderBottomRightRadius: 0,    
                minWidth: '70%',
                maxWidth: '70%',
                display: 'inline-flex'                     
            }}                                                   
          /> */}
          <RandomDiceButton clickHandler={randomlySelectCharacterSpeciesDescriptions} styles={DiceButtonStyleRightOfSelect} />
        </Grid>        
        <Grid size={{ xs: 12, sm: 12 }}>
          <Typography variant="body1" gutterBottom>
            {t('Choose a Species Trait')}
          </Typography>
          <Select id="trait-select"            
            className="darkspace-select some-times-wider"
            title={`${selectedTraitName} - ${selectedTraitDescription}`}
            value={characterSpeciesState.characterSpeciesTraitId ? characterSpeciesState.characterSpeciesTraitId : ''}
            onChange={(e) => {
              const value = Number(e.target.value);
              handleSaveSpeciesTrait(value);
            }}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            renderValue={(selected) => {
              const selectedTrait = traits.find(trait => trait.Id === selected);
              return  <strong>{selectedTrait ? selectedTrait.Name : ''}</strong>;
            }}>  
            {traits.map((trait: Trait) => (
              <MenuItem key={trait.Id} 
                value={trait.Id} 
                title={`${trait.Name} - ${trait.Description}`}
                sx={{ whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: 1.2}}>
                <Typography variant='body1'><strong>{trait.Name}:</strong><br />{trait.Description}</Typography>
              </MenuItem>
            ))}
          </Select>
          <RandomDiceButton clickHandler={randomlyPickTrait} styles={DiceButtonStyleRightOfSelect} />
        </Grid>
        {selectedTraitName && selectedTraitDescription && <Grid size={{ xs: 12, sm: 12 }}>
          <Typography variant="body1" gutterBottom>
            <strong>{t(`${selectedTraitName}`)}:</strong> {t(`${selectedTraitDescription}`)}
          </Typography>
        </Grid>}
      </Grid>     
    </Container>
  );
};

export default CharacterSpeciesComponent;
