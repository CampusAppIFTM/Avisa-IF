import ThemedText from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import useAuth from "@/hooks/useAuthHook";
import ThemedView from "@/components/ThemedView";
import { Image, StyleSheet } from "react-native";
import { useState } from "react";
import { Nav } from "@/components/nav";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);
      await logout();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedView safe = {true} style={styles.container}>
      <Image
        source={require("@/assets/auth_background.png")}
        style={styles.authImage}
      />

      <Nav />
    <ThemedView style ={styles.card}>
      <Image
        source={
          user?.photoURL
            ? { uri: user.photoURL }
            : require("@/assets/logo.png")
        }
        style={styles.avatar}
      />

      <ThemedText style={styles.name}>
        {user?.displayName ?? "Usuário"}
      </ThemedText>
     

      <ThemedButton
        onPress={handleLogout}
        disabled={loading} style ={{marginBottom: 50}}
      >
        <ThemedText
          style={{
            color: "#f2f2f2",
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          Logout
        </ThemedText>
      </ThemedButton>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  authImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16
  },

  name: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    marginBottom: 24,
  },
  card: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 150
  },
});