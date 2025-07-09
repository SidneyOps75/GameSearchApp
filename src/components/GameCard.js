import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const GameCard = ({ game, onPress }) => {
  return (
    <TouchableOpacity style={styles.gameCard} onPress={onPress}>
      <Image
        source={{ uri: game.background_image }}
        style={styles.gameImage}
        resizeMode="cover"
      />
      <View style={styles.gameInfo}>
        <Text style={styles.gameTitle} numberOfLines={2}>
          {game.name}
        </Text>
        <Text style={styles.gameRating}>
          ⭐ {game.rating}/5 ({game.ratings_count} reviews)
        </Text>
        <Text style={styles.gameReleased}>
          Released: {game.released || 'TBA'}
        </Text>
        {game.genres && game.genres.length > 0 && (
          <Text style={styles.gameGenres}>
            {game.genres.map(genre => genre.name).join(', ')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default GameCard;
