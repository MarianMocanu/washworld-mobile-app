import { Service, ServiceType } from '@models/Service';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ScreenHeader } from '@shared/ScreenHeader';
import { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTerminals } from '@queries/Terminals';
import { Terminal } from '@models/Terminal';
import { EventStackParamList } from 'src/navigation/EventNavigator';
import { SelectService } from '../../../shared/SelectService';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/app/store';
import { setServiceId } from './eventSlice';

export const SelectServiceScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<EventStackParamList, 'select-service'>>();
  const route = useRoute<RouteProp<EventStackParamList, 'select-service'>>();
  const { locationId } = route.params;

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
      <SelectService
        title="Select service"
        services={automatedServices}
        onSelectPress={setSelectedServiceId}
      />
    </View>
  );
};
