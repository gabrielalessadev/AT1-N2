import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');
  const [classificacao, setClassificacao] = useState('');

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
      Alert.alert('Erro', 'Por favor, insira valores válidos para peso e altura.');
      return;
    }

    const imc = pesoNum / (alturaNum * alturaNum);
    const imcFormatado = imc.toFixed(2);
    setResultado(imcFormatado);

    if (imc < 18.5) {
      setClassificacao('Abaixo do peso');
    } else if (imc < 25) {
      setClassificacao('Peso normal');
    } else if (imc < 30) {
      setClassificacao('Sobrepeso');
    } else if (imc < 35) {
      setClassificacao('Obesidade grau I');
    } else if (imc < 40) {
      setClassificacao('Obesidade grau II');
    } else {
      setClassificacao('Obesidade grau III');
    }
  };

  const limparCampos = () => {
    setPeso('');
    setAltura('');
    setResultado('');
    setClassificacao('');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Calculadora de Índice de Massa Corporal</Text>

        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />
        <TextInput
          style={styles.input}
          placeholder="Altura (m)"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />

        <TouchableOpacity style={styles.button} onPress={calcularIMC}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={limparCampos}>
          <Text style={styles.clearButtonText}>Limpar</Text>
        </TouchableOpacity>

        {resultado ? (
          <View style={styles.resultContainer}>
            <Text style={styles.result}>IMC: {resultado}</Text>
            <Text style={styles.result}>Classificação: {classificacao}</Text>
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90ee90',
  },
  scrollContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#000000',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#3c3c3c',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
  },
  clearButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  result: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginVertical: 4,
  },
});
