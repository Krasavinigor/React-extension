import IPerson from "@/interfaces/IPerson";
import IPersonState from "@/interfaces/IPersonState";
import { IResponse } from "@/interfaces/IResponse";
import ITemplate from "@/interfaces/ITemplate";
import constants from "@/resources/constants";

export function isDevMode(): boolean {
  return true;
}

export function generateContactList(contactsNumber = 3): IPerson[] {
  return new Array(contactsNumber).fill({
    name: "John Smith",
    status: "HR Yaroslavl Akvelon",
    imageUrl: "",
  });
}

export function log(data: unknown): void {
  if (isDevMode()) {
    // eslint-disable-next-line no-console
    console.log(data);
  }
}

export function generateListOfTemplates(name: string): ITemplate[] {
  const mockTemplateList = [];
  mockTemplateList.push({
    id: "40bc0485-f8cf-4441-9e74-16f774c572c8",
    title: "Angular",
    content: `Hi, ${name}!
    I'm Alejandro from Akvelon, a vendor of Microsoft.We are going to expand our office in Serbia and offer positions at Microsoft projects for .NET engineers. We also have DevOps and support roles. Could that be interesting for you?

    Thank you, HR`,
  });
  mockTemplateList.push({
    id: "40bc0485-f8cf-4441-9e74-16f774c572c7",
    title: "Xamarin",
    content: `Hi, ${name}!
    I'm Alejandro from Akvelon, a vendor of Microsoft.We are going to expand our office in Serbia and offer positions at Microsoft projects for .NET engineers. We also have DevOps and support roles. Could that be interesting for you?

    Thank you, HR-2`,
  });
  mockTemplateList.push({
    id: "40bc0485-f8cf-4441-9e74-16f774c572c6",
    title: "GitHub",
    content: `Hi, ${name}!
    I'm Alejandro from Akvelon, a vendor of Microsoft.We are going to expand our office in Serbia and offer positions at Microsoft projects for .NET engineers. We also have DevOps and support roles. Could that be interesting for you?

    Thanks you, HR-3`,
  });

  mockTemplateList.push({
    id: "40bc0485-f8cf-4441-9e74-16f774c572c5",
    title: "AppCenter",
    content: `Hi, ${name}!
    Я из компании Аквелон, не хотите у нас попработать. Мы сейчас в поисках какого-ниубдь разработичка, который сможет нам что-нибудь сделать

    Спасибо, HR-4`,
  });

  mockTemplateList.push({
    id: "40bc0485-f8cf-4441-9e74-16f774c572c4",
    title: "Valant",
    content: `Hi, ${name}!
    I'm Alejandro from Akvelon, a vendor of Microsoft.We are going to expand our office in Serbia and offer positions at Microsoft projects for .NET engineers. We also have DevOps and support roles. Could that be interesting for you?

    Thank you, HR-5`,
  });

  mockTemplateList.push({
    id: "40bc0485-f8cf-4441-9e74-16f774c572c3",
    title: "Carena",
    content: `Hi, ${name}!
    I'm Alejandro from Akvelon, a vendor of Microsoft.We are going to expand our office in Serbia and offer positions at Microsoft projects for .NET engineers. We also have DevOps and support roles. Could that be interesting for you?

    Thank you, HR-6`,
  });
  return mockTemplateList;
}

export function replaceCandidateName(template: ITemplate, newCandidateName: string): ITemplate {
  const regex = new RegExp(constants.candidateName, "g");
  const content: string = template.content.replace(regex, newCandidateName);

  return { ...template, content };
}

export function convertRecruiterToPerson(state: IResponse): IPersonState {
  const { mutualRecruits: persons, pagePointer } = state;

  return { persons, pagePointer };
}

export async function getTabUrl(): Promise<string | undefined> {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  return tab?.url;
}
