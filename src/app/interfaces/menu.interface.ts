
export type MenuInterface = {
  icon?: string
  name: string
  link: string
  permission: number
  title?: string
  alt?: string
  menu?: MenuInterface[]
}