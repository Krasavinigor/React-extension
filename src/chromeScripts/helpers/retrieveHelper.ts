import { IResponse } from "@/interfaces/IResponse";
import constants from "@/resources/constants";
import { log } from "@/utils/utils";

const FIRST_PAGE_POINTER = 0;

export default class RetrieveHelper {
  private static instance: RetrieveHelper;

  // eslint-disable-next-line
  private constructor() { }

  public static getInstance(): RetrieveHelper {
    if (!RetrieveHelper.instance) {
      RetrieveHelper.instance = new RetrieveHelper();
    }

    return RetrieveHelper.instance;
  }

  public async fetchMutualRecruiters(
    recruiterEmail: string,
    cookie: unknown,
    userID: string,
    startPoint: number = FIRST_PAGE_POINTER,
  ): Promise<IResponse> {
    log(constants.helper.fetch);

    const response = await fetch(`${constants.url.googleFunc.retrieve}?ownerId=${recruiterEmail}`, {
      method: constants.httpMethod.POST,
      body: JSON.stringify({
        pagePointer: startPoint,
        userID,
        cookie,
      }),
    });

    const res = await response.json();
    log(constants.helper.gotResult);
    log(res);

    const { mutualRecruits, pagePointer }: IResponse = res;
    log(`PagePointer ${pagePointer}`);
    log(`Number of mutual recruits ${mutualRecruits.length}`);

    return { mutualRecruits, pagePointer };
  }
}
