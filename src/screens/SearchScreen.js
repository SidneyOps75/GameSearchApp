import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { searchGames } from '../services/api';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a game name to search');
      return;
    }

    try {
      setLoading(true);
      setHasSearched(true);
      const data = await searchGames(searchQuery.trim());
      setGames(data.results);
    } catch (error) {
      Alert.alert('Error', 'Failed to search games. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderGameCard = ({ item }) => (
    <TouchableOpacity
      style={styles.gameCard}
      onPress={() => navigation.navigate('GameDetail', { gameId: item.id, gameName: item.name })}
    >
      <Image
        source={{ uri: item.background_image }}
        style={styles.gameImage}
        resizeMode="cover"
      />
      <View style={styles.gameInfo}>
        <Text style={styles.gameTitle} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.gameRating}>
          ⭐ {item.rating}/5 ({item.ratings_count} reviews)
        </Text>
        <Text style={styles.gameReleased}>
          Released: {item.released || 'TBA'}
        </Text>
        {item.genres && item.genres.length > 0 && (
          <Text style={styles.gameGenres}>
            {item.genres.map(genre => genre.name).join(', ')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => {
    if (loading) return null;
    
    if (!hasSearched) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>🎮</Text>
          <Text style={styles.emptyStateTitle}>Search for Games</Text>
          <Text style={styles.emptyStateSubtitle}>
            Enter a game name above to find your favorite games
          </Text>
        </View>
      );
    }

    if (games.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>😔</Text>
          <Text style={styles.emptyStateTitle}>No Games Found</Text>
          <Text style={styles.emptyStateSubtitle}>
            Try searching with different keywords
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for games..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={loading}
        >
          <Text style={styles.searchButtonText}>
            {loading ? '...' : '🔍'}
          </Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Searching games...</Text>
        </View>
      )}

      <FlatList
        data={games}
        renderItem={renderGameCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.gamesList}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
    fontSize: 16,
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: '#3498db',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  gamesList: {
    padding: 8,
    flexGrow: 1,
  },
  gameCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gameImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  gameInfo: {
    padding: 12,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  gameRating: {
    fontSize: 12,
    color: '#f39c12',
    marginBottom: 4,
  },
  gameReleased: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  gameGenres: {
    fontSize: 11,
    color: '#95a5a6',
    fontStyle: 'italic',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyStateText: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default SearchScreen;
