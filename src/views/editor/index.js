import {VueEditor} from 'vue2-editor';
import axios from 'axios';

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      content: '',
      customToolbar:[
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['image'],
        ['link']
      ]
    };
  },
  created() {
    console.log('created')

  },
  methods: {
    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append('image', file);

      axios({
        url: 'http://static.weiruict.com/uploadWebFile',
        method: 'POST',
        data: formData
      })
        .then((result) => {
          let url = process.env.imgReadUrl + result.data.thumbnail; // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url);
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  mounted() {
   console.log('mounted')
  }
};
