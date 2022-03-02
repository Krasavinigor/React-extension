import constants from "@/resources/constants";
import { log } from "@/utils/utils";
import URLHelper from "../helpers/urlHelper";
import PersonHelper from "../helpers/personHelper";
import PageParser from "./pageParser";

const urlHelper = URLHelper.getInstance();
const personHelper = PersonHelper.getInstance();
const pageParser = PageParser.getInstance();

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.command === constants.command.start) {
    const isUserPage = await urlHelper.isLinkedinPage();

    if (isUserPage) {
      try {
        const [body] = document.querySelectorAll("body");
        const { title } = document;
        pageParser.updateInnerHTML(body, title);
        const { userID, name, distance } = pageParser.getCandidateInfo();
        log(`Got userID: ${userID}, name: ${name}, distance: ${distance}`);

        await personHelper.setCandidateName(name);
        log(constants.helper.setCandidateName);

        chrome.runtime.sendMessage({
          command: constants.command.complete,
          data: { userID, distance },
        });
      } catch (err) {
        log(`Error: ${err}`);
      }
    }
  }
});
