import constants from "@/resources/constants";
import ITemplate from "@/interfaces/ITemplate";
import { log } from "@/utils/utils";

interface ITemplates {
  id: string;
  title: string;
  content: string;
  signature: string;
  isFavourite: boolean;
  isCommon: boolean;
  ownerId: string;
  createdOn: number;
  updatedOn: number;
}

interface IResponse {
  data: ITemplates[];
  statusMessage: string;
}

const fetchTemplates = async (email: string): Promise<Response> => {
  const templatesRes = await fetch(`${constants.url.googleFunc.templates}/?client=extension&ownerId=${email}`);

  return templatesRes;
};

const validateResponse = (response: Response) => {
  if (response.status !== 200 || response.status >= 400) {
    throw new Error();
  }
};

export default async function getTemplates(email: string): Promise<ITemplate[]> {
  try {
    const res: Response = await fetchTemplates(email);
    log(constants.helper.gotResult);
    validateResponse(res);

    const parsedResponse: IResponse = await res.json();
    log(parsedResponse);
    return parsedResponse.data.map(({ id, title, content }) => ({ id, title, content }));
  } catch (err) {
    log(err);

    throw new Error(constants.common.errorMessage);
  }
}
