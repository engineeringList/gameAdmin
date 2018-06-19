<template>
    <div>
        <Breadcrumb class="brands">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem to="/#/article">文章管理</BreadcrumbItem>
        </Breadcrumb>
        <Form ref="formValidate" :model="formValidate" :label-width="120" class="fromStyle">
            <FormItem label="标题：" prop="title">
                <Input v-model="formValidate.title" placeholder="请填写标题" class="optionStyle"></Input>
            </FormItem>
            <FormItem label="作者：" prop="author">
                <Input v-model="formValidate.author" placeholder="请填写作者" class="optionStyle"></Input>
            </FormItem>
            <FormItem label="文章类型：" prop="type">
                <Select v-model="formValidate.type" placeholder="请选择文章类型" clearable class="optionStyle">
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="文章内容：">
                <quill-editor
                    style="height: 400px"
                    v-model="content"
                    ref="myQuillEditor"
                    class="editor"
                    :options="myQuillEditor"
                    @focus="onEditorFocus">
                </quill-editor>
            </FormItem>
            

            <!-- image upload dialog -->
            <el-upload 
                class="upload-demo" 
                action="http://up-z0.qiniu.com" 
                :before-upload='beforeUpload' 
                :data="uploadData" 
                :on-success='upScuccess'
                ref="upload" 
                style="display:none"
            >
                <el-button 
                    size="small" 
                    type="primary" 
                    id="imgInput" 
                    v-loading.fullscreen.lock="fullscreenLoading" 
                    element-loading-text="插入中,请稍候"
                >
                    点击上传
                </el-button>
            </el-upload>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
            </FormItem>
    </Form>
    </div>

    <!-- use vue quill editor -->
    
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
      	formValidate: {
			title: '',
			author: '',
			type: '',
		},
		typeList :[
			{
				value: 1,
				label: '新闻'
			},
			{
				value: 2,
				label: '公告'
			},
			{
				value: 3,
				label: '活动'
			},
		],
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
       		placeholder: '在这里插入文字'
      	}, // quill editor config setting
      	content: '', // quill-editor data model
      	dialogUploadImage: false, // show upload dialog or not
      	uploadURL: '', // upload url eg: http://xxx-test.xxxxxx.com/api/jboard/announcements/upload
      	headers: {
    		Authorization: ''
      	}, // request header
          fileList: [], // filelist
          _id : 0
    }
  },
  components: {
    'quill-editor': quillEditor
  },
   // 页面加载后执行 为编辑器的图片图标和视频图标绑定点击事件
  mounted() {
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler);
    var _url =  window.location.href;

    if (_url.indexOf('id=') != -1) {
        this._id = parseInt(_url.split("id=")[1]);
        console.log(this._id);
    }

    axios.get('http://wwlin.cn/news/' +this._id + '?test=hw').then((d)=>{
        console.log(d)
        this.content = d.data.content;
        this.formValidate.title = d.data.title;
        this.formValidate.author = d.data.author;
        this.formValidate.type = d.data.type;
    })

  },
  	methods: {
	  	handleSubmit (name) {
			const data = this.formValidate;
            data.content = this.content
            
            if(this._id){
                axios.put('http://wwlin.cn/api/news/' + this._id,data).then((d)=>{
                    console.log(d);
                    if(d.data.code == 1) {
                        this.$Message.info({
                            content: '修改成功',
                            duration: 5
                        });
                        setTimeout(() => {
                            window.location.href="/#/articlelist"
                        }, 3000);
                    }else {
                        this.$Message.error({
                            content: d.data.msg,
                            duration: 5
                        });
                    }
                })
            }else {
                axios.post('http://wwlin.cn/api/news', data ).then((d)=>{
                    if (d.data.code == 1 ){
                        this.$Message.info({
                            content: '添加成功',
                            duration: 5
                        });
                        setTimeout(() => {
                            window.location.href="/#/articlelist"
                        }, 3000);
                    }else {
                        this.$Message.error({
                            content: d.data.msg,
                            duration: 5
                        });
                    }
                });
            }

			
            // this.submitFlag = true;
            // this.$refs[name].validate((valid) => {
            //     if (!valid) {
            //         this.submitFlag = false;
            //         return ;
            //     }
            //     if (isNaN(this.formValidate.bizId)){
            //         this.submitFlag = false;
            //         return this.$Message.error('商户ID不正确');
            //     }
            //     if (/\d/.test(this.formValidate.region)){
            //         this.submitFlag = false;
            //         return this.$Message.error('内容不应含有数字');
            //     }
                
               
            // })
        },
        /**
         *
         * listen editor on focus
         * to confirm the position of cursor
         * reference: https://quilljs.com/docs/api/#selection
         *
         */
        onEditorFocus (val) {
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
                return axios.get(`http://wwlin.cn/api/tool/qiniu?imgName=${imgName}`).then(res => {
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

<style scoped>
    .crumbs{
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        border-radius: 5px;
    }

    .fromStyle {
        padding: 20px;
    }

    .optionStyle {
        width: 240px;
    }

    .brands {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        /* padding-left: 20px; */
        margin-bottom: 20px;
    }
    
</style>