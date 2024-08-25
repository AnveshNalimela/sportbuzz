import { SubmitHandler } from "react-hook-form";

export function withHandleSubmit<Inputs>(fn: SubmitHandler<Inputs>) {
  return function (data: Inputs) {
    
    return fn(data);
  };
}
