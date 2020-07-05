export type QueryArray = Array<QueryRule | string>

export type QueryRule = {
  and?: QueryArray
  or?: QueryArray
}

export type User = object | boolean | string | null
