/* eslint-disable prettier/prettier */
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../common/CustomButton';
import {useDispatch} from 'react-redux';
import {addAddress, updateAddress} from '../redux/slices/AddressSlice';
import uuid from 'react-native-uuid';

const AddAddress = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [type, setType] = useState(
    route.params.type == 'edit'
      ? route.params.data.type == 'Casa'
        ? 1
        : 2
      : 1,
  );
  const [state, setState] = useState(
    route.params.type == 'edit' ? route.params.data.state : '',
  );
  const [city, setCity] = useState(
    route.params.type == 'edit' ? route.params.data.city : '',
  );
  const [pincode, setPincode] = useState(
    route.params.type == 'edit' ? route.params.data.pincode : '',
  );
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        title={route.params.type == 'edit' ? 'Editar Endereço' : 'Adicionar novo endereço'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <TextInput
        placeholder="Insira o estado"
        style={[styles.input, {marginTop: 50}]}
        value={state}
        onChangeText={txt => setState(txt)}
      />
      <TextInput
        placeholder="Insira a cidade"
        style={[styles.input, {marginTop: 15}]}
        value={city}
        onChangeText={txt => setCity(txt)}
      />
      <TextInput
        placeholder="Insira o CEP"
        keyboardType={'number-pad'}
        style={[styles.input, {marginTop: 15}]}
        value={pincode}
        onChangeText={txt => setPincode(txt)}
      />
      <View style={styles.typeView}>
        <TouchableOpacity
          style={[
            styles.typeBtn,
            {borderWidth: 0.5, borderColor: type == 1 ? '#6FFACC' : 'black'},
          ]}
          onPress={() => {
            setType(1);
          }}>
          <Image
            source={
              type == 1
                ? require('../images/radio_2.png')
                : require('../images/radio_1.png')
            }
            style={styles.radio}
          />
          <Text style={styles.radioText}>{'Casa'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeBtn,
            {borderWidth: 0.5, borderColor: type == 2 ? '#6FFACC' : 'black'},
          ]}
          onPress={() => {
            setType(2);
          }}>
          <Image
            source={
              type == 2
                ? require('../images/radio_2.png')
                : require('../images/radio_1.png')
            }
            style={styles.radio}
          />
          <Text style={styles.radioText}>{'Trabalho'}</Text>
        </TouchableOpacity>
      </View>
      <CustomButton
        bg={'#00CBDD'}
        title={'Salvar endereço'}
        color="#fff"
        onClick={() => {
          if (route.params.type == 'edit') {
            dispatch(
              updateAddress({
                state: state,
                city: city,
                pincode: pincode,
                type: type == 1 ? 'Casa' : 'Trabalho',
                id: route.params.data.id,
              }),
              navigation.goBack(),
            );
          } else {
            dispatch(
              addAddress({
                state: state,
                city: city,
                pincode: pincode,
                type: type == 1 ? 'Casa' : 'Trabalho',
                id: uuid.v4(),
              }),
              navigation.goBack(),
            );
          }
        }}
      />
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#0095DD',
    borderRadius: 25,
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  typeView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  typeBtn: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  radio: {
    width: 24,
    height: 24,
  },
  radioText: {marginLeft: 10},
});
