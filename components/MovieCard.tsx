import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, layout = 'row', onSelect }) => {
  const isTile = layout === 'tile';

  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(movie.id)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: movie.poster }}
          style={isTile ? styles.posterTile : styles.posterRow}
          resizeMode="cover"
        />
        {isTile && (
          <View style={styles.badgeTile}>
            <Text style={styles.badgeText}>⭐ {movie.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>

      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>

        {!isTile && (
          <>
            <Text style={styles.subText}>
              {movie.genre} • {movie.year}
            </Text>
            <Text style={styles.ratingRow}>⭐ {movie.rating.toFixed(1)}</Text>
          </>
        )}

        <Text style={styles.status}>
          {movie.isShowing ? '✅ Đang chiếu' : '❌ Ngừng chiếu'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardTile: {
    flexDirection: 'column',
    flex: 1,
    margin: 5,
    padding: 0,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  posterRow: {
    width: 70,
    height: 100,
    borderRadius: 4,
  },
  posterTile: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  badgeTile: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  infoTile: {
    marginLeft: 0,
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  ratingRow: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
  },
});

export default React.memo(MovieCard);