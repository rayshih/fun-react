import {caseOf} from './type-system'

export const createUpdate = (updateMap) => {
  const fnMap = {...updateMap}

  if (fnMap._otherwise) {
    fnMap._otherwise = (_, model) => model
  }

  return caseOf(fnMap)
}
