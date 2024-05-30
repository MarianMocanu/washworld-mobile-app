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

export const LevelStepsList: FC<Props> = ({ steps }) => {
  const { data: allStepsData, isFetched } = useSteps();

  if (isFetched && steps) {
    return (
      <FlatList
        data={allStepsData}
        keyExtractor={item => `step_${item.id}`}
        renderItem={({ item, index }) => {
          console.log(
            steps[index] && steps[index].id === item.id,
            steps[index] ? { stepdId: steps[index].id, itemId: item.id } : 'no step',
          );
          return (
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
          );
        }}
        scrollEnabled={false}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  list: {
    width: Dimensions.get('screen').width - 80,
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
