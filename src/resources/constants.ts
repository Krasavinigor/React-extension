const constants = {
  header: { primary: "Recruiter's", secondary: "Assistant" },
  footer: {
    title: "Other recruiters in contacts",
  },
  reactionMessage: {
    happy: "You don't have mutual recruiters",
    wrongPage: "You're on the wrong page. Please, open a candidate's page on LinkedIn",
    error: "Something went wrong. Please, reload the page or contact developers",
    errorTemplates: "Something went wrong with templates. Please, reload the page or contact developers",
    auth: "Please, sign in with Google",
    noTemplates: "You don't have templates yet. Please, add templates on the portal",
  },
  editorButtons: {
    addToFriendWorkButton: "Add to FriendWork",
    copyButton: "Copy text",
  },
  url: {
    linkedIn: "https://www.linkedin.com/",
    linkedInUserPage: "https://www.linkedin.com/in/",
    googleFunc: {
      retrieve: "https://europe-west1-recruiters-extension.cloudfunctions.net/retrieve-mutual-recruiters",
      templates: "https://europe-west1-recruiters-extension.cloudfunctions.net/manage-templates",
      fetchAnalytics: "https://europe-west1-recruiters-extension.cloudfunctions.net/add-fetch/",
    },
  },
  helper: {
    setCookies: "Cookies are set in storage",
    setCandidateName: "Candidate name is set in storage",
    gotResult: "Got result from Google Function",
    fetch: "Start fetching",
  },
  httpMethod: {
    POST: "POST",
  },
  command: {
    start: "start",
    complete: "complete",
    fetch: "fetch",
  },
  common: {
    errorMessage: "Error due to fetching templates.",
  },
  candidateName: "CandidateName",
};

export default constants;
