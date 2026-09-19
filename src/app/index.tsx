import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function HomeScreen() {
  const [imagemGato, setImagemGato] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function buscarGato() {
    try {
      setCarregando(true);

      const resposta = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );

      const urlImagem = resposta.data[0].url;

      setImagemGato(urlImagem);
    } catch (erro) {
      console.log("Erro ao buscar gato:", erro);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🐱 App de Gatos</Text>

      <Text style={styles.subtitulo}>
        Clique no botão para ver um gatinho!
      </Text>

      <Pressable style={styles.botao} onPress={buscarGato}>
        <Text style={styles.textoBotao}>Ver Gatinho</Text>
      </Pressable>

      {carregando && (
        <ActivityIndicator
          size="large"
          color="#ff6b6b"
          style={styles.loading}
        />
      )}

      {imagemGato && !carregando && (
        <Image
          source={{ uri: imagemGato }}
          style={styles.imagem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
    textAlign: "center",
  },

  botao: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  loading: {
    marginTop: 30,
  },

  imagem: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginTop: 30,
  },
});
