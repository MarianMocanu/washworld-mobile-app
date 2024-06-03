import { colors } from '@globals/globalStyles';
import { FC, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LogoSVG } from 'src/assets/SVGIcons';
import { Button } from './Button';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  /**
   * Property that controls the visibility of the back button
   */
  backButtonShown?: boolean;
  /**
   * Function to be called when the back button is pressed
   */
  onBackPress?: () => void;
  /**
   * Property that controls the visibility of the filter button
   */
  filterButtonShown?: boolean;
  /**
   * Function to be called when the filter button is pressed
   */
  onFilterPress?: () => void;

  /**
   * Custom style for the header
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom icon to be displayed in place of the filter icon
   */
  overrideFilterIcon?: ReactNode;
};

export const ScreenHeader: FC<Props> = ({
  onBackPress,
  onFilterPress,
  backButtonShown,
  filterButtonShown,
  overrideFilterIcon,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.buttonContainer}>
        {backButtonShown && (
          <Button
            style={styles.pressableArea}
            leftIcon={
              <MaterialIcons name="keyboard-arrow-left" style={styles.icon} color={colors.black.base} />
            }
            onPress={onBackPress}
          />
        )}
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LogoSVG />
      </View>
      <View style={styles.buttonContainer}>
        {filterButtonShown && (
          <Button
            style={styles.pressableArea}
            rightIcon={
              overrideFilterIcon ? (
                overrideFilterIcon
              ) : (
                <MaterialIcons name="filter-list" style={styles.icon} color={colors.primary.base} />
              )
            }
            onPress={onFilterPress}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: colors.white.base,
  },
  pressableArea: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 24,
  },
  buttonContainer: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 32,
    lineHeight: 32,
  },
});
