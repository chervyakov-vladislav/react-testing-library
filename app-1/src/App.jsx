import './App.css';
import { Form } from './components/Form/Form';
import { Input } from './components/Input';
import { Title } from './components/Title/Title';
import { Text } from './components/Text';
import { ToggleTheme } from './components/ToggleTheme';
import { useCreateUser } from './hooks/use-create-user';

function App() {
  const { successMessage, errorMessage, onSubmit, onSuccess, onError } = useCreateUser();

  return (
    <main data-testid="app">
      <ToggleTheme />
      <Title>Create user</Title>
      <Form onSubmit={onSubmit} onSuccess={onSuccess} onError={onError}>
        <Input label="User name" name="name" />
        <Input label="Password" name="password" type="password" />
        <Input type="submit" value="Create user" />
      </Form>
      {successMessage && <Text isSuccess>{successMessage}</Text>}
      {errorMessage && <Text isError>{errorMessage}</Text>}
    </main>
  );
}

export default App;
