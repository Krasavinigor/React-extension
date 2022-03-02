import { log } from "@/utils/utils";
import UserHelper from "../helpers/userHelper";

class UserData {
    private defaultName = "DEFAULT_USER";

    private email = this.defaultName;

    private isSignedIn = false;

    private userHelper: UserHelper;

    constructor() {
      this.userHelper = UserHelper.getInstance();
    }

    // in case if user's status is changed
    public async updateUserInfo(isSignedIn = true): Promise<void> {
      try {
        const userProfile = await this.getProfileUserInfo();

        // in case then user install extension and
        // chrome.identity.onSignInChanged still doesn't trigger
        if (!isSignedIn || !userProfile.email.length) {
          await this.logoutUser();
          return;
        }

        // if code is still executed then user is signed in
        this.email = userProfile.email;
        this.isSignedIn = isSignedIn;
        await this.updateUserDate();
      } catch (err) {
        log(err);
      }
    }

    public getEmail(): Promise<string> {
      return this.userHelper.getEmail();
    }

    public isSignedInNow(): boolean {
      return this.isSignedIn;
    }

    public getDefaultName(): string {
      return this.defaultName;
    }

    private async logoutUser(): Promise<void> {
      this.email = this.defaultName;
      this.isSignedIn = false;

      try {
        await this.updateUserDate();
      } catch (err) {
        log("Unexpected error while writing to storage");
        log(err);
      }
    }

    private async updateUserDate(): Promise<void> {
      await this.userHelper.updateState({ isSignedIn: this.isSignedIn, email: this.email });
    }

    private getProfileUserInfo(): Promise<chrome.identity.UserInfo> {
      return new Promise((resolve, reject) => {
        try {
          chrome.identity
            .getProfileUserInfo({
              accountStatus: chrome.identity.AccountStatus.ANY,
            }, (userProfile) => {
              resolve(userProfile);
            });
        } catch (err) {
          log(err);
          reject();
        }
      });
    }
}

export default UserData;
