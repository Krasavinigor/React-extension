import * as utils from "./utils";
import StorageMediator from "@/storageMediator/StorageMediator";
import { FooterPayload } from "@/interfaces/FooterPayload";
import { EFooterState } from "@/components/common/EFooterState";

export function mockMediator(): unknown {
  return jest.spyOn(
    StorageMediator
      .getInstance(),
    "notify",
  )
    .mockReturnValue(Promise.resolve({
      persons: utils.generateContactList(3),
      componentState: EFooterState.HasMutualRecruiters,
    } as FooterPayload));
}

export function mockMediatorWithEmptyList(): unknown {
  return jest.spyOn(
    StorageMediator
      .getInstance(),
    "notify",
  )
    .mockReturnValue(Promise.resolve({
      persons: utils.generateContactList(),
      componentState: EFooterState.NoMutualRecruiters,
    } as FooterPayload));
}
