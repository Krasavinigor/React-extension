import TabActivatedActions from "./tabActivatedActions";
import TabUpdatedActions from "./tabUpdatedActions";
import FetchMutualRecruiters from "./fetchMutualRecruiters";
import constants from "@/resources/constants";
import { getTabUrl, log } from "@/utils/utils";
import FetchInitConditionsChecker from "../helpers/fetchInitConditionsChecker";
import UserData from "./userData";
import SendAnalytics from "../analytics/analyticsProcessor";

const tabActivatedActions = new TabActivatedActions();
const tabUpdatedActions = new TabUpdatedActions();
const fetchInitScript = new FetchMutualRecruiters();
const userData = new UserData();

chrome.identity.onSignInChanged.addListener(async (_accountId, signedIn) => {
  await userData.updateUserInfo(signedIn);
});

chrome.runtime.onInstalled.addListener(async () => {
  await userData.updateUserInfo();
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const [activeTab] = tabs;

  chrome.tabs.sendMessage(activeTab.id, { command: constants.command.start });
});

chrome.tabs.onActivated.addListener(async () => {
  const url = await getTabUrl();
  await tabActivatedActions.tabActivated(url);
});

chrome.tabs.onUpdated.addListener(async (_tabId, changeInfo) => {
  const url = await getTabUrl();
  await tabUpdatedActions.tabUpdated(changeInfo, url);
});

chrome.runtime.onMessage.addListener(async (msg) => {
  // TODO #100: Remove checks and return back decorator.
  const extensionStateVerifier = new FetchInitConditionsChecker();
  let verificationResult = true;
  verificationResult = extensionStateVerifier.isFetchMessageReceived(verificationResult, msg);
  verificationResult = extensionStateVerifier.isAllowedDistance(verificationResult, msg);
  verificationResult = await extensionStateVerifier.isNotPendingRequest(verificationResult);
  verificationResult = extensionStateVerifier.isUserIdValid(verificationResult, msg);
  verificationResult = await extensionStateVerifier.resultExist(verificationResult);

  if (verificationResult) {
    await fetchInitScript.initialFetch(msg);
    sendAnalyticsRequest(msg);
    /*
      TODO "Limitations and approaches": Need to change approach for getting
      templates in background
    */
    // await fetchInitScript.remainingFetch(msg);
  }
});

async function sendAnalyticsRequest(msg: any) {
  log("Generating analytics...");

  let uEmail = await userData.getEmail();

  if (uEmail === userData.getDefaultName()) {
    log("Retry to get an email...");
    uEmail = await retryGetEmail();
  }

  const { data: { userID } } = msg;
  SendAnalytics({ ownerId: uEmail, candidateId: userID });
}

async function retryGetEmail(): Promise<string> {
  await userData.updateUserInfo();
  return userData.getEmail();
}
