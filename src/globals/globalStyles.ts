import { TextStyle } from 'react-native';

export const colors = {
  primary: {
    base: '#34B566', // Green
  },
  secondary: {
    base: '#F36A21', // Orange
  },
  black: {
    base: '#000000',
  },
  white: {
    base: '#FFFFFF',
    cream: '#F7F7F7',
  },
  grey: {
    90: '#1A1A1A',
    80: '#333333',
    60: '#666666',
    30: '#BBBBBB',
    10: '#E5E5E5',
  },
  tertiary: {
    red: '#D71515',
    blue: '#335AB3',
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    diamond: '#5AE0FF',
  },
};

export const fonts = {};

export const globalTextStyles = {
  headingLarge: {
    fontFamily: 'gilroy-bold',
    fontSize: 28,
    lineHeight: 32,
  },
  heading: {
    fontFamily: 'gilroy-bold',
    fontSize: 18,
    lineHeight: 22,
  },
  inactive: {
    fontFamily: 'gilroy-medium',
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey[60],
  },
};
