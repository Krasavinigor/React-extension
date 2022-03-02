import Mediator from "@/storageMediator/BaseMediator";
import PersonHelper from "@/chromeScripts/helpers/personHelper";
import URLHelper from "@/chromeScripts/helpers/urlHelper";
import { EFooterState } from "@/components/common/EFooterState";
import IPerson from "@/interfaces/IPerson";
import { RequestStatus, RequestStatusHelper } from "@/chromeScripts/helpers/requestStatusHelper";
import EMainContent from "@/components/mainContent/EMainContent";
import { MainContentPayload } from "@/interfaces/MainContentPayload";
import { FooterPayload } from "@/interfaces/FooterPayload";
import UserHelper from "@/chromeScripts/helpers/userHelper";
import { replaceCandidateName } from "@/utils/utils";
import getTemplates from "@/chromeScripts/helpers/fetchTemplates";
import ITemplate from "@/interfaces/ITemplate";

export enum StorageMediatorEvents {
  GenerateFooterPayload,
  GenerateMainPayload
}

type StorageMediatorPayload = MainContentPayload | FooterPayload;

class StorageMediator implements Mediator<StorageMediatorPayload> {
  private static storageMediator: StorageMediator;

  private urlHelper: URLHelper;

  private personHelper: PersonHelper;

  private requestStatusHelper: RequestStatusHelper;

  private userHelper: UserHelper;

  private constructor() {
    this.personHelper = PersonHelper.getInstance();
    this.urlHelper = URLHelper.getInstance();
    this.requestStatusHelper = RequestStatusHelper.getInstance();
    this.userHelper = UserHelper.getInstance();
  }

  public static getInstance(): StorageMediator {
    if (!StorageMediator.storageMediator) {
      StorageMediator.storageMediator = new StorageMediator();
    }

    return StorageMediator.storageMediator;
  }

  public async notify(event: StorageMediatorEvents): Promise<StorageMediatorPayload> {
    switch (event) {
      case StorageMediatorEvents.GenerateFooterPayload:
        return this.generateFooterPayLoad();
      case StorageMediatorEvents.GenerateMainPayload:
        return this.generateMainPayLoad();
      default:
        throw new Error("Unexpected event type");
    }
  }

  private async generateFooterPayLoad(): Promise<FooterPayload> {
    let newPersonList = new Array<IPerson>();
    const currentUrl = await this.urlHelper.getCurrentUrl();
    const pageInfoForPersons = await this.personHelper.getPageInfoForPersons();
    const isLinkedin = await this.urlHelper.isLinkedinPage();

    if (currentUrl === pageInfoForPersons) {
      newPersonList = await this.personHelper.getPersons();
    }

    let componentState = EFooterState.WrongPage;

    if (isLinkedin) {
      const requestStatus = await this.requestStatusHelper.getStatus();

      if (requestStatus !== RequestStatus.Pending) {
        componentState = newPersonList.length
          ? EFooterState.HasMutualRecruiters
          : EFooterState.NoMutualRecruiters;
      } else {
        componentState = EFooterState.Loading;
      }
    }

    return {
      componentState,
      persons: newPersonList,
    };
  }

  private async generateMainPayLoad(): Promise<MainContentPayload> {
    try {
      let componentState = EMainContent.MainWrapper;

      const IsSignedIn: boolean = await this.userHelper.getIsSignedIn();

      // first case: need to SignIn
      if (!IsSignedIn) {
        componentState = EMainContent.GoogleAuth;
        return { componentState, templates: [] };
      }

      const email = await this.userHelper.getEmail();
      const templates: ITemplate[] = await getTemplates(email);

      // second case: user doesn't have templates
      if (!templates.length) {
        componentState = EMainContent.NoTemplates;
        return { componentState, templates: [] };
      }

      const candidateName: string = await this.personHelper.getCandidateName();

      const templatesWithName = templates
        .map((item) => replaceCandidateName(item, candidateName));

      // third case: main flow
      return { componentState, templates: templatesWithName };
    } catch (err) {
      return { componentState: EMainContent.ErrorContent, templates: [] };
    }
  }
}

export default StorageMediator;
