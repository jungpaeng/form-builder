export type TupleToIntersection<T extends Record<string, unknown>[]> = {
  [I in keyof T]: (x: T[I]) => void;
}[number] extends (x: infer I) => void
  ? I
  : never;

export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;
