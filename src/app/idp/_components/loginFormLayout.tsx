import AlertMessage, { AlertType } from '@/components/ui/alertMessage';

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
        <div className='my-8'>
          <AlertMessage
            className='alert-warning'
            alertType={AlertType.WARNING}
            message='All identities created with this form will be deleted after 24 hours.'
          />
        </div>
        <div className='my-8'>
          <AlertMessage
            className='alert-info'
            alertType={AlertType.INFO}
            message="All identities created with this form are created using Ory. You can view Ory's privacy policy located here: <a href='https://www.ory.sh/legal/privacy'>https://www.ory.sh/legal/privacy</a>"
            allowHtml={true}
          />
        </div>
        <div className='col-span-1'>{explanationSection}</div>
        <div className='col-span-1'>{formSection}</div>
      </div>
    </div>
  );
};

export default LoginFormLayout;
