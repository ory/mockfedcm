"use client";

import GenericPageLayout from "@/components/layouts/genericPageLayout";
import RPAction from "../_components/rpAction";
import RPActionExplanation from "../_components/rpActionExplanation";

export default function RPActionPage() {
  return (
    <>
      <GenericPageLayout
        formContent={RPAction}
        explanationContent={RPActionExplanation}
        title="Test FedCM"
      />
    </>
  );
}
