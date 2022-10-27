export type TupleToIntersection<T extends Record<string, unknown>[]> = {
  [I in keyof T]: (x: T[I]) => void;
}[number] extends (x: infer I) => void
  ? I extends Record<string, unknown>
    ? I
    : never
  : never;
