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
        <draggable v-model="list">
          <transition-group>
            <Item :item="item" :selected="index == selectedIndex" v-for="(item, index) in list" :key="item.id"
                  @selectedItem="() => selectedItem(index)"
                  @removeItem="() => removeItem(index)"
                  @addComponent="(type, addType) => addComponent(index, type, addType)"
            ></Item>
          </transition-group>
        </draggable>
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
import Item from "@/design/Item"
import {componentGroups, getDefaultPropsByType} from "@/design/componentGroups"
import {v4 as uuidv4} from 'uuid'
import draggable from 'vuedraggable'

export default {
  name: 'Design',
  props: {},
  data() {
    return {
      componentGroups: componentGroups,
      list: [],
      selectedIndex: 0,
    }
  },
  components: {
    Item,
    draggable,
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