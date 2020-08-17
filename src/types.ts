export type ChainPromise<TResult, TNewResult = TResult> = (chain: Promise<TResult>) => Promise<TNewResult>

export type MutationParamConfig<TVariables> = {
  // Called when query is called
  onMutate?: (variables: TVariables) => void
  // Accepts chain promise after local handler settled
  chainSettle?: ChainPromise<any>
}

export type MutationReturn<TResult, TVariables> = [
  MutationReturnFunction<TResult, TVariables>,
  MutationReturnConfig
]

export type MutationReturnFunction<TResult, TVariables> = (props: TVariables, chain?: ChainPromise<TResult>, overrideConfig?: MutationParamConfig<TVariables>) => Promise<TResult>
export type MutationReturnConfig = {
  // True if query is loading
  isLoading: boolean
  // Error object of previous request. Null if no error
  error: any
  // Resets the error object
  reset: () => void
}