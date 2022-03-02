import Assets from "@/assets";
import { IPageContext } from "@/interfaces/IPageContext";
import { IResponse } from "@/interfaces/IResponse";
import { convertRecruiterToPerson, log } from "@/utils/utils";
import CookieHelper from "../helpers/cookieHelper";
import PersonHelper from "../helpers/personHelper";
import { RequestStatus, RequestStatusHelper } from "../helpers/requestStatusHelper";
import RetrieveHelper from "../helpers/retrieveHelper";
import URLHelper from "../helpers/urlHelper";
import UserHelper from "../helpers/userHelper";

export default class FetchMutualRecruiters {
  private personHelper: PersonHelper;

  private retrieveHelper: RetrieveHelper;

  private cookieHelper: CookieHelper;

  private requestStatusHelper: RequestStatusHelper;

  private urlHelper: URLHelper;

  private userHelper: UserHelper;

  constructor() {
    this.personHelper = PersonHelper.getInstance();
    this.retrieveHelper = RetrieveHelper.getInstance();
    this.cookieHelper = CookieHelper.getInstance();
    this.requestStatusHelper = RequestStatusHelper.getInstance();
    this.urlHelper = URLHelper.getInstance();
    this.userHelper = UserHelper.getInstance();
  }

  public async initialFetch(msg: any): Promise<void> {
    try {
      // Notify background script to start fetching
      log("Verification passed start fetching...");
      const { data: { userID } } = msg;

      const cookies = await this.cookieHelper.getCookies();
      const recruiterEmail = await this.userHelper.getEmail();

      // Set Pending status
      chrome.action.setIcon({ path: Assets.images.logoFetching });
      await this.requestStatusHelper.updateState(RequestStatus.Pending);

      const result: IResponse = await this.retrieveHelper
        .fetchMutualRecruiters(recruiterEmail, cookies, userID);

      await this.requestStatusHelper.updateState(RequestStatus.Ready);
      chrome.action.setIcon({ path: Assets.images.logo });

      const currentTabContext = await this.createCurrentPageContext(result);
      await this.personHelper.updateState(currentTabContext);
      log("Fetching finished...");
    } catch (err) {
      log(`Error: ${err}`);
      await this.requestStatusHelper.updateState(RequestStatus.Ready);
      chrome.action.setIcon({ path: Assets.images.logo });
    }
  }

  public async remainingFetch(msg: any): Promise<void> {
    try {
      // Notify background script to start fetching
      log("Remaining fetch starting...");
      const { data: { userID } } = msg;

      const cookies = await this.cookieHelper.getCookies();
      const recruiterEmail = await this.userHelper.getEmail();

      // Set Pending status
      const pagePointer = await this.personHelper.getPagePointer();

      const result: IResponse = await this.retrieveHelper
        .fetchMutualRecruiters(recruiterEmail, cookies, userID, pagePointer);

      this.personHelper.updatePersonsList(result.mutualRecruits);
      log("Remaining fetching finished...");
    } catch (err) {
      log(`Error: ${err}`);
    }
  }

  private async createCurrentPageContext(response: IResponse): Promise<IPageContext> {
    const currentUrl = await this.urlHelper.getCurrentUrl();

    const convertedResult = convertRecruiterToPerson(response);

    return {
      persons: convertedResult.persons,
      pagePointer: convertedResult.pagePointer,
      pageURL: currentUrl,
    };
  }
}
