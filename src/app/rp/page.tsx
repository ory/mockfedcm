import React from "react";
import ExplanationSection from "./_components/rpExplanation";
import RPForm from "./_components/rpForm";
import GenericPageLayout from "@/components/layouts/genericPageLayout";

export default function RPPage() {
  return (
    <>
      <GenericPageLayout
        formContent={RPForm}
        explanationContent={ExplanationSection}
        title="Relying Party Setup"
      />
    </>
  );
}
