export interface QueryParam {
  id?: string
  status?: string
  callNo?: number
  date?: string
  useStatus?: string
}

export interface TableItem {
  key: string
  id: string
  no: string
  description: string
  callNo: number
  status: string
  updatedAt: string
  editable: boolean
}

export interface ServiceDetail {
  key: string
  id: string
  no: string
  description: string
  callNo: number
  status: string
  updatedAt: string
  editable: boolean
}
