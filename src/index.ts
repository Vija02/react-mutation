import { useState } from "react"
import { MutationParamConfig, MutationReturnFunction, MutationReturnConfig, MutationReturn } from "./types"

function useMutation<TResult = any, TVariables = any>(mutationFn: (variables: TVariables) => Promise<TResult>, config?: MutationParamConfig<TVariables>): MutationReturn<TResult, TVariables> {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any | null>(null)

  const returnFunction: MutationReturnFunction<TResult, TVariables> = (variables, chain = x => x, overrideConfig = {}) => {
    setIsLoading(true)
    setError(null)

    const configToUse = {
      ...config,
      ...overrideConfig
    }

    configToUse?.onMutate && configToUse?.onMutate(variables)

    const chainCalls = chain(mutationFn(variables))
      .then((res) => {
        setIsLoading(false)
        return res
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err)
        throw err
      })

    if (configToUse?.chainSettle) {
      return configToUse.chainSettle(chainCalls)
    }

    return chainCalls
  }

  const returnConfig: MutationReturnConfig = {
    isLoading,
    error,
    reset: () => setError(null)
  }

  return [returnFunction, returnConfig]
}

export { useMutation }
