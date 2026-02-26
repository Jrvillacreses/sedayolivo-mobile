import { View, FlatList, StyleSheet, Pressable, Modal, Text } from "react-native";
import { useState } from "react";

const images = [
  { color: "#f43f5e", caption: "Neón & barra" },
  { color: "#3b82f6", caption: "Santorini vibes" },
  { color: "#8b5cf6", caption: "Plato firma" },
  { color: "#f97316", caption: "Tapas para compartir" },
  { color: "#ec4899", caption: "Cóctel de autor" },
  { color: "#06b6d4", caption: "Mesa nocturna" },
];

export default function GalleryScreen() {
  const [selected, setSelected] = useState<{ color: string; caption: string } | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galería</Text>

      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.tile} onPress={() => setSelected(item)}>
            <View style={[styles.thumb, { backgroundColor: item.color }]}>
              <Text style={styles.placeholderText}>📷</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.caption}</Text>
            </View>
          </Pressable>
        )}
      />

      <Modal visible={!!selected} transparent animationType="fade">
        <Pressable style={styles.modal} onPress={() => setSelected(null)}>
          {selected && (
            <View style={styles.modalCard}>
              <View style={[styles.full, { backgroundColor: selected.color }]}>
                <Text style={styles.fullPlaceholder}>📷</Text>
              </View>
              <Text style={styles.modalCaption}>{selected.caption}</Text>
              <Text style={styles.modalHint}>Toca para cerrar</Text>
            </View>
          )}
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#020617", flex: 1, padding: 10 },
  title: { color: "#fff", fontSize: 26, fontWeight: "900", marginBottom: 10 },

  tile: { width: "50%", padding: 6 },
  thumb: {
    width: "100%",
    height: 170,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: { fontSize: 48, opacity: 0.5 },
  badge: {
    position: "absolute",
    left: 14,
    bottom: 14,
    right: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "rgba(2,6,23,0.55)",
    borderWidth: 1,
    borderColor: "rgba(255,78,205,0.22)",
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "700" },

  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },
  modalCard: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.20)",
  },
  full: {
    width: "100%",
    height: 360,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  fullPlaceholder: { fontSize: 80, opacity: 0.5 },
  modalCaption: { color: "#fff", fontWeight: "900", fontSize: 16, marginTop: 10 },
  modalHint: { color: "#94a3b8", marginTop: 6, fontSize: 12 },
});
