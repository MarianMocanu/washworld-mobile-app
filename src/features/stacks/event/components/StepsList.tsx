import { colors } from '@globals/globalStyles';
import { Step } from '@models/Step';
import { FC } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSteps } from '@queries/Steps';

type Props = {
  /**
   * The data of the steps to be displayed.
   */
  steps?: Step[];
};

export const StepsList: FC<Props> = ({ steps }) => {
  const { data: stepsData, isFetched } = useSteps();

  if (isFetched && steps) {
    return (
      <FlatList
        data={stepsData}
        keyExtractor={item => `step_${item.id}`}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <MaterialIcons
              name="check"
              style={styles.icon}
              color={steps[index] && steps[index].id === item.id ? colors.primary.base : colors.grey[30]}
            />
            <Text style={steps[index] && steps[index].id === item.id ? text.stepActive : text.stepInactive}>
              {item.name}
            </Text>
          </View>
        )}
        scrollEnabled={false}
        contentContainerStyle={styles.list}
      />
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  list: {
    width: Dimensions.get('screen').width - 48,
    height: Dimensions.get('window').height,
    paddingLeft: Dimensions.get('screen').width / 4,
  },
  item: {
    flexDirection: 'row',
    height: 28,
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    lineHeight: 24,
    paddingRight: 8,
  },
});

const text = StyleSheet.create({
  stepActive: {
    fontFamily: 'gilroy-medium',
    fontSize: 18,
    lineHeight: 22,
    color: colors.grey[90],
  },
  stepInactive: {
    fontFamily: 'gilroy-medium',
    fontSize: 18,
    lineHeight: 22,
    color: colors.grey[30],
  },
});
