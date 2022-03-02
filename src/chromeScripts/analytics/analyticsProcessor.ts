import { log } from "@/utils/utils";
import constants from "@/resources/constants";

export interface analyticsPayload {
    ownerId: string;
    candidateId: string;
}

export default async function sendAnalytics(payload: analyticsPayload): Promise<void> {
  const header = new Headers();
  header.append("Content-Type", "application/json");

  try {
    const response = await fetch(`${constants.url.googleFunc.fetchAnalytics}`,
      { headers: header, method: "POST", body: JSON.stringify(payload) });
    if (response.status === 200) {
      await response.json();
    }
  } catch (err) {
    log(err);
  }
}
