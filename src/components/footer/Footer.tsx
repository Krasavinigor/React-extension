import React, { useEffect, useState } from "react";
import IPerson from "@/interfaces/IPerson";
import { FooterPayload } from "@/interfaces/FooterPayload";
import constants from "@/resources/constants";
import "./footer.css";
import { EFooterState } from "../common/EFooterState";
import getStrategy from "./content/strategies/strategies";
import Content from "./content/content";
import StorageMediator, { StorageMediatorEvents } from "@/storageMediator/StorageMediator";

function Footer(): JSX.Element {
  const [state, setState] = useState<EFooterState>(EFooterState.Loading);
  const [personList, setPersonList] = useState<IPerson[]>([]);

  const storage = StorageMediator.getInstance();
  const content = new Content(getStrategy(state));

  useEffect(() => {
    async function setFooterState() {
      const componentPayload = await storage
        .notify(StorageMediatorEvents.GenerateFooterPayload) as FooterPayload;

      setPersonList(componentPayload.persons);
      setState(componentPayload.componentState);
    }

    setFooterState();
  }, [state]);

  function setContent(): JSX.Element {
    const strategy = getStrategy(state);
    if (strategy) {
      content.setStrategy(strategy);
    }

    return content.getComponent(state, personList);
  }

  return (
    <div>
      <div className="footer-title">{constants.footer.title}</div>
      {setContent()}
    </div>
  );
}

export default Footer;
