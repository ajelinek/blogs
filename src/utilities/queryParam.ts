import { useUrlSearchParams } from 'solidjs-use'
import { createMemo } from 'solid-js'

// Define parameter IDs
export const QUERY_PARAM_IDS = {
  PAGE: 'page',
  TAG: 'tag',
} as const

// Type definitions for parameters
export type QueryParamId = typeof QUERY_PARAM_IDS.PAGE // Single value params
export type QueryParamsId = typeof QUERY_PARAM_IDS.TAG // Multiple value params

type ParamsObject = Record<string, string | string[] | undefined>

/**
 * Hook for managing a single query parameter
 * @param id The query parameter ID to manage (single value)
 */
export function useQueryParam(id: QueryParamId) {
  const [params, setParams] = useUrlSearchParams('history')

  const getParam = () => {
    const v = params()[id]
    return v == null ? null : Array.isArray(v) ? (v[0] ?? null) : v
  }

  const setParam = (value: string | null) => {
    if (value === null) {
      setParams({ [id]: '' }) // Empty string will remove the parameter
    } else {
      setParams({ [id]: value })
    }
  }

  const removeParam = () => {
    setParams({ [id]: '' }) // Empty string will remove the parameter
  }

  const toggleParam = (value: string) => {
    getParam() === value ? removeParam() : setParam(value)
  }

  const previewSetParam = (value: string | null) => {
    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)

    searchParams.delete(id)
    if (value !== null) {
      searchParams.append(id, value)
    }

    return url.pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
  }

  const previewRemoveParam = () => {
    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)

    searchParams.delete(id)

    return url.pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
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

  const getParams = (): string[] => {
    const values = params()[id]
    if (values == null) return []
    return Array.isArray(values) ? values : [values]
  }

  const addParam = (value: string) => {
    const currentValues = getParams()
    if (!currentValues.includes(value)) {
      setParams({ [id]: [...currentValues, value] })
    }
  }

  const addParams = (values: string[]) => {
    const currentValues = getParams()
    const merged = Array.from(new Set([...currentValues, ...values]))
    setParams({ [id]: merged })
  }

  const removeParam = (value: string) => {
    const currentValues = getParams()
    const newValues = currentValues.filter(v => v !== value)

    if (newValues.length === 0) {
      setParams({ [id]: '' }) // Empty string will remove the parameter
    } else {
      setParams({ [id]: newValues })
    }
  }

  const removeParams = (values: string[]) => {
    const setToRemove = new Set(values)
    const filtered = getParams().filter(v => !setToRemove.has(v))

    if (filtered.length === 0) {
      setParams({ [id]: '' }) // Empty string will remove the parameter
    } else {
      setParams({ [id]: filtered })
    }
  }

  const toggleParam = (value: string) => {
    const currentValues = getParams()
    if (currentValues.includes(value)) {
      removeParam(value)
    } else {
      addParam(value)
    }
  }

  const previewAddParam = (value: string) => {
    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)

    const currentValues = getParams()
    if (!currentValues.includes(value)) {
      searchParams.delete(id)
      currentValues.forEach(v => searchParams.append(id, v))
      searchParams.append(id, value)
      return url.pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    } else {
      // If the value already exists, return the path without changes
      return url.pathname + (url.search ? url.search : '')
    }
  }

  const previewRemoveParam = (value: string) => {
    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)

    const currentValues = getParams()
    const newValues = currentValues.filter(v => v !== value)

    searchParams.delete(id)
    newValues.forEach(v => searchParams.append(id, v))

    return url.pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
  }

  const previewToggleParam = (value: string) => {
    const currentValues = getParams()
    return currentValues.includes(value) ? previewRemoveParam(value) : previewAddParam(value)
  }

  const previewAddParams = (values: string[]) => {
    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)

    const currentValues = getParams()
    const newValues = [...new Set([...currentValues, ...values])]

    searchParams.delete(id)
    newValues.forEach(v => searchParams.append(id, v))

    return url.pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
  }

  const previewRemoveParams = (values: string[]) => {
    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)

    const currentValues = getParams()
    const newValues = currentValues.filter(v => !values.includes(v))

    searchParams.delete(id)
    newValues.forEach(v => searchParams.append(id, v))

    return url.pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
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
