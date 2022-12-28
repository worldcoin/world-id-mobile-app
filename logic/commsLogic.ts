import SignClient from "@walletconnect/sign-client";
import { WALLET_CONNECT_PROJECT_ID } from "../constants/Config";

export const initWalletConnect = async (uri: string) => {
  const signClient = await SignClient.init({
    projectId: WALLET_CONNECT_PROJECT_ID,
    metadata: {
      name: "World ID",
      description:
        "Flagship client for World ID, decentralized self-custodial identity.",
      url: "https://id.worldcoin.org",
      icons: ["https://walletconnect.com/walletconnect-logo.png"], // TODO
    },
  });

  await signClient.core.pairing.pair({ uri });

  signClient.on("session_proposal", async (event) => {
    // Approve session proposal
    const { topic, acknowledged } = await signClient.approve({
      id: event.id,
      namespaces: {
        eip155: {
          accounts: ["eip155:1:0x0000000000..."],
          methods: ["personal_sign", "eth_sendTransaction"],
          events: ["accountsChanged"],
          extension: [
            {
              accounts: ["eip:137"],
              methods: ["eth_sign"],
              events: [],
            },
          ],
        },
      },
    });
  });
};
