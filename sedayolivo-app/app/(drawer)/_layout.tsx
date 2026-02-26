import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';


export default function DrawerLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer screenOptions={{
                headerStyle: { backgroundColor: '#0a0a0c' },
                headerTintColor: '#fff',
                drawerStyle: { backgroundColor: '#0a0a0c', width: 250 },
                drawerActiveTintColor: '#00f2ff',
                drawerInactiveTintColor: '#888',
                headerTitleStyle: { fontWeight: 'bold' },
            }}>
                <Drawer.Screen name="home" options={{ drawerLabel: 'Inicio', title: 'Seda & Olivo', drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }} />
                <Drawer.Screen name="menu" options={{ drawerLabel: 'Carta', title: 'Nuestra Carta', drawerIcon: ({ color, size }) => <Ionicons name="restaurant" size={size} color={color} /> }} />
                <Drawer.Screen name="gallery" options={{ drawerLabel: 'Galería', title: 'Visuales', drawerIcon: ({ color, size }) => <Ionicons name="images" size={size} color={color} /> }} />
                <Drawer.Screen name="booking" options={{ drawerLabel: 'Reserva', title: 'Tu Mesa', drawerIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} /> }} />
            </Drawer>
        </GestureHandlerRootView>
    );
}


