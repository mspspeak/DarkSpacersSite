import React from 'react';
import './App.css';
import { Container, Table, TableBody, TableCell, TableRow } from '@mui/material';
import DesignCharacter from './views/DesignCharacter';


// create a form that allows folks to create a character that 
// puts together the data from Fighter.json 
const App: React.FC = () => {
  return (
    <div className="App" title="Design Your Character">      
      <Container>
        <DesignCharacter />
      </Container>
    </div>
  );
}


export default App;
