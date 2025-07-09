import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { getGameDetails, getGameScreenshots } from '../services/api';

const { width } = Dimensions.get('window');

const GameDetailScreen = ({ route, navigation }) => {
  const { gameId, gameName } = route.params;
  const [gameDetails, setGameDetails] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: gameName });
    loadGameDetails();
  }, [gameId, gameName]);

  const loadGameDetails = async () => {
    try {
      setLoading(true);
      const [detailsData, screenshotsData] = await Promise.all([
        getGameDetails(gameId),
        getGameScreenshots(gameId),
      ]);
      setGameDetails(detailsData);
      setScreenshots(screenshotsData.results.slice(0, 5)); // Limit to 5 screenshots
    } catch (error) {
      Alert.alert('Error', 'Failed to load game details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading game details...</Text>
      </View>
    );
  }

  if (!gameDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load game details</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadGameDetails}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: gameDetails.background_image }}
        style={styles.headerImage}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{gameDetails.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>
            ⭐ {gameDetails.rating}/5
          </Text>
          <Text style={styles.ratingCount}>
            ({gameDetails.ratings_count} reviews)
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Released:</Text>
          <Text style={styles.infoValue}>
            {gameDetails.released || 'TBA'}
          </Text>
        </View>

        {gameDetails.genres && gameDetails.genres.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Genres:</Text>
            <Text style={styles.infoValue}>
              {gameDetails.genres.map(genre => genre.name).join(', ')}
            </Text>
          </View>
        )}

        {gameDetails.platforms && gameDetails.platforms.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Platforms:</Text>
            <Text style={styles.infoValue}>
              {gameDetails.platforms.map(p => p.platform.name).join(', ')}
            </Text>
          </View>
        )}

        {gameDetails.developers && gameDetails.developers.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Developer:</Text>
            <Text style={styles.infoValue}>
              {gameDetails.developers.map(dev => dev.name).join(', ')}
            </Text>
          </View>
        )}

        {gameDetails.publishers && gameDetails.publishers.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Publisher:</Text>
            <Text style={styles.infoValue}>
              {gameDetails.publishers.map(pub => pub.name).join(', ')}
            </Text>
          </View>
        )}

        {gameDetails.description_raw && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {gameDetails.description_raw}
            </Text>
          </View>
        )}

        {screenshots.length > 0 && (
          <View style={styles.screenshotsContainer}>
            <Text style={styles.sectionTitle}>Screenshots</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {screenshots.map((screenshot, index) => (
                <Image
                  key={index}
                  source={{ uri: screenshot.image }}
                  style={styles.screenshot}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          </View>
        )}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back to Games</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 18,
    color: '#f39c12',
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    width: 100,
  },
  infoValue: {
    fontSize: 16,
    color: '#34495e',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    marginTop: 20,
  },
  descriptionContainer: {
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
  },
  screenshotsContainer: {
    marginTop: 8,
  },
  screenshot: {
    width: 200,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
  },
  backButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameDetailScreen;
