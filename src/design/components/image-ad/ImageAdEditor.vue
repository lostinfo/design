<template>
  <div>
    <div class="zent-design-component-image-ad-editor">
      <div class="zent-design-editor__control-group">
        <div class="zent-design-editor__control-group-container">
          <div class="zent-design-editor__control-group-label">显示大小:</div>
          <div class="zent-design-editor__control-group-control">
            <el-radio-group v-model="size" @change="sizeChange">
              <el-radio :label="1">大图</el-radio>
              <el-radio :label="2">小图</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <ul class="zent-design-component-image-ad-editor__entry-list">
        <li class="zent-design-component-image-ad-editor__entry" v-for="(item, index) in images" :key="item.id">
          <div>
            <div class="zent-design-component-image-ad-editor__image-entry">
              <div class="zent-design-component-image-ad-editor__image-entry-image-container"><img
                  :src="item.imageUrl" alt="" v-if="item.imageUrl">
                <div
                    class="zent-design-component-image-ad-editor__image-entry-image-upload zent-design-component-image-ad-editor__image-entry-image-upload--has-image">
                  <span>重新上传</span><input type="file" accept="image/gif, image/jpeg, image/png" title="" value=""
                                          @change="onImageChange($event, index)"></div>
              </div>
              <div class="zent-design-component-image-ad-editor__image-entry-controls">
                <div class="zent-design-component-image-ad-editor__image-entry-image-control"><label>标题:</label>
                  <div class="zent-input-wrapper"><input class="zent-input" type="text" value=""
                                                         v-model="item.linkTitle"></div>
                </div>
                <div class="zent-design-component-image-ad-editor__image-entry-image-control"><label>链接:</label>
                  <div class="zent-input-wrapper"><input class="zent-input" type="text" value="" v-model="item.linkUrl">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
               class="zent-design-component-image-ad-editor__entry-close-btn" @click="removeImage(index)">
            <g fill="none" fill-rule="evenodd">
              <circle cx="10" cy="10" r="10"></circle>
              <path fill="#FFF"
                    d="M13.75 7.188l-.937-.938L10 9.063 7.188 6.25l-.938.937L9.062 10 6.25 12.812l.937.938L10 10.938l2.812 2.812.938-.937L10.938 10"></path>
            </g>
          </svg>
          <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg"
               class="zent-design-component-image-ad-editor__entry-prepend-btn" @click="addImageInTop(index)">
            <g fill="none" fill-rule="evenodd">
              <circle cx="8.5" cy="8.5" r="8.5"></circle>
              <path d="M8 8H5v1h3v3h1V9h3V8H9V5H8v3z" fill="#FFF"></path>
            </g>
          </svg>
          <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg"
               class="zent-design-component-image-ad-editor__entry-append-btn" @click="addImageInBottom(index)">
            <g fill="none" fill-rule="evenodd">
              <circle cx="8.5" cy="8.5" r="8.5"></circle>
              <path d="M8 8H5v1h3v3h1V9h3V8H9V5H8v3z" fill="#FFF"></path>
            </g>
          </svg>
        </li>
      </ul>
      <a class="zent-design-component-image-ad-editor__add-entry-btn">
        <b>+</b>添加一个广告<input type="file" accept="image/gif, image/jpeg, image/png" title="" value=""
                             @change="appendImage($event)"></a>
      <div class="zent-design-component-image-ad-editor__hint">最多添加 10 个广告，拖动选中的图片广告可对其排序</div>
    </div>
  </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid';
import createObjectURL from "@/utils/createObjectURL";

export default {
  name: "ImageAdEditor",
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      images: Object.assign([], this.value.images),
      size: this.value.size || 1,
    }
  },
  watch: {
    images: {
      // eslint-disable-next-line no-unused-vars
      handler(newData, oldData) {
        this.$emit('change', 'images', newData)
      },
      deep: true,
    },
  },
  created() {

  },
  mounted() {

  },
  methods: {
    appendImage(e) {
      let files = e.target.files
      console.log(files)
      if (files && files.length > 0) {
        // todo upload
        for (let i in files) {
          this.images.push(this.createEmptyImageEntry({imageUrl: createObjectURL(files[i])}))
        }
      }
    },
    removeImage(index) {
      this.images.splice(index, 1)
    },
    addImageInTop(index) {
      console.log(this.createEmptyImageEntry())
      this.images.splice(index, 0, this.createEmptyImageEntry())
    },
    addImageInBottom(index) {
      this.images.splice(index + 1, 0, this.createEmptyImageEntry())
    },
    createEmptyImageEntry(override) {
      return {
        id: uuidv4(),
        imageUrl: '',
        linkTitle: '',
        linkUrl: '',
        ...override
      }
    },
    onImageChange(e, index) {
      let files = e.target.files
      if (files && files.length > 0) {
        this.images[index].imageUrl = createObjectURL(files[0])
      }
    },
    sizeChange(value) {
      this.$emit('change', 'size', value)
    },
  },
}
</script>

<style scoped>
ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>