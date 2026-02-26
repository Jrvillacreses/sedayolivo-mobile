import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';


export default function HomeScreen() {
    const router = useRouter();
    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={require('../../assets/images/hero.jpg')} style={styles.hero}>
                <View style={styles.overlay}>
                    <Text style={styles.title}>SEDA & OLIVO</Text>
                    <Text style={styles.subtitle}>Donde el Sol se encuentra con el Dragón</Text>
                    <TouchableOpacity style={styles.button} onPress={() => router.push('/booking')}>
                        <Text style={styles.buttonText}>RESERVAR MESA</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={styles.quickCards}>
                <QuickCard title="Tapas Fusión" color="#00f2ff" />
                <QuickCard title="Bento Mediterráneo" color="#ff00ff" />
                <QuickCard title="Cócteles Autor" color="#0077b6" />
            </View>
        </ScrollView>
    );
}
function QuickCard({ title, color }: { title: string, color: string }) {
    return (
        <View style={[styles.card, { borderLeftColor: color }]}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardText}>Explora nuestra selección exclusiva de hoy.</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0a0a0c' },
    hero: { width: '100%', height: 350, justifyContent: 'flex-end' },
    overlay: { backgroundColor: 'rgba(0,0,0,0.4)', padding: 20, paddingBottom: 40 },
    title: { color: '#fff', fontSize: 42, fontWeight: '900', letterSpacing: -2 },
    subtitle: { color: '#00f2ff', fontSize: 18, fontStyle: 'italic', marginBottom: 20 },
    button: { backgroundColor: '#ff00ff', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 50, alignSelf: 'flex-start' },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    quickCards: { padding: 20, gap: 15 },
    card: { backgroundColor: '#1a1a1e', padding: 20, borderRadius: 15, borderLeftWidth: 5 },
    cardTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    cardText: { color: '#888', fontSize: 14 },
});


