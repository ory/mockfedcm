interface LoginFormLayoutProps {
  explanationSection: React.ReactNode;
  formSection: React.ReactNode;
}

const LoginFormLayout = ({
  explanationSection,
  formSection,
}: LoginFormLayoutProps) => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='col-span-1'>{explanationSection}</div>
        <div className='col-span-1'>{formSection}</div>
      </div>
    </div>
  );
};

export default LoginFormLayout;
