"use client";

import React from "react";
import IdPExplanation from "./_components/idpExplanation";
import IdPForm from "./_components/loginForm";
import GenericPageLayout from "@/components/layouts/genericPageLayout";

export default function IdPPage() {
  return (
    <>
      <GenericPageLayout
        formContent={IdPForm}
        explanationContent={IdPExplanation}
        title="Identity Provider Setup"
      />
    </>
  );
}
