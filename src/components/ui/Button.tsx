import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Colors } from '../../constants/Theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  style
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(1) }],
  }));

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary': return Colors.primary[500];
      case 'secondary': return Colors.secondary[200];
      case 'ghost': return 'transparent';
      case 'danger': return Colors.error;
      default: return Colors.primary[500];
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary': return Colors.white;
      case 'secondary': return Colors.primary[700];
      case 'ghost': return Colors.primary[500];
      case 'danger': return Colors.white;
      default: return Colors.white;
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small': return { vertical: 8, horizontal: 16 };
      case 'large': return { vertical: 16, horizontal: 32 };
      default: return { vertical: 12, horizontal: 24 };
    }
  };

  const padding = getPadding();

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || isLoading}
        style={[
          styles.button,
          {
            backgroundColor: getBackgroundColor(),
            paddingVertical: padding.vertical,
            paddingHorizontal: padding.horizontal,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator color={getTextColor()} />
        ) : (
          <Text style={[styles.text, { color: getTextColor(), fontSize: size === 'large' ? 18 : 16 }]}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowColor: Colors.primary[700],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    fontFamily: 'Nunito-Bold',
    letterSpacing: 0.5,
  },
});
