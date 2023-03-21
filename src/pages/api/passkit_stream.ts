import { PKPass } from "passkit-generator";

const getStream = async () => {
  const pass = await PKPass.from({
    /**
     * Note: .pass extension is enforced when reading a
     * model from FS, even if not specified here below
     */
    model: "./passModels/myFirstModel.pass",
    certificates: {
      // wwdr,
      // signerCert,
      // signerKey,
      // signerKeyPassphrase8
    },
  }, {
    // keys to be added or overridden
    serialNumber: "AAGH44625236dddaffbda"
  });
}

export default async function handler(req, res) {
  const stream = await getStream();
  res.status(200).json({ text: 'Hello' });
}