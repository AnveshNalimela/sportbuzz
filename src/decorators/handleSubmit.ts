import { SubmitHandler } from "react-hook-form";

export function withHandleSubmit<Inputs>(fn: SubmitHandler<Inputs>) {
  return function (data: Inputs) {
    console.log(`Form submitted with data: ${JSON.stringify(data)}`);
    return fn(data);
  };
}
