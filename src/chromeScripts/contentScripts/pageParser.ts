import IPageParser from "@/interfaces/IPageParser";

interface INameAndDistance {
  name: string;
  distance: string | null;
}

export default class PageParser {
  private documentBody: HTMLBodyElement | undefined;

  private documentTitle: string | undefined;

  // TODO: move the regular expression to serverless in the following PR
  private userIdRegExp =
    "facetConnectionOf=(.*);origin=MEMBER_PROFILE_CANNED_SEARCH";

  private distancePath = "mt2 relative";

  private static instance: PageParser;

  // eslint-disable-next-line
  private constructor() { }

  public static getInstance(): PageParser {
    if (!PageParser.instance) {
      PageParser.instance = new PageParser();
    }

    return PageParser.instance;
  }

  public getCandidateInfo(): IPageParser {
    const userID: string | null = this.getUserId();
    const { name, distance } = this.getNameAndDistance();

    return { userID, name, distance };
  }

  public updateInnerHTML(innerHTML: HTMLBodyElement, title: string): void {
    this.documentBody = innerHTML;
    this.documentTitle = title;
  }

  private getNameAndDistance(): INameAndDistance {
    let name = "";
    let distance = null;

    // sometimes we have '(1) Ekaterina Dotsenko | LinkedIn' or 'Ekaterina Dotsenko | LinkedIn'
    if (this.documentTitle) {
      const firstNumber = this.documentTitle.match(/\d+/);
      const isNumber = parseInt(firstNumber ? firstNumber[0] : "", 10);

      const title = this.documentTitle.split(" ");
      name = !Number.isNaN(isNumber) ? title[1] : title[0];
    }

    const userInfoTag = this.documentBody?.getElementsByClassName(this.distancePath);

    if (userInfoTag?.length) {
      // this data is dependent on the primary language in LinkedIn settings
      const russianDistance = userInfoTag[0].innerHTML.match(/контакт\s\w/);
      const englishDistance = userInfoTag[0].innerHTML.match(/(\d)\w+\s+degree\s+connection/);

      if (russianDistance) {
        [, distance] = russianDistance[0].split(" ");
      }

      if (englishDistance) {
        [, distance] = englishDistance;
      }
    }

    return { name, distance };
  }

  private getUserId(): string | null {
    const matches = this.documentBody?.innerHTML.match(new RegExp(this.userIdRegExp, "g"))
      ?? null;

    // Weak place here. Need to make it more stable. regex + xpath
    if (matches) {
      let userIdNotCleaned: string;

      if (matches.length > 1) {
        [, userIdNotCleaned] = matches;
      } else {
        [userIdNotCleaned] = matches;
      }

      const userIdList: RegExpMatchArray | null = userIdNotCleaned.match(
        new RegExp(this.userIdRegExp),
      );

      if (userIdList && userIdList.length > 1) {
        const [, unclearUserId] = userIdList;

        return unclearUserId.replace(/%22|&amp/g, "");
      }
    }

    return null;
  }
}
