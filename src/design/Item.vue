<template>
  <div class="zent-design-preview-item">
    <div
        class="zent-design-preview-controller"
        :class="{'zent-design-preview-controller--selected': selected, 'zent-design-preview-controller--highlight': selected}"
        @click="selectedItem"
    >
      <div class="zent-design-preview-controller__drag-handle">
        <Component :is="item.type + 'Preview'" v-bind="value"></Component>
      </div>
      <div class="zent-popover-wrapper zent-pop-wrapper zent-design-preview-controller__action-btn-delete"
           style="display: inline-block;">
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
             class="zent-design-preview-controller__icon-delete" @click="removeItem">
          <g fill="none" fill-rule="evenodd">
            <circle cx="10" cy="10" r="10"></circle>
            <path fill="#FFF"
                  d="M13.75 7.188l-.937-.938L10 9.063 7.188 6.25l-.938.937L9.062 10 6.25 12.812l.937.938L10 10.938l2.812 2.812.938-.937L10.938 10"></path>
          </g>
        </svg>
      </div>
      <div class="zent-design-preview-controller__action-btn-add-container zent-design-preview-controller__prepend">
        <a class="zent-design-preview-controller__action-btn-add">
          <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg"
               class="zent-design-preview-controller__icon-add" @click="addComponentInTop">
            <g fill="none" fill-rule="evenodd">
              <circle cx="8.5" cy="8.5" r="8.5"></circle>
              <path d="M8 8H5v1h3v3h1V9h3V8H9V5H8v3z" fill="#FFF"></path>
            </g>
          </svg>
        </a>
        <div class="zent-design-preview-controller__add-marker"><i
            class="zent-design-preview-controller__add-marker-circle zent-design-preview-controller__add-marker-circle--left"></i>
          <div class="zent-design-preview-controller__add-marker-line"></div>
          <i class="zent-design-preview-controller__add-marker-circle zent-design-preview-controller__add-marker-circle--right"></i>
        </div>
      </div>
      <div class="zent-design-preview-controller__action-btn-add-container zent-design-preview-controller__append">
        <a class="zent-design-preview-controller__action-btn-add">
          <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg"
               class="zent-design-preview-controller__icon-add" @click="addComponentInBottom">
            <g fill="none" fill-rule="evenodd">
              <circle cx="8.5" cy="8.5" r="8.5"></circle>
              <path d="M8 8H5v1h3v3h1V9h3V8H9V5H8v3z" fill="#FFF"></path>
            </g>
          </svg>
        </a>
        <div class="zent-design-preview-controller__add-marker"><i
            class="zent-design-preview-controller__add-marker-circle zent-design-preview-controller__add-marker-circle--left"></i>
          <div class="zent-design-preview-controller__add-marker-line"></div>
          <i class="zent-design-preview-controller__add-marker-circle zent-design-preview-controller__add-marker-circle--right"></i>
        </div>
      </div>
    </div>
    <div class="zent-design-editor-item" v-show="selected && !showAddComponent">
      <Component :is="item.type + 'Editor'" :value="value" @change="changeValue"></Component>
    </div>
    <div class="zent-design-editor-item zent-design-add-component-overlay zent-design-add-component-overlay--grouped"
         :class="'zent-design-add-component-overlay--' + addComponentType" v-show="showAddComponent">
      <div class="zent-design-editor-add-component zent-design-editor-add-component--grouped">
        <div class="zent-design-editor-add-component__grouped">
          <p class="zent-design-editor-add-component__grouped-title" style="text-align: right;">
            <el-button size="mini" plain @click="hideAddComponent">关闭</el-button>
          </p>
        </div>
        <div class="zent-design-editor-add-component__grouped" v-for="(group, group_index) in componentGroups"
             :key="group_index">
          <p class="zent-design-editor-add-component__grouped-title">{{ group.name }}</p>
          <div class="zent-design-editor-add-component__grouped-list">
            <el-button size="mini" plain v-for="(item, type) in group.components" :key="type"
                       @click="addComponent(type)">{{ item.name }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ImageAdPreview from "@/design/components/image-ad/ImageAdPreview";
import ImageAdEditor from "@/design/components/image-ad/ImageAdEditor";

import WhiteSpacePreview from "@/design/components/whitespace/WhiteSpacePreview";
import WhiteSpaceEditor from "@/design/components/whitespace/WhiteSpaceEditor";

import {componentGroups} from "@/design/componentGroups";

export default {
  name: "Item",
  props: {
    item: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      componentGroups: componentGroups,
      value: this.item.props,
      showAddComponent: false,
      addComponentType: 'top',
    }
  },
  components: {
    ImageAdPreview,
    ImageAdEditor,
    WhiteSpacePreview,
    WhiteSpaceEditor,
  },
  created() {

  },
  mounted() {

  },
  methods: {
    selectedItem() {
      this.$emit('selectedItem')
    },
    changeValue(key, value) {
      this.value[key] = value
      // todo emit list
    },
    removeItem() {
      this.$emit('removeItem')
    },
    addComponentInTop() {
      this.addComponentType = 'top'
      this.showAddComponent = true
    },
    addComponentInBottom() {
      this.addComponentType = 'bottom'
      this.showAddComponent = true
    },
    hideAddComponent() {
      this.showAddComponent = false
    },
    addComponent(type) {
      this.$emit('addComponent', type, this.addComponentType)
      this.showAddComponent = false
    },
  },
}
</script>