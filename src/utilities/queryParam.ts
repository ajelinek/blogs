import { useUrlSearchParams, useBrowserLocation } from 'solidjs-use'
import { type Accessor, createMemo } from 'solid-js'

// Define parameter IDs
export const QUERY_PARAM_IDS = {
  PAGE: 'page',
  TAG: 'tag',
} as const

// Type definitions for parameters
export type QueryParamId = typeof QUERY_PARAM_IDS.PAGE // Single value params
export type QueryParamsId = typeof QUERY_PARAM_IDS.TAG // Multiple value params

// Interface for the reactive location object provided by useBrowserLocation
interface ReactiveLocationStore {
  pathname: Accessor<string | undefined>
  search: Accessor<string | undefined>
  // hash?: Accessor<string | undefined>; // Not used here but part of the typical shape
}

// Helper function to build a preview URL string by applying modifications to search parameters
function buildPreviewUrl(
  currentLocationStore: ReactiveLocationStore,
  updateLogic: (searchParams: URLSearchParams) => void
): string {
  // Get current values by calling accessors, provide default empty string if undefined
  const currentSearch = currentLocationStore.search() ?? ''
  const currentPathname = currentLocationStore.pathname() ?? ''

  const searchParamsInstance = new URLSearchParams(currentSearch)
  updateLogic(searchParamsInstance)
  const queryString = searchParamsInstance.toString()
  return `${currentPathname}${queryString ? `?${queryString}` : ''}`
}

/**
 * Hook for managing a single query parameter
 * @param id The query parameter ID to manage (single value)
 */
export function useQueryParam(id: QueryParamId) {
  const [params, setParams] = useUrlSearchParams('history')
  const browserLocationStore = useBrowserLocation() as ReactiveLocationStore

  const getParam = () => {
    const rawValue = params()[id]
    return rawValue == null ? null : Array.isArray(rawValue) ? (rawValue[0] ?? null) : rawValue
  }

  const setParam = (value: string | null) => {
    if (value === null) {
      const { [id]: _, ...rest } = params()
      setParams(rest)
    } else {
      setParams({ [id]: value })
    }
  }

  const removeParam = () => {
    const { [id]: _, ...rest } = params()
    setParams(rest)
  }

  const toggleParam = (value: string) => {
    getParam() === value ? removeParam() : setParam(value)
  }

  const previewSetParam = (value: string | null) => {
    return buildPreviewUrl(browserLocationStore, searchParams => {
      searchParams.delete(id)
      if (value !== null) {
        searchParams.append(id, value)
      }
    })
  }

  const previewRemoveParam = () => {
    return buildPreviewUrl(browserLocationStore, searchParams => {
      searchParams.delete(id)
    })
  }

  const previewToggleParam = (value: string) => {
    return getParam() === value ? previewRemoveParam() : previewSetParam(value)
  }

  return {
    getParam,
    setParam,
    removeParam,
    toggleParam,
    previewSetParam,
    previewRemoveParam,
    previewToggleParam,
  }
}

/**
 * Hook for managing multiple values for a query parameter
 * @param id The query parameter ID to manage (multiple values)
 */
export function useQueryParams(id: QueryParamsId) {
  const [params, setParams] = useUrlSearchParams('history')
  const browserLocationStore = useBrowserLocation() as ReactiveLocationStore

  const getParams = (): string[] => {
    const rawValues = params()[id]
    if (rawValues == null) return []
    return Array.isArray(rawValues) ? rawValues : [rawValues]
  }

  const addParam = (valueToAdd: string) => {
    const currentParamValues = getParams()
    if (!currentParamValues.includes(valueToAdd)) {
      setParams({ [id]: [...currentParamValues, valueToAdd] })
    }
  }

  const addParams = (valuesToAdd: string[]) => {
    const currentParamValues = getParams()
    const updatedParamValues = Array.from(new Set([...currentParamValues, ...valuesToAdd]))
    setParams({ [id]: updatedParamValues })
  }

  const removeParam = (valueToRemove: string) => {
    const currentParamValues = getParams()
    const updatedParamValues = currentParamValues.filter(v => v !== valueToRemove)

    if (updatedParamValues.length === 0) {
      const { [id]: _, ...rest } = params()
      setParams(rest)
    } else {
      setParams({ [id]: updatedParamValues })
    }
  }

  const removeParams = (valuesToRemove: string[]) => {
    const currentParamValues = getParams()
    const valuesToRemoveSet = new Set(valuesToRemove)
    const updatedParamValues = currentParamValues.filter(v => !valuesToRemoveSet.has(v))

    if (updatedParamValues.length === 0) {
      const { [id]: _, ...rest } = params()
      setParams(rest)
    } else {
      setParams({ [id]: updatedParamValues })
    }
  }

  const toggleParam = (valueToToggle: string) => {
    const currentParamValues = getParams()
    if (currentParamValues.includes(valueToToggle)) {
      removeParam(valueToToggle)
    } else {
      addParam(valueToToggle)
    }
  }

  const previewAddParam = (valueToAdd: string) => {
    const currentParamValues = getParams()
    if (currentParamValues.includes(valueToAdd)) {
      // Get current values by calling accessors, provide default empty string if undefined
      const currentPathname = browserLocationStore.pathname() ?? ''
      const currentSearch = browserLocationStore.search() ?? ''
      return `${currentPathname}${currentSearch}`
    }
    return buildPreviewUrl(browserLocationStore, searchParams => {
      const updatedParamValues = [...currentParamValues, valueToAdd]
      searchParams.delete(id)
      updatedParamValues.forEach(val => searchParams.append(id, val))
    })
  }

  const previewRemoveParam = (valueToRemove: string) => {
    const currentParamValues = getParams()
    return buildPreviewUrl(browserLocationStore, searchParams => {
      const updatedParamValues = currentParamValues.filter(v => v !== valueToRemove)
      searchParams.delete(id)
      updatedParamValues.forEach(v => searchParams.append(id, v))
    })
  }

  const previewToggleParam = (valueToToggle: string) => {
    const currentParamValues = getParams()
    return currentParamValues.includes(valueToToggle)
      ? previewRemoveParam(valueToToggle)
      : previewAddParam(valueToToggle)
  }

  const previewAddParams = (valuesToAdd: string[]) => {
    const currentParamValues = getParams()
    return buildPreviewUrl(browserLocationStore, searchParams => {
      const updatedParamValues = Array.from(new Set([...currentParamValues, ...valuesToAdd]))
      searchParams.delete(id)
      updatedParamValues.forEach(v => searchParams.append(id, v))
    })
  }

  const previewRemoveParams = (valuesToRemove: string[]) => {
    const currentParamValues = getParams()
    return buildPreviewUrl(browserLocationStore, searchParams => {
      const valuesToRemoveSet = new Set(valuesToRemove)
      const updatedParamValues = currentParamValues.filter(v => !valuesToRemoveSet.has(v))
      searchParams.delete(id)
      updatedParamValues.forEach(v => searchParams.append(id, v))
    })
  }

  return {
    getParams,
    addParam,
    addParams,
    removeParam,
    removeParams,
    toggleParam,
    previewAddParam,
    previewRemoveParam,
    previewToggleParam,
    previewAddParams,
    previewRemoveParams,
  }
}
