const componentGroups = [
  {
    name: '基础',
    components: {
      WhiteSpace: {
        name: '辅助空白',
        defaultProps: {
          backgroundColor: '#ffffff',
          height: 40
        }
      },
      ImageAd: {
        name: '图片广告',
        defaultProps: {
          images: []
        }
      }
    }
  }
]

const getDefaultPropsByType = function (type) {
  for (let item of componentGroups) {
    console.log(type, type in item.components)
    if (type in item.components) {
      return Object.assign({}, item.components[type].defaultProps)
    }
  }
  throw new Error(type + " not exists!")
}

export {componentGroups, getDefaultPropsByType}