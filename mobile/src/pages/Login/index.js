import React, { useState, useEffect } from 'react';
import { 
  View,
  Text, 
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
} from 'react-native';

import api from '../../services/api';
import logo from '../../assets/logo.png'
import styles from './styles';

export default function Login({ navigation }) {

  const [ email, setEmail ] = useState('');
  const [ techs, setTechs ] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('List');
      };
    })
  }, []);

  async function handleSubmit() {
    const response = await api.post('/sessions', {
      email
    });
    const { _id } = response.data;
    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);
    navigation.navigate('List');
  }; 

  return (
    <KeyboardAvoidingView style={styles.container} enabled={Platform.OS === 'ios'} behavior="padding">
      <Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput 
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput 
          style={styles.input}
          autoCapitalize="words"
          autoCorrect={false}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit} >
          <Text style={styles.buttonText}>Econtrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
