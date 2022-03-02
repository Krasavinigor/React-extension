import constants from "@/resources/constants";
import { log } from "@/utils/utils";
import StorageHelper from "./storageHelper";

export default class CookieHelper extends StorageHelper<chrome.cookies.Cookie[]> {
  private static instance: CookieHelper;

  // eslint-disable-next-line
  private constructor() {
    super();
  }

  public static getInstance(): CookieHelper {
    if (!CookieHelper.instance) {
      CookieHelper.instance = new CookieHelper();
    }

    return CookieHelper.instance;
  }

  public async getCookies(): Promise<unknown> {
    try {
      return new Promise((resolve) => {
        this.storage.local.get(["cookies"], (result) => {
          resolve(JSON.stringify(result.cookies));
        });
      });
    } catch (err) {
      log(err);
      return null;
    }
  }

  public async setCookies(): Promise<void> {
    return new Promise((resolve) => {
      try {
        chrome.cookies.getAll({
          url: constants.url.linkedIn,
        }, async (linkedinCookies) => {
          await this.updateState(linkedinCookies);
          resolve();
        });
      } catch (err) {
        log("Can't retrieve cookie from storage");
      }
    });
  }

  public async updateState(cookies: chrome.cookies.Cookie[]): Promise<void> {
    return new Promise<void>((resolve) => {
      try {
        this.storage.local.set({ cookies }, () => {
          log(constants.helper.setCookies);
          resolve();
        });
      } catch (err) {
        log("Can't update cookies");
        log(err);
      }
    });
  }
}
