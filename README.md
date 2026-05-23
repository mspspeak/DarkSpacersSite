# DarkSpacers Character Generator

A client-side web app for generating DarkSpace characters.

## 🚀 Overview

The DarkSpacers Character Generator is a React-based web application that helps players create characters for the DarkSpace RPG. It features:

- **Random Character Generation**: Generate complete characters with the click of a button
- **Interactive Components**: Manually select and customize character attributes
- **PDF Export**: Generate character sheets as PDF documents
- **Responsive Design**: Material-UI components for a modern, mobile-friendly interface
- **Redux State Management**: Centralized state management for complex character data

## 🛠 Technologies Used

- **Frontend**: React 19.1.0 with TypeScript
- **UI Framework**: Material-UI (MUI) 7.0.2 with Emotion styling
- **State Management**: Redux Toolkit 2.8.2 with React-Redux
- **Testing**: Jest 27.5.1 with React Testing Library
- **Build Tool**: Create React App with React Scripts
- **PDF Generation**: pdf-lib 1.17.1
- **Internationalization**: i18next and react-i18next

## 🏗 Architecture

### Project Structure

```
DarkSpacersSite/
├── LICENSE
├── README.md
└── darkspacer-site/
  ├── .gitignore
  ├── jest.config.js
  ├── package.json
  ├── package-lock.json
  ├── tsconfig.json
  ├── public/                   # Public static assets
  │   ├── index.html
  │   ├── manifest.json
  │   ├── robots.txt
  │   ├── DarkSpace.png
  │   └── SpacerSheet.pdf
  ├── src/
  │   ├── App.tsx
  │   ├── App.test.tsx
  │   ├── index.tsx
  │   ├── setupTests.ts
  │   ├── app/                  # Redux store and hooks
  │   ├── assets/
  │   ├── data/                 # Game rule JSON files
  │   ├── generators/           # Generation logic + tests
  │   ├── models/
  │   │   ├── rules/
  │   │   └── view/
  │   ├── repository/           # Data access layer + tests
  │   ├── slices/               # Redux slices/state generators
  │   ├── utils/                # Utility functions + tests
  │   └── views/                # React views/components
  │       ├── ability-scores/
  │       ├── archetype/
  │       ├── background/
  │       ├── character-name/
  │       ├── character-species/
  │       ├── common/
  │       ├── motivation/
  │       └── summary/
```

### Key Components

#### Data Layer
- **Models** (`src/models/`): TypeScript classes defining game entities
  - `Background`: Character background information
  - `Archetype`: Character classes and abilities
  - `AbilityScore`: Character statistics
  - `Trait`: Species-specific characteristics

#### Repositories (`src/repository/`)
- Abstraction layer for accessing JSON data files
- Repositories for: Archetypes, Backgrounds, Items, Motivations, Names, Traits
- Implements repository pattern for data access

#### Generators (`src/generators/`)
- **AbilityScoreGenerator**: Handles dice rolling mechanics (3d6, 4d6 drop lowest)
- **ArchetypeGenerator**: Selects character classes and abilities
- **RandomNumberGenerator**: Core RNG implementation
- **ThingPicker/RangedThingPicker**: Generic selection utilities

#### State Management (`src/slices/`)
- Redux Toolkit slices managing different aspects of character state
- Primary slice: `characterSlice.ts` - Central character data management

#### UI Components (`src/views/`)
- **DesignCharacter**: Main character creation interface
- **AbilityScoresComponent**: Ability score generation and display
- **BackgroundComponent**: Background selection
- **CharacterSpeciesComponent**: Species selection and traits
- **ArchetypeSelector**: Class and archetype selection
- **GearSelector**: Equipment and gear management

## 🚦 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd DarkSpacersSite/darkspacer-site
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🔧 Build and Development

### Development Server

Start the development server with hot reloading:

```bash
npm start
```

The application will open at `http://localhost:3000`.

### Building for Production

Create an optimized production build:

```bash
npm run build
```

#### Custom Build Configurations

- **Local build** (for localhost deployment):
  ```bash
  npm run build-local
  ```

- **Shape build** (for shapeshifting.org deployment):
  ```bash
  npm run build-shape
  ```

### Build Output

The build process creates:
- Minified JavaScript and CSS bundles
- Static assets (images, fonts, manifest files)
- `index.html` with proper resource references
- Source maps for debugging

## 🧪 Testing

### Running Tests

Execute the test suite:

```bash
npm test
```

This command:
- Runs tests in watch mode during development
- Executes all `.test.ts` and `.test.tsx` files
- Provides coverage reports
- Uses Jest with React Testing Library

### Test Configuration

- **Jest Config**: Custom configuration in `jest.config.js`
- **Test Environment**: Node.js with DOM simulation
- **Test Utilities**: React Testing Library, Jest mocks
- **Coverage**: Available through Jest's built-in coverage reporting

### Testing Structure

Tests are co-located with source files following the pattern:
- `Component.test.tsx` for React component tests
- `Service.test.ts` for business logic tests
- Example: `AbilityScoreGenerator.test.ts` tests dice rolling mechanics

## 🎮 Game Mechanics

The application implements several DarkSpace RPG systems:

### Ability Scores
- **Standard**: 3d6 per ability
- **Heroic**: 4d6, drop lowest per ability (Not really used with Shadowdark so I'll probably axe it soon.)
- Six core abilities: STR, DEX, CON, INT, WIS, CHA

### Character Creation Flow
1. **Species Selection**: Choose character species with associated traits
2. **Background**: Random or manual background selection
3. **Archetype**: Class selection with talents and abilities
4. **Ability Scores**: Generate or assign ability scores
5. **Motivation**: Character motivation and goals
6. **Gear**: Starting equipment selection

### Data-Driven Design
Game rules are stored in JSON files (`src/data/`):
- `Archetype.json`: Character classes and abilities
- `Background.json`: Character backgrounds
- `Trait.json`: Species traits and modifiers
- `Item.json`: Equipment and gear
- `Names.json`: Character name generators

## 🔄 State Management

The application uses Redux Toolkit for state management:

```typescript
// Central character state
interface CharacterState {
  name: string;
  abilityScores: AbilityScore[];
  background: Background;
  archetype: Archetype;
  species: Species;
  // ... other character properties
}
```

State is managed through:
- **Actions**: Dispatched from UI components
- **Reducers**: Pure functions updating state
- **Selectors**: Derived state and computed values

## 🚀 Deployment

The application supports multiple deployment targets:

1. **Local Development**: Standard React development server
2. **Static Hosting**: Build outputs can be served from any static host
3. **Custom Domains**: Configurable public URL through build scripts

### Environment Configuration

- **Public URL**: Configurable via `PUBLIC_URL` environment variable
- **Asset Paths**: Relative paths for portability
- **Build Optimization**: Production builds are minified and optimized

## 📁 Key Files

- **[package.json](darkspacer-site/package.json)**: Dependencies and build scripts
- **[App.tsx](darkspacer-site/src/App.tsx)**: Main application component
- **[store.ts](darkspacer-site/src/app/store.ts)**: Redux store configuration
- **[DesignCharacter.tsx](darkspacer-site/src/views/DesignCharacter.tsx)**: Primary character creation interface
- **[jest.config.js](darkspacer-site/jest.config.js)**: Test configuration
- **[tsconfig.json](darkspacer-site/tsconfig.json)**: TypeScript configuration

## 🤝 Contributing

1. Follow TypeScript best practices
2. Maintain test coverage for new features
3. Use Material-UI components for consistency
4. Follow Redux Toolkit patterns for state management
5. Ensure responsive design principles

## 📄 License

This project is licensed under the ISC License.

