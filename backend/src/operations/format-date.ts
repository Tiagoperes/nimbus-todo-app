import { Expression, Operation } from "@zup-it/nimbus-backend-core"

export const formatDate = (time: Expression<number>) =>
  new Operation<string>('formatDate', [time])
