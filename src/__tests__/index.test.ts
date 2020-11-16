import { generateKey, encryptString, decryptString } from "..";

describe("tests...", () => {
  it("Generate Key", () => {
    expect(generateKey().length).toBeGreaterThanOrEqual(32);
  });

  it("Should pass if valid key is provided", () => {
    const key = generateKey();
    const payload = "Foo";
    const encrypted = encryptString(payload, key);
    const decrypted = decryptString(encrypted, key);
    expect(payload).toEqual(decrypted);
  });
});
