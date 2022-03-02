import React, { useEffect, useState } from "react";
import StorageMediator, { StorageMediatorEvents } from "@/storageMediator/StorageMediator";
import Content from "./content/content";
import getStrategy from "./content/strategy/strategies";
import EMainContent from "./EMainContent";
import { MainContentPayload } from "@/interfaces/MainContentPayload";
import ITemplate from "@/interfaces/ITemplate";

function MainContent(): JSX.Element {
  const [state, setState] = useState<EMainContent>(EMainContent.NoTemplates);
  const [templates, setTemplates] = useState<ITemplate[]>([]);

  const storage = StorageMediator.getInstance();
  const content = new Content(getStrategy(state));

  useEffect(() => {
    async function setFooterState() {
      const componentPayload = await storage
        .notify(StorageMediatorEvents.GenerateMainPayload) as MainContentPayload;

      setState(componentPayload.componentState);
      setTemplates(componentPayload.templates);
    }

    setFooterState();
  }, [state]);

  function setContent(): JSX.Element {
    const strategy = getStrategy(state);

    if (strategy) {
      content.setStrategy(strategy);
    }

    return content.getComponent(templates);
  }

  return (
    <div>
      {setContent()}
    </div>
  );
}

export default MainContent;
