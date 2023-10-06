export type ContextAction<T> = {
  type: T;
};

export type ContextActionWithPayload<T, P> = {
  type: T;
  payload: P;
};
