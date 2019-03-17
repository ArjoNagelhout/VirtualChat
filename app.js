video_path = "/Users/arjonagelhout/Documents/HKU G&I/Blok 3/Project Context/Website/videos"

var app = new Vue({
			el: '#app',
			data: {
				comment_list = [];
			},
			methods: {
				new_bot_comment: function() {
					this.comment_list.push({})
				}
			},
			computed: {
				
			}
		})