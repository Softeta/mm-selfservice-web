export type TFile = File & {
    uri: ReturnType<typeof URL.createObjectURL>;
  };