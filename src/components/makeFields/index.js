import makeSelect from './makeSelect';
import makeInput from './makeInput';

export default useMember => {
  const Select = makeSelect(useMember);
  const Input = makeInput(useMember);

  return {Input, Select};
};
