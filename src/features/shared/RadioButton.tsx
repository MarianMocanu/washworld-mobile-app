// RadioButton.js
import { colors, globalTextStyles } from '@globals/globalStyles';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface RadioButtonProps {
  label: string;
  price: string;
  value: number;
  selected: boolean;
  onSelect: (value: number) => void;
  disabled: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, price, value, selected, onSelect, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.radioButton, selected && styles.selectedRadioButton, disabled && styles.disabled]}
      onPress={() => {
        onSelect(value);
      }}
      disabled={disabled}
    >
      <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
        {selected && <MaterialIcons name={'check'} style={styles.checkmark} />}
      </View>
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
      <Text style={[styles.price, selected && styles.selectedPrice]}>{price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 43,
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.white.cream,
  },
  selectedRadioButton: {
    backgroundColor: colors.primary.base,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.grey[30],
    backgroundColor: colors.white.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOuterCircle: {
    borderWidth: 0,
  },
  checkmark: {
    fontSize: 24,
    color: colors.primary.base,
  },

  label: {
    marginLeft: 10,
    fontFamily: 'gilroy-medium',
    fontSize: 18,
  },
  selectedLabel: {
    color: colors.white.base,
  },
  price: {
    marginLeft: 'auto',
    ...globalTextStyles.inactive,
    fontSize: 18,
  },
  selectedPrice: {
    color: colors.white.base,
  },
  disabled: {
    opacity: 0.3,
  },
});

export default RadioButton;

