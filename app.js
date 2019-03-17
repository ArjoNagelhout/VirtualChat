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
				positivity: 0,
				information: {

				},
				current_video: "movie_2.mp4",
				choose: true,
				current_choice: [
					{
						id: 1,
						text: "Saai, kutstream",
						result: -2
					},
					{
						id: 2,
						text: "Superleuk! Ga zo door!",
						result: 1
					}
				],
				comments: [],
				counter: 0
			},
			methods: {
				create_player_choice: function() {

				},
				player_choose: function(choice_id) {
					var choice = this.current_choice.find(obj => {return obj.id === choice_id});

					this.add_comment(1, choice.text);

					this.positivity += choice.result;
					this.choose = false;
				},
				add_comment: function(commenter_id, text) {

					var commenter = this.commenters.find(obj => {return obj.id === commenter_id});

					this.comments.push({
						name: commenter.name, 
						color: commenter.color, 
						pictures: commenter.pictures,
						text: text
					});

					this.$nextTick(() => {
  						chat.scrollTop = chat.scrollHeight;
  					})
				}
			},
			computed: {
				
			}
		})