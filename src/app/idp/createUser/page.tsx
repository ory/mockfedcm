import CreateUserExplanation from '../_components/createUserExplantion';
import CreateUserForm from '../_components/createUserForm';
import CreateUserFormLayout from '../_components/createUserFormLayout';

export default function CreateUserPage() {
  return (
    <CreateUserFormLayout
      explanationSection={<CreateUserExplanation />}
      formSection={<CreateUserForm />}
    />
  );
}
