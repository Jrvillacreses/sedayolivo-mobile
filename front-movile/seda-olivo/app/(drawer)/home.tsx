import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.hero}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Seda & Olivo</Text>
        <Text style={styles.subtitle}>Donde el Sol se encuentra con el Dragón</Text>

        <Pressable style={styles.button} onPress={() => router.push("/booking")}>
          <Text style={styles.buttonText}>Reservar mesa</Text>
        </Pressable>

        <View style={styles.quickRow}>
          <View style={styles.quickCard}>
            <Text style={styles.quickTitle}>Tapas Fusión</Text>
            <Text style={styles.quickDesc}>Para compartir</Text>
          </View>
          <View style={styles.quickCard}>
            <Text style={styles.quickTitle}>Bento Med</Text>
            <Text style={styles.quickDesc}>Equilibrio</Text>
          </View>
          <View style={styles.quickCard}>
            <Text style={styles.quickTitle}>Cócteles</Text>
            <Text style={styles.quickDesc}>Neón night</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0f172a",
    backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 24,
    margin: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,78,205,0.35)",
  },
  title: { fontSize: 36, color: "#fff", fontWeight: "800", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#e5e7eb", marginBottom: 18, lineHeight: 22 },

  button: {
    backgroundColor: "#ff4ecd",
    paddingVertical: 14,
    borderRadius: 999,
    marginBottom: 18,
    shadowColor: "#ff4ecd",
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  buttonText: { textAlign: "center", color: "#fff", fontSize: 18, fontWeight: "700" },

  quickRow: { flexDirection: "row", gap: 10 },
  quickCard: {
    flex: 1,
    backgroundColor: "rgba(2,6,23,0.55)",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.25)",
  },
  quickTitle: { color: "#fff", fontWeight: "700" },
  quickDesc: { color: "#cbd5e1", marginTop: 4, fontSize: 12 },
});
