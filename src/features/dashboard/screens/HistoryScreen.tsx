import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FC, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { DashboardStackParamList } from '../DashboardNavigator';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { WashEvent } from '../components/WashEvent';
import { ScreenHeader } from '@shared/ScreenHeader';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { useEvents } from '@queries/Event';

export const HistoryScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<DashboardStackParamList, 'history'>>();

  const { user } = useSelector((state: RootState): RootState['auth'] => state.auth);
  const { data: events } = useEvents(user?.id, { enabled: !!user?.id }, undefined);

  return (
    <View style={styles.container}>
      <ScreenHeader backButtonShown onBackPress={navigation.goBack} />
      <FlatList
        ListHeaderComponent={<Text style={textStyles.heading}>Recent washes</Text>}
        data={events}
        keyExtractor={(item, index) => `event_${item.id.toString()}_${index.toString()}`}
        renderItem={({ item: event }) => <WashEvent event={event} />}
        style={{ paddingHorizontal: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pressableArea: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 24,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white.base,
  },
});

const textStyles = StyleSheet.create({
  backButton: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.black.base,
  },
  heading: {
    ...globalTextStyles.heading,
    color: colors.black.base,
    paddingTop: 32,
    paddingBottom: 16,
  },
});
