import { useState, useEffect, useCallback } from "react"

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

type FetchFunction<T, P> = (params: P) => Promise<T>

export function useFetch<T, P>(
  fetchFunction: FetchFunction<T, P>,
  initialParams: P,
): [FetchState<T>, (newParams: Partial<P>) => void] {
  const [params, setParams] = useState<P>(initialParams)
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const data = await fetchFunction(params)
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error })
    }
  }, [fetchFunction, params])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const updateParams = useCallback((newParams: Partial<P>) => {
    setParams((prev) => ({ ...prev, ...newParams }))
  }, [])

  return [state, updateParams]
}

