import { Service, ServiceType } from '@models/Service';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScreenHeader } from '@shared/ScreenHeader';
import { FC, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useTerminals } from '@queries/Terminals';
import { Terminal } from '@models/Terminal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/app/store';
import { useCar } from '@queries/Car';
import { Subscription } from '@models/Subscription';
import { SuccessRoute } from 'src/features/payment/PaymentNavigator';
import { MainStackParamsList } from 'src/navigation/MainNavigator';
import { EventStackParamList } from '../EventNavigator';
import { setCarId, setLocationId, setServiceId } from '../eventSlice';
import { ServicePicker } from '../components/ServicePicker';

export const SelectServiceScreen: FC = () => {
  const eventNavigator = useNavigation<NavigationProp<EventStackParamList, 'select-service'>>();
  const mainNavigator = useNavigation<NavigationProp<MainStackParamsList, 'stacks-event'>>();
  const dispatch = useDispatch<AppDispatch>();

  const { locationId } = useSelector((state: RootState) => state.event);
  const { carId } = useSelector((state: RootState) => state.activeCar);

  const { data: terminalsData } = useTerminals(locationId, { enabled: !!locationId });
  const { data: carData } = useCar(carId, { enabled: !!carId });

  const [automatedServices, setAutomatedServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState(0);

  const activeSubscription: Subscription | undefined = useMemo(() => {
    if (carData && carData.subscriptions) {
      return carData.subscriptions.find(subscription => subscription.active);
    }
    return undefined;
  }, [carData]);

  // console.debug('terminals', JSON.stringify(terminalsData, null, 2));

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
      if (activeSubscription) {
        eventNavigator.navigate('scan-plate');
      } else {
        mainNavigator.navigate('stacks-payment', {
          screen: 'payment-add',
          params: { successRoute: SuccessRoute.Service },
        });
      }
      setSelectedServiceId(0);
    }
  }, [selectedServiceId]);

  useEffect(() => {
    if (terminalsData) {
      setAutomatedServices(getDistinctAutomatedServices(terminalsData));
    }
  }, [terminalsData]);

  useEffect(() => {
    dispatch(setCarId(carId));
  }, [carId]);

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader backButtonShown onBackPress={eventNavigator.goBack} />
      <ServicePicker
        title="Select service"
        services={automatedServices}
        onSelectPress={setSelectedServiceId}
        activeSubscription={activeSubscription}
      />
    </View>
  );
};
