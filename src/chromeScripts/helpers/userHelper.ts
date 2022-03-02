import StorageHelper from "./storageHelper";

interface IUserHelper {
    isSignedIn: boolean;
    email: string;
}

class UserHelper extends StorageHelper<IUserHelper> {
  private static instance: UserHelper;

  // eslint-disable-next-line
  private constructor() {
    super();
  }

  public static getInstance(): UserHelper {
    if (!UserHelper.instance) {
      UserHelper.instance = new UserHelper();
    }

    return UserHelper.instance;
  }

  public updateState({ isSignedIn, email }: IUserHelper): Promise<void> {
    return new Promise((resolve) => this.storage.sync
      .set({ isSignedIn, email }, () => resolve()));
  }

  public getIsSignedIn(): Promise<boolean> {
    return new Promise(
      (resolve) => this.storage.sync.get(["isSignedIn"], ({ isSignedIn }) => resolve(isSignedIn as boolean)),
    );
  }

  public getEmail(): Promise<string> {
    return new Promise(
      (resolve) => this.storage.sync.get(["email"], ({ email }) => resolve(email as string)),
    );
  }
}

export default UserHelper;
