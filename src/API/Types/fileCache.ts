import { TFile } from "Components/Molecules/FileUpload/types";

export type TFileCacheRequest = {
  file?: TFile;
};

export type TFileCacheResponse = {
  data: {
    cacheId: string;
  };
};
