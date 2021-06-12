type Value = any;
type FieldValues = Record<string, Value>;
type ErrorMessage = false | string;

const is = {
  match: (testFn: Function, message = "") => (
    value: Value,
    fieldValues: FieldValues
  ): ErrorMessage => !testFn(value, fieldValues) && message
};

export default is;
