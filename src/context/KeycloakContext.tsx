import { createContext, useContext, ReactNode } from 'react';
import Keycloak from 'keycloak-js';
import { useEffect, useState } from "react";

const CK_URL = import.meta.env.VITE_CK_URL;

type KeycloakContextType = {
  keycloak: Keycloak | null;
  authenticated: boolean;
  token: string | null;
  logout: () => void;
};

const KeycloakContext = createContext<KeycloakContextType | undefined>(undefined);

export const KeycloakProvider = ({ children }: { children: ReactNode }) => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const keycloakInstance = new Keycloak({
      url: `${CK_URL}/`,
      realm: "WarpPAD",
      clientId: "warppad"
    });

    keycloakInstance.init({
      onLoad: 'login-required',
      checkLoginIframe: false, // esto evita problemas con iframes
      enableLogging: true,
      redirectUri: window.location.origin + '/NuevaSolicitud' // o tu ruta inicial
    })
      .then((authenticated) => {
        console.log("Authenticated?", authenticated);
        setKeycloak(keycloakInstance);
        setAuthenticated(authenticated);
        setToken(keycloakInstance.token || null);

        setInterval(() => {
          keycloakInstance.updateToken(60).then((refreshed) => {
            if (refreshed) {
              setToken(keycloakInstance.token || null);
            }
          });
        }, 3000);
      })
      .catch((err) => {
        console.error("Error al inicializar Keycloak:", err);
      });
  }, []);


  const logout = () => {
    if (keycloak) {
      keycloak.logout();
    }
  };

  return (
    <KeycloakContext.Provider value={{ keycloak, authenticated, token, logout }}>
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => {
  const context = useContext(KeycloakContext);
  if (context === undefined) {
    throw new Error('useKeycloak debe usarse dentro de KeycloakProvider');
  }
  return context;
};