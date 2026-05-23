import React from 'react';
import { Autocomplete, Container, Grid, Select, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import RandomDiceButton, { DiceButtonStyleRightOfSelect } from '../common/RandomDiceButton';
import { NameRepository } from '../../repository/NameRepository';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { CharacterNameState } from '../../slices/characterNameSlice';
import { setCharacterName } from '../../slices/characterNameSlice';
import { ThingPicker } from '../../generators/ThingPicker';


const CharacterNameComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const characterNameState: CharacterNameState = useAppSelector((state: RootState) => state.characterNameState);
    let characterName = characterNameState.name;
    const names = NameRepository.getAll();
    
    const randomlyPickName = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const name = ThingPicker.Pick<string>(names) || 'Alf';
        handleNameChange(name);
    };

    const handleNameChange = (newName: string | null) => {
        if (newName !== null) {
            dispatch(setCharacterName(newName));
        }
    }

    return (
        <Container> 
          <Grid container spacing={1} alignItems="left" style={{ marginBottom: '16px' }}>   
            <Grid size={{ xs: 12, md: 12 }}>
                <Typography variant="h4" className={"has-rocket"} style={{ fontFamily: 'RocketRinder' }} gutterBottom>
                    {t('Character Name')}
                </Typography>        
            </Grid>          
            <Grid size={{ xs: 12, md: 12 }}>
                <Autocomplete
                    id="character-name-select"
                    freeSolo
                    title={characterName || ''}
                    className="darkspace-select some-times-wider"
                    value={characterName}
                    onChange={ (e, value) => {
                        if (e) {
                            e.preventDefault();                            
                            handleNameChange(value)
                        }
                    }}
                    inputValue={characterName || ''}
                    onInputChange={(event, newInputValue) => {
                        //console.log('Name input changed to:', event);
                        //nameSelected(event as React.ChangeEvent<HTMLInputElement>);
                        if (event) {                            
                            handleNameChange(newInputValue);
                        }
                    }}
                    options={names}
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
                <RandomDiceButton clickHandler={randomlyPickName} styles={DiceButtonStyleRightOfSelect} />
            </Grid>
          </Grid>  
        </Container>
    );
};

export default CharacterNameComponent;