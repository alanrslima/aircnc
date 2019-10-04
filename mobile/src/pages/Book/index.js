import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native';
import api from '../../services/api';
import styles from './styles';

export default function Book({ navigation }) {

  const [date, setDate] = useState('');
  const id = navigation.getParam('id');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');
    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    });
    Alert.alert('Solicitação de reserva enviada');
    navigation.navigate('List');
  };

  function handleCancel() {
    navigation.navigate('List');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="words"
        autoCorrect={false}
        placeholder="Qual data você quer reservar"
        placeholderTextColor="#999"
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} >
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.cancelButton ]} onPress={handleCancel} >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
