var app = new Vue({
			el: '#app',
			data: {
				video_path: "/Users/arjonagelhout/Documents/HKU G&I/Blok 3/Project Context/Website/videos/",
				pictures_path: "/Users/arjonagelhout/Documents/HKU G&I/Blok 3/Project Context/Website/VirtualChat/pictures/",
				commenters: [
					{
						id: 1,
						name: "Naam",
						color: "#000",
						pictures: ["1.png", "2.png"]
					}
				],
				information: {

				},
				current_video: "movie_2.mp4",
				comments: []
			},
			methods: {
				add_comment: function(commenter_id, text) {

					var commenter = this.commenters.find(obj => {return obj.id === commenter_id});

					this.comments.push({
							name: commenter.name, 
							color: commenter.color, 
							pictures: commenter.pictures,
							text: text
						})
				}
			},
			computed: {
				
			}
		})