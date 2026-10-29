import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { buscarCurso } from "../services/cursoService";

const CursoScreen = () => {
  const [turma, setCurso] = useState(null); // sucesso
  const [carregando, setCarregando] = useState(true); // começa carregando
  const [erro, setErro] = useState(null); // erro
  async function carregar() {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await buscarCurso();
      setCurso(dados);
    } catch (e) {
      setErro(e.message);
    } finally {
      // roda no sucesso E no erro
      setCarregando(false);
    }
  }
  useEffect(() => {
    carregar();
  }, []); // [] = uma única vez, quando a tela abre
  if (carregando) {
    return (
      <View style={estilos.centro}>
        <ActivityIndicator size="large" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={estilos.centro}>
        <Text style={estilos.textoErro}>{erro}</Text>
        <Pressable style={estilos.botao} onPress={carregar}>
          <Text style={estilos.textoBotao}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

return (
  <View>
    <View style={estilos.cabecalho}>
      <Text style={estilos.modalidade}>{turma.Proprietário}</Text>
      <Text style={estilos.titulo}>{turma.nome}</Text>
    </View>
  </View>
);
};
export default CursoScreen;

const estilos = StyleSheet.create({
    centro: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      gap: 8,
    },
    cabecalho: {
      padding: 24,
      marginBottom: 20,
      backgroundColor: "#1d4ed8",
    },
    modalidade: {
      marginBottom: 6,
      color: "#dbeafe",
      fontSize: 14,
    },
    titulo: {
        color: "#ffffff",
        fontSize: 28,
        fontWeight: "700",
      },
      textoErro: {
        color: "#b91c1c",
        textAlign: "center",
      },
      botao: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: "#1d4ed8",
      },
      textoBotao: {
        color: "#ffffff",
        fontWeight: "600",
      },
    });
    
      