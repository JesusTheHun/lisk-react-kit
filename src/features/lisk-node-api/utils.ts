import lisk from '@liskhq/lisk-client';

export const generateNewAccount = () => {
  const passphrase = lisk.passphrase.Mnemonic.generateMnemonic();
  const {publicKey, address} = lisk.cryptography.getAddressAndPublicKeyFromPassphrase(passphrase);

  return {
    passphrase,
    publicKey,
    address,
  };
};
