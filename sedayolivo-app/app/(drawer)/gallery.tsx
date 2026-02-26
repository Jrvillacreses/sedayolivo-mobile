import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
const GALLERY_DATA = [
    { id: '1', img: require('../../assets/images/gallery1.jpg'), title: 'Luces de Tokio' },
    { id: '2', img: require('../../assets/images/gallery2.jpg'), title: 'Alma Santorini' },
];
export default function GalleryScreen() {
    const [sel, setSel] = useState<any>(null);
    return (
        <View style={styles.container}>
            <FlatList data={GALLERY_DATA} numColumns={2} renderItem={({ item }) => (
                <TouchableOpacity style={styles.imgC} onPress={() => setSel(item)}>
                    <Image source={item.img} style={styles.thumb} />
                </TouchableOpacity>
            )} />
            <Modal visible={!!sel} transparent animationType="fade">
                <View style={styles.modal}>
                    {sel && <Image source={sel.img} style={styles.full} />}
                    <TouchableOpacity onPress={() => setSel(null)} style={styles.close}><Text style={{ color: '#fff' }}>CERRAR</Text></TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0a0a0c' },
    imgC: { flex: 1, aspectRatio: 1, margin: 5 },
    thumb: { width: '100%', height: '100%' },
    modal: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
    full: { width: '100%', height: '70%', resizeMode: 'contain' },
    close: { marginTop: 20, padding: 15, backgroundColor: '#ff00ff', borderRadius: 10 }
});


