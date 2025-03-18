import AlertMessage, { AlertType } from '@/components/ui/alertMessage';

const LoginExplanation = () => {
  return (
    <div className='prose max-w-none'>
      <h2>Login as IdP User</h2>
      <p>
        This form let&apos;s you login as a user for the test IdP features of
        this Mock FedCM site. This account can be used to test the FedCM API as
        a relying party. You must first create a user using this link here:
        <a href='/idp/createUser'>Create User</a>
      </p>

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
          message="All identities created with this form are created using Ory. You can view Ory's privacy policy located here: https://www.ory.sh/legal/privacy"
        />
      </div>
    </div>
  );
};

export default LoginExplanation;
