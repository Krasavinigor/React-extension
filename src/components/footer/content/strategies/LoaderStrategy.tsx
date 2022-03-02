import React from "react";
import Loader from "@/components/loader/Loader";
import { Strategy } from "../content";

class LoaderStrategy implements Strategy {
  public getComponent(): JSX.Element {
    return <Loader />;
  }
}

export default LoaderStrategy;
