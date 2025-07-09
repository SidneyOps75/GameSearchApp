import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { getFeaturedGames } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadFeaturedGames();
  }, []);

  const loadFeaturedGames = async () => {
    try {
      setLoading(true);
      const data = await getFeaturedGames();
      setGames(data.results);
    } catch (error) {
      Alert.alert('Error', 'Failed to load featured games. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFeaturedGames();
    setRefreshing(false);
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
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading featured games...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Featured Games</Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.searchButtonText}>🔍 Search</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={games}
        renderItem={renderGameCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.gamesList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  searchButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  gamesList: {
    padding: 8,
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
  },
});

export default HomeScreen;
