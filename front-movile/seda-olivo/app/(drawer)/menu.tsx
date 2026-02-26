import { View, Text, StyleSheet, ScrollView } from "react-native";

type Dish = {
  name: string;
  desc: string;
  price: string;
  color: string;
};

const signature: Dish[] = [
  {
    name: "Tataki de Atún Rojo",
    desc: "Sésamo, soja dulce y aceite de oliva",
    price: "18 €",
    color: "#ef4444",
  },
  {
    name: "Bento Mediterráneo",
    desc: "Arroz, verduras asadas y pescado del día",
    price: "21 €",
    color: "#3b82f6",
  },
  {
    name: "Gyoza de Cordero",
    desc: "Yogur griego, menta y reducción cítrica",
    price: "16 €",
    color: "#8b5cf6",
  },
];

function DishCard({ d }: { d: Dish }) {
  return (
    <View style={styles.card}>
      <View style={[styles.image, { backgroundColor: d.color }]}>
        <Text style={styles.imagePlaceholder}>🍽️</Text>
      </View>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{d.name}</Text>
          <Text style={styles.desc}>{d.desc}</Text>
        </View>
        <Text style={styles.price}>{d.price}</Text>
      </View>
    </View>
  );
}

export default function MenuScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.h1}>Carta</Text>
      <Text style={styles.h2}>Platos Firma</Text>
      {signature.map((d, i) => (
        <DishCard key={i} d={d} />
      ))}

      <Text style={styles.h2}>Tapas Fusión</Text>
      <Text style={styles.smallNote}>Ejemplo (podéis añadir 4–6 tapas más)</Text>

      <View style={styles.simpleCard}>
        <Text style={styles.simpleTitle}>Bravas Wasabi</Text>
        <Text style={styles.simpleDesc}>Patata crujiente + mayo wasabi</Text>
        <Text style={styles.simplePrice}>9 €</Text>
      </View>

      <Text style={styles.h2}>Bento Mediterráneo</Text>
      <View style={styles.simpleCard}>
        <Text style={styles.simpleTitle}>Bento “Azul Santorini”</Text>
        <Text style={styles.simpleDesc}>Pescado, arroz y ensalada cítrica</Text>
        <Text style={styles.simplePrice}>19 €</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#020617", padding: 16 },
  h1: { color: "#fff", fontSize: 28, fontWeight: "900", marginBottom: 10 },
  h2: { color: "#fff", fontSize: 20, fontWeight: "800", marginTop: 16, marginBottom: 10 },
  smallNote: { color: "#94a3b8", marginBottom: 10, fontSize: 12 },

  card: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,78,205,0.18)",
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholder: { fontSize: 48, opacity: 0.6 },
  row: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  name: { color: "#fff", fontSize: 16, fontWeight: "800" },
  desc: { color: "#cbd5e1", marginTop: 6, lineHeight: 18 },
  price: { color: "#ff4ecd", fontWeight: "900", fontSize: 16 },

  simpleCard: {
    backgroundColor: "rgba(15,23,42,0.7)",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.18)",
    marginBottom: 12,
  },
  simpleTitle: { color: "#fff", fontWeight: "800", fontSize: 16 },
  simpleDesc: { color: "#cbd5e1", marginTop: 6 },
  simplePrice: { color: "#38bdf8", fontWeight: "900", marginTop: 10 },
});
