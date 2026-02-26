import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
export default function BookingScreen() {
    const [form, setForm] = useState({ name: '', date: '', people: '' });
    const [err, setErr] = useState<any>({});
    const handle = () => {
        if (!form.name || !form.date || !form.people) { setErr({ name: !form.name, date: !form.date, people: !form.people }); return; }
        Alert.alert("Éxito", "Reserva enviada");
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>RESERVA</Text>
            <TextInput style={[styles.input, err.name && { borderColor: 'red' }]} placeholder="Nombre" placeholderTextColor="#444" onChangeText={t => setForm({ ...form, name: t })} />
            <TextInput style={[styles.input, err.date && { borderColor: 'red' }]} placeholder="Fecha" placeholderTextColor="#444" onChangeText={t => setForm({ ...form, date: t })} />
            <TextInput style={[styles.input, err.people && { borderColor: 'red' }]} placeholder="Personas" placeholderTextColor="#444" onChangeText={t => setForm({ ...form, people: t })} />
            <TouchableOpacity style={styles.btn} onPress={handle}><Text style={{ color: '#fff', fontWeight: 'bold' }}>CONFIRMAR</Text></TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0a0a0c', padding: 20 },
    title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { backgroundColor: '#111', color: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
    btn: { backgroundColor: '#ff00ff', padding: 15, borderRadius: 10, alignItems: 'center' }
});


