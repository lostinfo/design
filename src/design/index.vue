<template>
  <div class="zent-design">
    <div class="zent-design-preview">
      <div class="zent-design__item-list">
        <div class="zent-design-preview-item">
          <div class="zent-design-preview-controller">
            <div
                class="zent-design-preview-controller__drag-handle zent-design-preview-controller__drag-handle--inactive">
              <div class="zent-design-component-config-preview">
                <div class="zent-design-component-config-preview__title">微页面标题</div>
              </div>
            </div>
          </div>
        </div>
        <Item :item="item" :selected="index == selectedIndex" v-for="(item, index) in list" :key="item.id"
              @selectedItem="() => selectedItem(index)"
              @removeItem="() => removeItem(index)"
              @addComponent="(type, addType) => addComponent(index, type, addType)"
        ></Item>
      </div>
      <div class="zent-design__add zent-design__add--grouped">
        <div class="zent-design-editor-add-component zent-design-editor-add-component--grouped">
          <div class="zent-design-editor-add-component__grouped" v-for="(group, group_index) in componentGroups"
               :key="group_index">
            <p class="zent-design-editor-add-component__grouped-title">{{ group.name }}</p>
            <div class="zent-design-editor-add-component__grouped-list">
              <el-button size="mini" plain v-for="(item, type) in group.components" :key="type"
                         @click="appendComponent(type)">{{ item.name }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "@/design/Item";
import {componentGroups, getDefaultPropsByType} from "@/design/componentGroups";
import {v4 as uuidv4} from 'uuid';

export default {
  name: 'Design',
  props: {},
  data() {
    return {
      componentGroups: componentGroups,
      list: [
        {
          id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: 'WhiteSpace',
          props: {
            backgroundColor: '#ffffff',
            height: 40
          },
        },
        {
          id: '3r6h3f9c-458d-26af-78da-2ady5ui9ab6d',
          type: 'ImageAd',
          props: {
            images: [
              "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3390283223,239469593&fm=26&gp=0.jpg",
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598873910696&di=b39bb204d58e5c9d4cc3eb753a569abb&imgtype=0&src=http%3A%2F%2Fres.allmacwallpaper.com%2Fget%2FMacBook-Air-13-inch-wallpapers%2FCape-Point-1440x900%2F17745-4.jpg"
            ]
          },
        },
      ],
      selectedIndex: 0,
    }
  },
  components: {
    Item
  },
  methods: {
    selectedItem(index) {
      this.selectedIndex = index
    },
    removeItem(index) {
      console.log(index)
      this.list.splice(index, 1)
      this.selectedIndex--
    },
    addComponent(index, type, addType) {
      let props = getDefaultPropsByType(type)
      this.list.splice(addType == 'top' ? index : index + 1, 0, {id: uuidv4(), type: type, props: props,})
      this.$nextTick(() => {
        this.selectedIndex = addType == 'top' ? index : index + 1
      })
    },
    appendComponent(type) {
      let props = getDefaultPropsByType(type)
      this.list.push({
        id: uuidv4(),
        type: type,
        props: props,
      })
      this.selectedIndex = this.list.length - 1
    },
  }
}
</script>