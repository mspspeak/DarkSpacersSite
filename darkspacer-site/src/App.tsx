import React from 'react';
import Button from '@mui/material/Button';
import './App.css';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Container, Table, TableCell, TableRow } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ButtonGroup variant="contained" aria-label="Character Creation">
          <Button>Design</Button>
          <Button>Random</Button>        
        </ButtonGroup>
      </header>
      <Container>
        <Button>Randomly Generate Character</Button>
        <Table>
          <TableRow>
            <TableCell>
              RANDOMLY GENERATED CHARACTER HERE
            </TableCell>
          </TableRow>
        </Table>
      </Container>
      <Container>
      <Button>Roll Stats</Button>
        <Table>
          <TableRow>
            <TableCell>
              Rolled Stats yo!
            </TableCell>
          </TableRow>
        </Table>
      </Container>
    </div>
  );
}


export default App;
