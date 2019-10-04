import React, { useState, useEffect } from 'react';
import {
  AsyncStorage,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import SpotList from '../../components/SpotList';
import logo from '../../assets/logo.png';
import styles from './styles';

export default function List() {

  const [techs, setTechs] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storageTechs => {
      const techsArray = storageTechs.split(',').map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map((tech, i) => <SpotList tech={tech} key={i} />)}
      </ScrollView>
    </SafeAreaView>
  );
}
