import GenericPageLayout from "@/components/layouts/genericPageLayout";
import React from "react";
import FedCMLinks from "./_components/fedcmLinks";
import FedCMExplanation from "./_components/fedcmExplanation";

export default function Home() {
  return (
    <>
      <GenericPageLayout
        formContent={FedCMLinks}
        explanationContent={FedCMExplanation}
        title=" Welcome to MockFedCM"
      />
    </>
  );
}
