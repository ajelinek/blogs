// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { useQueryParam, useQueryParams, QUERY_PARAM_IDS } from '../../src/utilities/queryParam'

// New tests for useQueryParam
describe('useQueryParam', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/test')
  })

  it('initializes with empty value', () => {
    const { getParam } = useQueryParam(QUERY_PARAM_IDS.PAGE)
    expect(getParam()).toBe(null)
  })

  it('sets a single value', () => {
    const { setParam, getParam } = useQueryParam(QUERY_PARAM_IDS.PAGE)
    setParam('1')
    expect(getParam()).toBe('1')
  })

  it('removes a value', () => {
    const { setParam, removeParam, getParam } = useQueryParam(QUERY_PARAM_IDS.PAGE)
    setParam('1')
    removeParam()
    expect(getParam()).toBe(null)
  })

  it('updates an existing value', () => {
    const { setParam, getParam } = useQueryParam(QUERY_PARAM_IDS.PAGE)
    setParam('1')
    setParam('2')
    expect(getParam()).toBe('2')
  })

  it('toggles a value on when not present', () => {
    const { toggleParam, getParam } = useQueryParam(QUERY_PARAM_IDS.PAGE)
    toggleParam('1')
    expect(getParam()).toBe('1')
  })

  it('toggles a value off when present', () => {
    const { setParam, toggleParam, getParam } = useQueryParam(QUERY_PARAM_IDS.PAGE)
    setParam('1')
    toggleParam('1')
    expect(getParam()).toBe(null)
  })

  it('toggles to a different value', () => {
    const { setParam, toggleParam, getParam } = useQueryParam(QUERY_PARAM_IDS.PAGE)
    setParam('1')
    toggleParam('2')
    expect(getParam()).toBe('2')
  })

  // Preview method tests
  describe('preview methods', () => {
    it('previews setting a param without changing state', () => {
      const { previewSetParam, getParam } = useQueryParam(QUERY_PARAM_IDS.PAGE)
      const url = previewSetParam('1')
      expect(url).toBe('/test?page=1')
      expect(getParam()).toBe(null)
    })

    it('previews setting a param with existing value', () => {
      const { setParam, previewSetParam, getParam } = useQueryParam(QUERY_PARAM_IDS.PAGE)
      setParam('1')
      const url = previewSetParam('2')
      expect(url).toBe('/test?page=2')
      expect(getParam()).toBe('1')
    })

    it('previews removing a param without changing state', () => {
      const { setParam, previewRemoveParam, getParam } = useQueryParam(QUERY_PARAM_IDS.PAGE)
      setParam('1')
      const url = previewRemoveParam()
      expect(url).toBe('/test')
      expect(getParam()).toBe('1')
    })

    it('previews toggling a param on without changing state', () => {
      const { previewToggleParam, getParam } = useQueryParam(QUERY_PARAM_IDS.PAGE)
      const url = previewToggleParam('1')
      expect(url).toBe('/test?page=1')
      expect(getParam()).toBe(null)
    })

    it('previews toggling a param off without changing state', () => {
      const { setParam, previewToggleParam, getParam } = useQueryParam(QUERY_PARAM_IDS.PAGE)
      setParam('1')
      const url = previewToggleParam('1')
      expect(url).toBe('/test')
      expect(getParam()).toBe('1')
    })

    it('previews toggling to a different value without changing state', () => {
      const { setParam, previewToggleParam, getParam } = useQueryParam(QUERY_PARAM_IDS.PAGE)
      setParam('1')
      const url = previewToggleParam('2')
      expect(url).toBe('/test?page=2')
      expect(getParam()).toBe('1')
    })
  })
})

describe('useQueryParams', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/test')
  })

  it('initializes with empty values', () => {
    const { getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
    expect(getParams()).toEqual([])
  })

  it('adds a single value', () => {
    const { addParam, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
    addParam('react')
    expect(getParams()).toEqual(['react'])
    addParam('typescript')
    expect(getParams()).toEqual(['react', 'typescript'])
  })

  it('adds multiple values', () => {
    const { addParams, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
    addParams(['react', 'typescript'])
    expect(getParams()).toEqual(['react', 'typescript'])
  })

  it('prevents duplicate values when adding', () => {
    const { addParam, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
    addParam('react')
    addParam('react')
    expect(getParams()).toEqual(['react'])
  })

  it('prevents duplicate values when adding multiple', () => {
    const { addParams, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
    addParams(['react', 'typescript'])
    addParams(['react', 'javascript'])
    expect(getParams()).toEqual(['react', 'typescript', 'javascript'])
  })

  it('removes a single value', () => {
    const { addParams, removeParam, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
    addParams(['react', 'typescript', 'javascript'])
    removeParam('typescript')
    expect(getParams()).toEqual(['react', 'javascript'])
  })

  it('removes multiple values', () => {
    const { addParams, removeParams, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
    addParams(['react', 'typescript', 'javascript', 'solidjs'])
    removeParams(['typescript', 'javascript'])
    expect(getParams()).toEqual(['react', 'solidjs'])
  })

  it('toggles a value on when not present', () => {
    const { toggleParam, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
    toggleParam('react')
    expect(getParams()).toEqual(['react'])
  })

  it('toggles a value off when present', () => {
    const { addParam, toggleParam, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
    addParam('react')
    toggleParam('react')
    expect(getParams()).toEqual([])
  })

  it('toggles multiple values independently', () => {
    const { toggleParam, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
    toggleParam('react')
    toggleParam('typescript')
    expect(getParams()).toEqual(['react', 'typescript'])
    toggleParam('react')
    expect(getParams()).toEqual(['typescript'])
  })

  // Preview method tests
  describe('preview methods', () => {
    it('previews adding a param without changing state', () => {
      const { previewAddParam, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
      const url = previewAddParam('react')
      expect(url).toBe('/test?tag=react')
      expect(getParams()).toEqual([])
    })

    it('previews adding multiple params without changing state', () => {
      const { previewAddParams, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
      const url = previewAddParams(['react', 'typescript'])
      expect(url).toBe('/test?tag=react&tag=typescript')
      expect(getParams()).toEqual([])
    })

    it('previews adding a param that already exists', () => {
      const { addParam, previewAddParam, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
      addParam('react')
      const url = previewAddParam('react')
      expect(url).toBe('/test')
      expect(getParams()).toEqual(['react'])
    })

    it('previews adding multiple params including existing ones', () => {
      const { addParam, previewAddParams, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
      addParam('react')
      const url = previewAddParams(['react', 'typescript'])
      expect(url).toBe('/test?tag=react&tag=typescript')
      expect(getParams()).toEqual(['react'])
    })

    it('previews removing a param without changing state', () => {
      const { addParams, previewRemoveParam, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
      addParams(['react', 'typescript'])
      const url = previewRemoveParam('react')
      expect(url).toBe('/test?tag=typescript')
      expect(getParams()).toEqual(['react', 'typescript'])
    })

    it('previews removing multiple params without changing state', () => {
      const { addParams, previewRemoveParams, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
      addParams(['react', 'typescript', 'javascript'])
      const url = previewRemoveParams(['react', 'javascript'])
      expect(url).toBe('/test?tag=typescript')
      expect(getParams()).toEqual(['react', 'typescript', 'javascript'])
    })

    it('previews removing a param that does not exist', () => {
      const { addParam, previewRemoveParam, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
      addParam('react')
      const url = previewRemoveParam('typescript')
      expect(url).toBe('/test?tag=react')
      expect(getParams()).toEqual(['react'])
    })

    it('previews toggling a param on without changing state', () => {
      const { previewToggleParam, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
      const url = previewToggleParam('react')
      expect(url).toBe('/test?tag=react')
      expect(getParams()).toEqual([])
    })

    it('previews toggling a param off without changing state', () => {
      const { addParam, previewToggleParam, getParams } = useQueryParams(QUERY_PARAM_IDS.TAG)
      addParam('react')
      const url = previewToggleParam('react')
      expect(url).toBe('/test')
      expect(getParams()).toEqual(['react'])
    })
  })
})
