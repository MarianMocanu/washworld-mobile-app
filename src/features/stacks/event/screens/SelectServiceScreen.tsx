import { Service, ServiceType } from '@models/Service';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ScreenHeader } from '@shared/ScreenHeader';
import { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTerminals } from '@queries/Terminals';
import { Terminal } from '@models/Terminal';
import { EventStackParamList } from 'src/navigation/EventNavigator';
import { ServicePicker } from '../../../shared/ServicePicker';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/app/store';
import { setLocationId, setServiceId } from './eventSlice';

export const SelectServiceScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<EventStackParamList, 'select-service'>>();
  const dispatch = useDispatch<AppDispatch>();
  const { locationId } = useSelector((state: RootState) => state.event);

  const { data: terminalsData } = useTerminals(locationId, { enabled: !!locationId });

  const [automatedServices, setAutomatedServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState(0);

  function getDistinctAutomatedServices(terminals: Terminal[]): Service[] {
    const allServices: Service[] = terminals.reduce((acc, terminal) => {
      if (terminal.services) {
        acc.push(...terminal.services);
      }
      return acc;
    }, [] as Service[]);

    const distinctAutomatedServices: Service[] = allServices.filter((service, index, self) => {
      if (service.type === ServiceType.auto) {
        return index === self.findIndex(serv => serv.id === service.id);
      }
    });
    return distinctAutomatedServices;
  }

  useEffect(() => {
    if (selectedServiceId) {
      dispatch(setServiceId(selectedServiceId));
      dispatch(setLocationId(locationId));
      navigation.navigate('scan-plate');
      setSelectedServiceId(0);
    }
  }, [selectedServiceId]);

  useEffect(() => {
    if (terminalsData) {
      setAutomatedServices(getDistinctAutomatedServices(terminalsData));
    }
  }, [terminalsData]);

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader backButtonShown onBackPress={navigation.goBack} />
      <ServicePicker
        title="Select service"
        services={automatedServices}
        onSelectPress={setSelectedServiceId}
      />
    </View>
  );
};
