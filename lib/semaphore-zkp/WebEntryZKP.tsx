import React from "react";
import {
  webViewRender,
  emit,
  useNativeMessage,
} from "react-native-react-bridge/lib/web";
//import { getFullProof } from "./semaphore-proof";
import { Strategy, ZkIdentity } from "@zk-kit/identity";

const Root = () => {
  const identity = {
    trapdoor: BigInt(
      "102682113564542590908225432418423066421474798368063686847729388578645986108"
    ),
    nullifier: BigInt(
      "318279518461529567956352636813207732772942133863500864160630567764046500917"
    ),
  };

  const merkleProof = {
    leaf: null,
    root: null,
    pathIndices: [0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    siblings: [
      BigInt(0),
      BigInt(
        "14744269619966411208579211824598458697587494354926760081771325075741142829156"
      ),
      BigInt(
        "7423237065226347324353380772367382631490014989348495481811164164159255474657"
      ),
      BigInt(
        "19408559725145180687717314546386705204574869472508568929913356010343162193098"
      ),
      BigInt(
        "20832067885112174195825859747844668284361933272074257711000650385169977092613"
      ),
      BigInt(
        "19712377064642672829441595136074946683621277828620209496774504837737984048981"
      ),
      BigInt(
        "13534170762360505477852949799050910698259448789077463733386946140925407808434"
      ),
      BigInt(
        "3396914609616007258851405644437304192397291162432396347162513310381425243293"
      ),
      BigInt(
        "21551820661461729022865262380882070649935529853313286572328683688269863701601"
      ),
      BigInt(
        "6573136701248752079028194407151022595060682063033565181951145966236778420039"
      ),
      BigInt(
        "12413880268183407374852357075976609371175688755676981206018884971008854919922"
      ),
      BigInt(
        "11829906754813033962042792463954234751876981765851839077833320607091315718159"
      ),
      BigInt(
        "20066985985293572387227381049700832219069292839614107140851619262827735677018"
      ),
      BigInt(
        "9394776414966240069580838672673694685292165040808226440647796406499139370960"
      ),
      BigInt(
        "11331146992410411304059858900317123658895005918277453009197229807340014528524"
      ),
      BigInt(
        "15819538789928229930262697811477882737253464456578333862691129291651619515538"
      ),
      BigInt(
        "19217088683336594659449020493828377907203207941212636669271704950158751593251"
      ),
      BigInt(
        "21035245323335827719745544373081896983162834604456827698288649288827293579666"
      ),
      BigInt(
        "6939770416153240137322503476966641397417391950902474480970945462551409848591"
      ),
      BigInt(
        "10941962436777715901943463195175331263348098796018438960955633645115732864202"
      ),
    ],
  };

  // useNativeMessage hook receives message from React Native
  useNativeMessage(async (message) => {
    if (message.type === "zkp_request") {
      const identity = new ZkIdentity(Strategy.RANDOM);
      //const identity = 1;
      // const fullProof = await getFullProof(
      //   identity,
      //   merkleProof,
      //   "wld_1234",
      //   "123"
      // );
      // console.log(fullProof);
      emit({ type: "zkp_response", data: { proof: 345, identity } });
    }
  });
  return <></>;
};

// This statement is detected by babelTransformer as an entry point
// All dependencies are resolved, compressed and stringified into one file
export default webViewRender(<Root />);
