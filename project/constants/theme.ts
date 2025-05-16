export const COLORS = {
  primary: '#4CAF50',
  primaryLight: '#81C784',
  primaryDark: '#388E3C',
  
  secondary: '#795548',
  secondaryLight: '#A1887F',
  secondaryDark: '#5D4037',
  
  accent: '#FF9800',
  accentLight: '#FFB74D',
  accentDark: '#F57C00',
  
  success: '#43A047',
  warning: '#FFA000',
  error: '#D32F2F',
  
  black: '#212121',
  darkGray: '#757575',
  gray: '#9E9E9E',
  lightGray: '#F5F5F5',
  white: '#FFFFFF',
  
  transparentWhite: 'rgba(255, 255, 255, 0.8)',
  transparentBlack: 'rgba(0, 0, 0, 0.6)',
};

export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  margin: 16,

  // Font sizes
  largeTitle: 40,
  h1: 30,
  h2: 24,
  h3: 18,
  h4: 16,
  h5: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  small: 10,
};

export const FONTS = {
  largeTitle: { fontFamily: 'Poppins-SemiBold', fontSize: SIZES.largeTitle },
  h1: { fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'Inter-Bold', fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: 'Inter-Bold', fontSize: SIZES.h4, lineHeight: 20 },
  h5: { fontFamily: 'Inter-Bold', fontSize: SIZES.h5, lineHeight: 18 },
  body1: { fontFamily: 'Inter-Regular', fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: 'Inter-Regular', fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: 'Inter-Regular', fontSize: SIZES.body3, lineHeight: 24 },
  body4: { fontFamily: 'Inter-Regular', fontSize: SIZES.body4, lineHeight: 21 },
  body5: { fontFamily: 'Inter-Regular', fontSize: SIZES.body5, lineHeight: 18 },
  medium: { fontFamily: 'Inter-Medium' },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;