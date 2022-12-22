export type TLocationResponse = {
  data: TLocation
}

export type TLocation = {
  addressLine: string,
  country: string,
  city: string,
  postalCode: string
}