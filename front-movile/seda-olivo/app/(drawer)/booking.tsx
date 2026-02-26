import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { useMemo, useState } from "react";

export default function BookingScreen() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("");

  const isValid = useMemo(() => {
    return name.trim().length >= 2 && date.trim().length >= 4 && Number(people) >= 1;
  }, [name, date, people]);

  const submit = () => {
    if (!isValid) {
      Alert.alert("Revisa los campos", "Completa Nombre, Fecha y Personas correctamente.");
      return;
    }
    Alert.alert("Reserva enviada ✅", `Gracias ${name}. Te confirmamos pronto.`);
    setName("");
    setDate("");
    setPeople("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservas</Text>
      <Text style={styles.subtitle}>Reserva rápida para vivir Tokio × Santorini</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        placeholder="Ej: Lucas"
        placeholderTextColor="#94a3b8"
        style={[styles.input, name.trim().length >= 2 ? styles.ok : styles.ko]}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Fecha</Text>
      <TextInput
        placeholder="Ej: 15/02"
        placeholderTextColor="#94a3b8"
        style={[styles.input, date.trim().length >= 4 ? styles.ok : styles.ko]}
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Personas</Text>
      <TextInput
        placeholder="Ej: 2"
        placeholderTextColor="#94a3b8"
        style={[styles.input, Number(people) >= 1 ? styles.ok : styles.ko]}
        value={people}
        onChangeText={setPeople}
        keyboardType="numeric"
      />

      <Pressable style={[styles.button, !isValid && styles.buttonDisabled]} onPress={submit}>
        <Text style={styles.buttonText}>Confirmar reserva</Text>
      </Pressable>

      <Text style={styles.note}>
        *Simulación educativa: no envía datos reales. (Perfecto para practicar formularios)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617", padding: 24 },
  title: { color: "#fff", fontSize: 28, fontWeight: "900" },
  subtitle: { color: "#cbd5e1", marginTop: 6, marginBottom: 18 },

  label: { color: "#e5e7eb", fontWeight: "800", marginTop: 10, marginBottom: 8 },
  input: {
    backgroundColor: "#0f172a",
    borderRadius: 14,
    padding: 14,
    color: "#fff",
    borderWidth: 1,
  },
  ok: { borderColor: "rgba(56,189,248,0.55)" },
  ko: { borderColor: "rgba(255,78,205,0.25)" },

  button: {
    backgroundColor: "#ff4ecd",
    padding: 16,
    borderRadius: 999,
    marginTop: 18,
    shadowColor: "#ff4ecd",
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { textAlign: "center", color: "#fff", fontSize: 18, fontWeight: "900" },

  note: { color: "#94a3b8", marginTop: 14, fontSize: 12, lineHeight: 16 },
});
