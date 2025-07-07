// src/components/BotpressChatLoader.jsx
import { useEffect } from 'react';

export default function BotpressChatLoader() {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v3.0/inject.js";
    script1.defer = true;

    script1.onload = () => {
      const script2 = document.createElement("script");
      script2.src = "https://files.bpcontent.cloud/2025/07/04/04/20250704043918-UX9T9WDI.js";
      script2.defer = true;

      script2.onload = () => {
        if (window.botpressWebChat) {
          window.botpressWebChat.init({
            botId: import.meta.env.VITE_BOTPRESS_BOT_ID,
            clientId: import.meta.env.VITE_BOTPRESS_CLIENT_ID,
            hostUrl: import.meta.env.VITE_BOTPRESS_HOST_URL,
            messagingUrl: import.meta.env.VITE_BOTPRESS_MESSAGING_URL,
            botName: import.meta.env.VITE_BOTPRESS_BOT_NAME,
            containerWidth: "400px",
            layoutWidth: "100%",
            hideWidget: false,
            enableConversationDeletion: true,
            stylesheet: import.meta.env.VITE_BOTPRESS_STYLESHEET,
          });
        } else {
          console.error("botpressWebChat not available after script load.");
        }
      };

      document.body.appendChild(script2);
    };

    document.body.appendChild(script1);
  }, []);

  return null;
}
