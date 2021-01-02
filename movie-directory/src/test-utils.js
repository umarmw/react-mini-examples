import {
  render,
  queryHelpers,
  getElementError
} from 'react-testing-library'

export const queryByTestId = queryHelpers.queryByAttribute.bind(
  null,
  'id',
)
export const queryAllByTestId = queryHelpers.queryAllByAttribute.bind(
  null,
  'id',
)

export const getAllByTestId = (container, id, ...rest) => {
  const els = queryAllByTestId(container, id, ...rest)
  if (!els.length) {
    throw getElementError(
      `Unable to find an element by: [id="${id}"]`,
      container,
    )
  }
  return els
}

export const getByTestId = (...args) => {
  return queryHelpers.firstResultOrNull(getAllByTestId, ...args)
}

const customRender = (node, ...options) => {
  const utils = render(node, ...options)

  return {
    ...utils,
    getByTestId: getByTestId.bind(utils),
    getAllByTestId: getAllByTestId.bind(utils),
    queryByTestId: queryByTestId.bind(utils),
    queryAllByTestId: queryAllByTestId.bind(utils),
  }
}

// re-export everything
export * from 'react-testing-library'

// override render method
export {
  customRender as render
}