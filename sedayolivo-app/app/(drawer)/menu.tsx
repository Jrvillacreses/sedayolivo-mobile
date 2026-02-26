import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
const menuData = [
    { title: 'Platos Firma', items: [{ id: '1', name: 'Gyoza de Gamba Blanca', price: '14€', desc: 'Salsa chipotle-yuzu.', img: require('../../assets/images/dish1.jpg') }] },
    { title: 'Tapas Fusión', items: [{ id: '4', name: 'Nigiri de Feta', price: '12€', desc: 'Arroz sushi con queso feta.', img: require('../../assets/images/dish2.jpg') }] }
];
export default function MenuScreen() {
    return (
        <ScrollView style={styles.container}>
            {menuData.map((section) => (
                <View key={section.title} style={styles.section}>
                    <Text style={styles.sectionTitle}>{section.title.toUpperCase()}</Text>
                    {section.items.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <Image source={item.img} style={styles.dishImage} />
                            <View style={styles.dishInfo}>
                                <View style={styles.headerRow}>
                                    <Text style={styles.dishName}>{item.name}</Text>
                                    <Text style={styles.dishPrice}>{item.price}</Text>
                                </View>
                                <Text style={styles.dishDesc}>{item.desc}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0a0a0c', padding: 20 },
    section: { marginBottom: 30 },
    sectionTitle: { color: '#00f2ff', fontSize: 14, fontWeight: 'bold', marginBottom: 15 },
    card: { flexDirection: 'row', backgroundColor: '#1a1a1e', borderRadius: 15, overflow: 'hidden', marginBottom: 15 },
    dishImage: { width: 80, height: 80 },
    dishInfo: { flex: 1, padding: 12 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between' },
    dishName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    dishPrice: { color: '#ff00ff', fontWeight: 'bold' },
    dishDesc: { color: '#888', fontSize: 12 },
});


