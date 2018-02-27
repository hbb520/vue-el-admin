import {getList, getCategorys} from './table-server';
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      imgRUrl: process.env.imgReadUrl,
      formInline: {
        user: null,
        region1: null,
        region2: null,
        region3: null
      },
      options1: null,
      options2: null,
      options3: null,
      multipleSelection: [],
      dialogVisible: false,
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        region: [
          {required: true, message: '请选择活动区域', trigger: 'change'}
        ],
        date1: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        date2: [
          {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
        ],
        type: [
          {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
        ],
        resource: [
          {required: true, message: '请选择活动资源', trigger: 'change'}
        ],
        desc: [
          {required: true, message: '请填写活动形式', trigger: 'blur'}
        ]
      }
    };
  },
  created() {
    this.getData(1);
    this.getCategorys();
  },
  methods: {
    // 数据获取
    getData(pageNumber) {
      this.listLoading = true;
      let categoryId = null;
      if (this.formInline.region3) {
        categoryId = this.formInline.region3;
      } else if (this.formInline.region2 && !this.formInline.region3) {
        categoryId = this.formInline.region2;
      } else {
        categoryId = this.formInline.region1;
      }
      ;
      let listQuery = {
        pageNumber: pageNumber,
        pageSize: this.listQuery.pageSize,
        categoryId: categoryId
      };
      getList(listQuery).then(response => {
        this.list = response.videoList;
        this.listQuery.total = response.total;
        for (let i = 0; i < response.videoList.length; i++) {
          response.videoList[i].createTime = this.$moment(response.videoList[i].createTime).format('YYYY-MM-DD HH:mm:ss');
        }
        this.listLoading = false;
      });
    },
    /*
     *分类操作
     */
    getCategorys(){
      getCategorys({}).then(response => {
        this.options1 = response.content;
      });
    },

    select1change(key){
      for (let i = 0; i < this.options1.length; i++) {
        if (this.options1[i].id == key) {
          this.options2 = this.options1[i].subCategory;
        }
      }
    },
    select2change(key){
      for (let i = 0; i < this.options1.length; i++) {
        for (let o = 0; o < this.options1[i].subCategory.length; o++) {
          if (this.options1[i].subCategory[o].id == key) {
            this.options3 = this.options1[i].subCategory[o].subCategory;
          }
        }
      }
    },
    /*
     *多选操作
     */
    handleSelectionChange(val){
      let multipleSelection = [];
      for (let i = 0; i < val.length; i++) {
        multipleSelection.push(val[i].id);
      }
      this.multipleSelection = multipleSelection;
      console.log(this.multipleSelection);
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /*
     *分页操作
     */
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getData(1);
    },
    handleCurrentChange(val) {
      this.getData(val);
    },
    /*
     *删除
     */
    deleteOne(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    /*
     *清空搜搜
     */
    clear(){
      this.formInline.region1 = null;
      this.formInline.region2 = null;
      this.formInline.region3 = null;
      this.options2 = null;
      this.options3 = null;

    }
  }
};
