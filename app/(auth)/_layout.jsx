import { Stack, Redirect } from "expo-router";
import useAuth from "@/hooks/useAuthHook";

export default function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }
  if (user) {
    return <Redirect href="/" />;
  }
  return (
    <Stack screenOptions={{
      headerShown: false,
      animation: "none"
      }}
    />

  )
}
