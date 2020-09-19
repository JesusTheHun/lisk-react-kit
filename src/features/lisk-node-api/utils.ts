import lisk from '@liskhq/lisk-client';
import {LiskAccountCredentials} from "../../services/types";

export const generateNewAccount = () => {
  const passphrase = lisk.passphrase.Mnemonic.generateMnemonic();
  const {publicKey, address} = lisk.cryptography.getAddressAndPublicKeyFromPassphrase(passphrase);

  return {
    passphrase,
    publicKey,
    address,
  } as LiskAccountCredentials;
};
