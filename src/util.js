// @flow

export const id = (a: any) => a

export const trace = (msg: string, v: any) => {
  // eslint-disable-next-line no-undef
  console.log(msg)
  return v
}
