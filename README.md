# Game Search App

A React Native mobile application for searching and discovering games using the RAWG API.

## Features

- **Home Screen**: Browse featured games with high ratings
- **Search Functionality**: Search for games by name
- **Game Details**: View detailed information about each game including:
  - Game description
  - Rating and reviews
  - Release date
  - Genres and platforms
  - Developer and publisher information
  - Screenshots
- **Navigation**: Smooth navigation between screens with back button support
- **Responsive Design**: Works on both mobile and web platforms

## Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **React Navigation**: Navigation library for screen transitions
- **Axios**: HTTP client for API requests
- **RAWG API**: Game database and information source

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your mobile device

#### Download Expo Go App

**For Android:**
1. Open Google Play Store on your Android device
2. Search for "Expo Go"
3. Install the app developed by "Expo"
4. Or use this direct link: [Expo Go on Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

**For iOS:**
1. Open App Store on your iPhone/iPad
2. Search for "Expo Go"
3. Install the app developed by "Expo"
4. Or use this direct link: [Expo Go on App Store](https://apps.apple.com/app/expo-go/id982107779)

### Installation

1. Create a new Expo project (if starting from scratch):
   ```bash
   npx create-expo-app GameSearchApp --template blank
   cd GameSearchApp
   ```

2. Or clone this repository:
   ```bash
   git clone https://github.com/SidneyOps75/GameSearchApp.git
   cd GameSearchApp
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Install additional required packages:
   ```bash
   npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context react-native-gesture-handler axios
   ```

5. Start the Expo development server:
   ```bash
   npx expo start
   ```

5. Run the app:
   - **Mobile Device (Recommended)**:
     - Make sure you have Expo Go app installed (see Prerequisites above)
     - Open Expo Go app on your device
     - Scan the QR code displayed in the terminal
     - Your device and computer must be on the same Wi-Fi network
   - **Web**: Press `w` in the terminal to open in browser
   - **Android Emulator**: Press `a` in the terminal (requires Android Studio)
   - **iOS Simulator**: Press `i` in the terminal (requires Xcode, macOS only)

## Project Structure

```
src/
├── components/
│   └── GameCard.js          # Reusable game card component
├── navigation/
│   └── AppNavigator.js      # Navigation configuration
├── screens/
│   ├── HomeScreen.js        # Featured games screen
│   ├── SearchScreen.js      # Game search screen
│   └── GameDetailScreen.js  # Game details screen
└── services/
    └── api.js               # API service functions
```

## API Integration

The app uses the RAWG API (https://rawg.io/apidocs) to fetch game data. The API key is configured in `src/services/api.js`.

### Available API Functions

- `getFeaturedGames()`: Fetch popular games sorted by rating
- `searchGames(query)`: Search for games by name
- `getGameDetails(gameId)`: Get detailed information about a specific game
- `getGameScreenshots(gameId)`: Get screenshots for a specific game

## Screens

### Home Screen
- Displays featured games in a grid layout
- Pull-to-refresh functionality
- Navigation to search screen
- Tap on any game to view details

### Search Screen
- Text input for game search
- Real-time search results
- Empty states for no results or initial state
- Grid layout for search results

### Game Detail Screen
- Full game information display
- Image gallery with screenshots
- Back button navigation
- Detailed game metadata


## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

