import FedCMRPForm from './_components/rpForm';
import FormLayout from './_components/rpFormLayout';
import ExplanationSection from './_components/explanationSection';

export default function RPPage() {
  return (
    <FormLayout
      explanationSection={<ExplanationSection />}
      formSection={<FedCMRPForm />}
    />
  );
}
