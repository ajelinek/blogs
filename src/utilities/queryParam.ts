import { useUrlSearchParams } from 'solidjs-use'

// Define parameter IDs
export const QUERY_PARAM_IDS = {
  PAGE: 'page',
  TAG: 'tag',
} as const

// Type definitions for parameters
export type QueryParamId = typeof QUERY_PARAM_IDS.PAGE // Single value params
export type QueryParamsId = typeof QUERY_PARAM_IDS.TAG // Multiple value params

/**
 * Hook for managing a single query parameter
 * @param id The query parameter ID to manage (single value)
 */
export function useQueryParam(id: QueryParamId) {
  const params = useUrlSearchParams('history')

  const getParam = () => {
    const v = params[id]
    return v == null ? null : Array.isArray(v) ? (v[0] ?? null) : v
  }

  const setParam = (value: string | null) => {
    if (value == null) delete params[id]
    else params[id] = value
  }

  const removeParam = () => {
    delete params[id]
  }

  const toggleParam = (value: string) => {
    getParam() === value ? removeParam() : setParam(value)
  }

  // --- Preview helpers ---
  function previewSetParam(value: string | null): string {
    const url = new URL(window.location.href)
    if (value == null) url.searchParams.delete(id)
    else url.searchParams.set(id, value)
    return url.pathname + (url.search ? url.search : '')
  }

  function previewRemoveParam(): string {
    return previewSetParam(null)
  }

  function previewToggleParam(value: string): string {
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
  const params = useUrlSearchParams('history')

  const getParams = () => {
    const v = params[id]
    if (v == null) return []
    return Array.isArray(v) ? v : [v]
  }

  const addParam = (value: string) => {
    const current = getParams()
    if (!current.includes(value)) {
      params[id] = [...current, value]
    }
  }

  const addParams = (values: string[]) => {
    const current = getParams()
    const merged = Array.from(new Set([...current, ...values]))
    params[id] = merged
  }

  const removeParam = (value: string) => {
    const filtered = getParams().filter(v => v !== value)
    if (filtered.length === 0) delete params[id]
    else params[id] = filtered
  }

  const removeParams = (values: string[]) => {
    const setToRemove = new Set(values)
    const filtered = getParams().filter(v => !setToRemove.has(v))
    if (filtered.length === 0) delete params[id]
    else params[id] = filtered
  }

  const toggleParam = (value: string) => {
    getParams().includes(value) ? removeParam(value) : addParam(value)
  }

  // --- Preview helpers ---
  function previewAddParam(value: string): string {
    const url = new URL(window.location.href)
    const current = getParams()
    if (!current.includes(value)) {
      url.searchParams.delete(id)
      for (const v of [...current, value]) url.searchParams.append(id, v)
    }
    return url.pathname + (url.search ? url.search : '')
  }

  function previewAddParams(values: string[]): string {
    const url = new URL(window.location.href)
    const merged = Array.from(new Set([...getParams(), ...values]))
    url.searchParams.delete(id)
    for (const v of merged) url.searchParams.append(id, v)
    return url.pathname + (url.search ? url.search : '')
  }

  function previewRemoveParam(value: string): string {
    const url = new URL(window.location.href)
    const filtered = getParams().filter(v => v !== value)
    url.searchParams.delete(id)
    for (const v of filtered) url.searchParams.append(id, v)
    return url.pathname + (url.search ? url.search : '')
  }

  function previewRemoveParams(values: string[]): string {
    const url = new URL(window.location.href)
    const setToRemove = new Set(values)
    const filtered = getParams().filter(v => !setToRemove.has(v))
    url.searchParams.delete(id)
    for (const v of filtered) url.searchParams.append(id, v)
    return url.pathname + (url.search ? url.search : '')
  }

  function previewToggleParam(value: string): string {
    return getParams().includes(value) ? previewRemoveParam(value) : previewAddParam(value)
  }

  return {
    getParams,
    addParam,
    addParams,
    removeParam,
    removeParams,
    toggleParam,
    previewAddParam,
    previewAddParams,
    previewRemoveParam,
    previewRemoveParams,
    previewToggleParam,
  }
}
