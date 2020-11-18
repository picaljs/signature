import crypto from "crypto";

const toUriSafe = (str: string): string =>
  str.replace(/[+/]/gu, m0 => (m0 === "+" ? "-" : "_")).replace(/=+$/mu, "");

export const generateSignature = (
  url: string,
  key: string,
  salt: string
): string => {
  const hamc = crypto.createHmac("sha256", key);
  hamc.update(salt);
  hamc.update(url);
  const digest = hamc.digest().slice(0, 32).toString("base64");
  return toUriSafe(digest);
};
