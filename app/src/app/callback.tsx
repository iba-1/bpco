import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppState } from "../app-state";
import { i18n } from "../i18n";

// OIDC callback route: expo-router delivers the deep link here as
// /callback?code=...&state=.... Exchange the code, save the session, and
// let the index gate redirect to the right place.
export default function CallbackScreen() {
  const { code, state } = useLocalSearchParams<{ code?: string; state?: string }>();
  const { deps, refreshSession } = useAppState();
  const router = useRouter();

  useEffect(() => {
    if (!code || !state) {
      // Malformed callback: don't strand the user on the loading screen.
      router.replace("/");
      return;
    }
    void (async () => {
      try {
        const session = await deps.auth.exchangeCode(code, state);
        await deps.session.save(session);
        await refreshSession();
      } catch {
        // Failed exchange leaves the user on the auth screen.
      }
      router.replace("/");
    })();
  }, [code, state, deps, refreshSession, router]);

  return <>{i18n.t("common.app.loading")}</>;
}