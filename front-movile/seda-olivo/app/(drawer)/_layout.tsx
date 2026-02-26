import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#0b1c2d" },
        headerTintColor: "#fff",
        drawerStyle: { backgroundColor: "#0f172a" },
        drawerActiveTintColor: "#ff4ecd",
        drawerInactiveTintColor: "#94a3b8",
      }}
    >
      <Drawer.Screen name="home" options={{ title: "Inicio" }} />
      <Drawer.Screen name="menu" options={{ title: "Carta" }} />
      <Drawer.Screen name="gallery" options={{ title: "Galería" }} />
      <Drawer.Screen name="booking" options={{ title: "Reservas" }} />
    </Drawer>
  );
}
