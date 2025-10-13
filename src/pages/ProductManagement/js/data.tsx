// 分类类型
export interface typeInterface {
      typeId: string
      typeName: string
      createDate: string
      typeDescript: string
      isDel: number
}

// 物品类型
export interface productInterface {
      productId: string
      productName: string
      createDate: string
      productDescript: string
      parentId: string
      isDel: number
}