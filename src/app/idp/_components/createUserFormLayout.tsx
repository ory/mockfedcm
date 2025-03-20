interface CreateUserFormLayoutProps {
  explanationSection: React.ReactNode;
  formSection: React.ReactNode;
}

const CreateUserFormLayout = ({
  explanationSection,
  formSection,
}: CreateUserFormLayoutProps) => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='col-span-1'>{explanationSection}</div>
        <div className='col-span-1'>{formSection}</div>
      </div>
    </div>
  );
};

export default CreateUserFormLayout;
