import constants from "@/resources/constants";
import PersonHelper from "./personHelper";
import { RequestStatus, RequestStatusHelper } from "./requestStatusHelper";
import URLHelper from "./urlHelper";

export default class FetchInitConditionsChecker {
  public isFetchMessageReceived(verificationStatus: boolean, msg: any): boolean {
    let currentVerificationResult = false;

    if (verificationStatus) {
      currentVerificationResult = msg.command === constants.command.complete;
    }

    return verificationStatus && currentVerificationResult;
  }

  public async isNotPendingRequest(verificationStatus: boolean): Promise<boolean> {
    let currentVerificationResult = false;

    if (verificationStatus) {
      const result = await RequestStatusHelper.getInstance().getStatus();
      currentVerificationResult = result !== RequestStatus.Pending;
    }

    return verificationStatus && currentVerificationResult;
  }

  public isUserIdValid(verificationStatus: boolean, msg: any): boolean {
    let currentVerificationResult = false;

    if (verificationStatus) {
      const { data: { userID } } = msg;
      currentVerificationResult = userID !== null;
    }

    return verificationStatus && currentVerificationResult;
  }

  public isAllowedDistance(verificationStatus: boolean, msg: any): boolean {
    let currentVerificationResult = true;

    if (verificationStatus) {
      const { data: { distance } } = msg;
      if (distance != null) {
        const numDist = Number.parseInt(distance, 10);
        currentVerificationResult = numDist < 3;
      }
    }

    return verificationStatus && currentVerificationResult;
  }

  public async resultExist(verificationStatus: boolean): Promise<boolean> {
    let currentVerificationResult = false;

    if (verificationStatus) {
      const resultsPage = await PersonHelper.getInstance().getPageInfoForPersons();
      const currentUrl = await URLHelper.getInstance().getCurrentUrl();
      currentVerificationResult = resultsPage !== currentUrl;
    }

    return verificationStatus && currentVerificationResult;
  }
}
