import {Brand} from "utility-types";

export type LiskTransactionPayload<Asset> = {
  networkIdentifier: string;
  timestamp: number;
  asset: Asset;
}
