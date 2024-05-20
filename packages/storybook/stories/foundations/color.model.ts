export interface ColorItem {
  color: string
  className?: string
  textClassName?: string
}

export interface Colors {
  title: string
  items: ColorItem[]
}

export interface ColorPlateProps {
  colors: Colors[]
  isSemantic?: boolean
}
