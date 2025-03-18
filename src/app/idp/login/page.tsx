import LoginExplanation from '../_components/loginExplantion';
import LoginForm from '../_components/loginForm';
import LoginFormLayout from '../_components/loginFormLayout';

export default function LoginPage() {
  return (
    <LoginFormLayout
      explanationSection={<LoginExplanation />}
      formSection={<LoginForm />}
    />
  );
}
