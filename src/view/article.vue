<template>
  <div class="hello">
    <h1>{{msg}}</h1>

    <!-- use vue quill editor -->
    <quill-editor
      style="height: 400px"
      v-model="content"
      ref="myQuillEditor"
      class="editor"
      :options="myQuillEditor"
      @focus="onEditorFocus">
    </quill-editor>

    <!-- image upload dialog -->
    <el-upload class="upload-demo" action="http://up-z0.qiniu.com" :before-upload='beforeUpload' :data="uploadData" :on-success='upScuccess'
      ref="upload" style="display:none">
      <el-button size="small" type="primary" id="imgInput" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="插入中,请稍候">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import axios from 'axios'
export default {
  name: 'beginning',
  data () {
    return {
      msg: 'Vue-quill-editor Demo', // message
      uploadData: {},
        fullscreenLoading: false,
      myQuillEditor: {
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['image']
            ],
            handlers: {
              'image': this.showUploadDialog
            }
          }
        },
        placeholder: 'insert your text here'
      }, // quill editor config setting
      content: '', // quill-editor data model
      dialogUploadImage: false, // show upload dialog or not
      uploadURL: '', // upload url eg: http://xxx-test.xxxxxx.com/api/jboard/announcements/upload
      headers: {
        Authorization: ''
      }, // request header
      fileList: [] // filelist
    }
  },
  components: {
    'quill-editor': quillEditor
  },
   // 页面加载后执行 为编辑器的图片图标和视频图标绑定点击事件
  mounted() {
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
  },
  methods: {
    /**
     *
     * listen editor on focus
     * to confirm the position of cursor
     * reference: https://quilljs.com/docs/api/#selection
     *
     */
    onEditorFocus (val) {
      console.log(val)
      let range = val.getSelection()
      if (range) {
        if (range.length === 0) {
          console.log('User cursor is at index', range.index)
          this.length = range.index
        } else {
          var text = val.getText(range.index, range.length)
          console.log('User has highlighted: ', text)
          this.length = range.index
        }
      } else {
        this.length = val.getText().length
      }
      console.log(this.length)
    },

    qnLocation() {
        if (location.protocol === 'http:') {
        return 'http://up-z0.qiniu.com'
        }
        return 'https://up-z0.qbox.me'
    },

    qnUpload(file) {
        console.log(2222)
        this.fullscreenLoading = true
        const suffix = file.name.split('.')
        const ext = suffix.splice(suffix.length - 1, 1)[0]
        console.log(this.uploadType)
        const imgName = `${suffix.join('.')}_${new Date().getTime()}.${ext}`;
        if (this.uploadType === 'image') {  // 如果是点击插入图片
            return axios.get(`http://127.0.0.1:3000/api/tool/qiniu?imgName=${imgName}`).then(res => {
                console.log(res)
                this.uploadData = {
                    key: `${imgName}`,
                    token: res.data.data.token
                }
            })
        } else if (this.uploadType === 'video') {  // 如果是点击插入视频
            return this.api.getVideoQNToken().then(res => {
                this.uploadData = {
                    key: `video/${suffix.join('.')}_${new Date().getTime()}.${ext}`,
                    token: res
                }
            })
        }
    },

    imgHandler(state) {
        console.log(1111)
        this.addRange = this.$refs.myQuillEditor.quill.getSelection()
        if (state) {
            let fileInput = document.getElementById('imgInput')
            fileInput.click() // 加一个触发事件
        }
        this.uploadType = 'image'
    },

    upScuccess(e, file, fileList) {
        console.log(33333)
        this.fullscreenLoading = false
        let vm = this
        let url = ''
        if (this.uploadType === 'image') {    // 获得文件上传后的URL地址
            url = 'http://7xs09w.com1.z0.glb.clouddn.com/' + e.key
        } else if (this.uploadType === 'video') {
            url = STATVIDEO + e.key
        }
        if (url != null && url.length > 0) {  // 将文件上传后的URL地址插入到编辑器文本中
        let value = url
        vm.addRange = vm.$refs.myQuillEditor.quill.getSelection()
        value = value.indexOf('http') !== -1 ? value : 'http:' + value
        vm.$refs.myQuillEditor.quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER)   // 调用编辑器的 insertEmbed 方法，插入URL
        } else {
            // (<any>this).$message.error(`${vm.uploadType}插入失败`)
        }
        this.$refs['upload'].clearFiles()    // 插入成功后清除input的内容
    },

    /**
     *
     * show upload dialog
     *
     */
    showUploadDialog () {
      this.dialogUploadImage = true
    },
    /**
     *
     * handle event before upload
     *
     */
    beforeUpload (file) {
      return this.qnUpload(file)
    },
    /**
     *
     * handle event for uploading success
     *
     */
    handleUploadSuccess (res, file, fileList) {
      let quill = this.$refs.myQuillEditor.quill
      // if success
      if (res.code === 200 && res.url !== null) {
        // insert image into editor
        quill.insertEmbed(this.length, 'image', res.url)
        // adjust the cursor into last position
        quill.setSelection(this.length + 1)
        // clear the filelist
        this.$refs.upload.clearFiles()
      } else {
        this.$message.error(res.message)
      }
    },
    /**
     *
     * handle event for uploading fail
     *
     */
    handleUploadError (err) {
      this.$message.error(err)
    },
    /**
     *
     * handle event for confirming upload
     *
     */
    confirmUpload () {
      // element-ui upload methods
      this.$refs.upload.submit()
      this.DialogUploadImage = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>