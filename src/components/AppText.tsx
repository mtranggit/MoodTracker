import React from 'react';
import { Text, TextProps } from 'react-native';
import { theme } from '../theme';

type AppTextType = TextProps & {
  fontFamily: 'bold' | 'regular' | 'light';
  size: 8 | 10 | 12;
};

export const AppText: React.FC<AppTextType> = ({
  children,
  fontFamily,
  style,
  ...props
}) => {
  const fontStyle = React.useMemo(() => {
    if (fontFamily === 'bold') {
      return {
        fontFamily: theme.fontFamilyBold,
      };
    }
    if (fontFamily === 'regular') {
      return {
        fontFamily: theme.fontFamilyRegular,
      };
    }
    if (fontFamily === 'light') {
      return {
        fontFamily: theme.fontFamilyLight,
      };
    }
  }, [fontFamily]);
  return (
    <Text {...props} style={[style, fontStyle]}>
      {children}
    </Text>
  );
};
