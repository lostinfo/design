<template>
  <div :class="[defaultProps.prefix + '-richtext', defaultProps.className]">
    <div :id="uuid">
    </div>
  </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid'

const UEDITOR_LOADED_KEY = '__ZENT_UEDITOR_LOADED_STATUS__'

// ueditor 默认值
const initConfig = {
  toolbars: [
    [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'forecolor',
      'backcolor',
      'justifyleft',
      'justifycenter',
      'justifyright',
      '|',
      'insertunorderedlist',
      'insertorderedlist',
      'blockquote',
    ],
    [
      'emotion',
      'insertvideo',
      'link',
      'removeformat',
      '|',
      'rowspacingtop',
      'rowspacingbottom',
      'lineheight',
      'paragraph',
      'fontsize',
    ],
    [
      'inserttable',
      'deletetable',
      'insertparagraphbeforetable',
      'insertrow',
      'deleterow',
      'insertcol',
      'deletecol',
      'mergecells',
      'mergeright',
      'mergedown',
      'splittocells',
      'splittorows',
      'splittocols',
    ],
  ],
  autoClearinitialContent: false,
  autoFloatEnabled: true, // 是否保持 toolbar 滚动时不动
  focus: false,
  wordCount: true,
  elementPathEnabled: false,
  pasteplain: false, // 是否默认为纯文本粘贴。false为不使用纯文本粘贴，true为使用纯文本粘贴
  initialFrameWidth: 640, // 初始化编辑器宽度
  initialFrameHeight: 200,
  maximumWords: 10000,
}

const defaultProps = {
  ueditorUrl:
      '//b.yzcdn.cn/v2/vendor/ueditor/release/ueditor.all.min.201707251345.js',
  ueditorConfigUrl:
      '//b.yzcdn.cn/v2/vendor/ueditor/release/ueditor.config.201707251345.js',
  ueditorHomeUrl: '//b.yzcdn.cn/v2/vendor/ueditor/dist/',
  ueditorIframeUrl: '//www.youzan.com/v2/static/vendor/ueditor/dist/',
  editorConfig: {}, // ueditor 默认值
  className: '',
  prefix: 'zent-design-component',
};

export default {
  name: "index",
  props: {
    content: {
      type: String,
      required: true,
    },
    editorConfig: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      editor: null,
      value: this.content || '',
      uuid: uuidv4(),
      defaultProps: defaultProps
    }
  },
  created() {

  },
  mounted() {
    let timer = null

    if (window.UE) {
      this.initRichText()
    } else {
      // 当一个页面中存在多个 RichText 组件时，需避免加载多份 ueditor.js
      timer = setInterval(() => {
        let status = window[UEDITOR_LOADED_KEY]
        if (status === 1) {
          // 加载中
        } else if (status === 2) {
          clearInterval(timer)
          this.initRichText()
        } else {
          this.loadUEditorScript()
        }
      }, 50)
    }
  },
  methods: {
    initRichText() {
      const UE = window.UE
      const target = document.getElementById(this.uuid)
      console.log(UE, target)
      if (!UE || !target) return false

      let conf = Object.assign({}, initConfig, this.editorConfig)

      let editor = new UE.ui.Editor(conf)
      this.editor = editor

      editor.addListener('blur contentChange', () => {
        this.onChange()
      })
      editor.render(target)
      editor.ready(() => {
        editor.setContent(this.value)
      })
    },
    loadUEditorScript() {
      if (window[UEDITOR_LOADED_KEY] !== undefined) return

      window[UEDITOR_LOADED_KEY] = 1 // 加载中
      let {
        ueditorHomeUrl,
        ueditorIframeUrl,
        ueditorUrl,
        ueditorConfigUrl,
      } = defaultProps

      window.UEDITOR_HOME_URL = ueditorHomeUrl
      window.UEDITOR_IFRAME_URL = ueditorIframeUrl

      this.createScript(ueditorConfigUrl, () => {
        this.createScript(ueditorUrl, () => {
          window[UEDITOR_LOADED_KEY] = 2; // 加载完成
        })
      })
    },
    createScript(url, callback) {
      const oScript = document.createElement('script')
      oScript.type = 'text/javascript'
      oScript.async = true
      oScript.src = url

      oScript.onload = function () {
        callback()
      };

      document.body.appendChild(oScript)
    },
    onChange() {
      let value = this.editor.getContent()
      this.$emit('change', value)
    }
  },
}
</script>

<style scoped>

</style>