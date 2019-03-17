// Positivity is a variable that ranges from -10 to 10.
// 10 meaning it is a healthy stream with good comments
// -10 meaning that there are a lot of bad comments

function random_int(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var app = new Vue({
			el: '#app',
			data: {
				video_path: "/Users/arjonagelhout/Documents/HKU G&I/Blok 3/Project Context/Website/videos/",
				pictures_path: "/Users/arjonagelhout/Documents/HKU G&I/Blok 3/Project Context/Website/VirtualChat/pictures/",
				commenters: [
					{
						id: 0,
						name: "Reserved for player",
						color: "#050",
						pictures: ["6.png"],
						character: true
					},
					{
						id: 1,
						name: "Slecht persoon",
						color: "#000",
						pictures: ["1.png", "2.png"],
						character: true
					},
					{
						id: 2,
						name: "Random person",
						color: "#f33",
						pictures: ["5.png", "7.png"],
						character: false
					},
					{
						id: 3,
						name: "Ander random person",
						color: "#b934db",
						pictures: ["6.png", "2.png"],
						character: false
					},
				],
				positivity: 0,
				information: {
					title: "90K CELEBRATION - Getting drunk then dance",
					streamer: "Vreemd persoon"
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
				background_comments: [
					{
						min_positivity: 3,
						max_positivity: 8,
						text: "OMG XD"
					},
					{
						min_positivity: -10,
						max_positivity: 10,
						text: "Kun je een shoutout doen?"
					},
					{
						min_positivity: 8,
						max_positivity: 10,
						text: "If you love her, leave a like!"
					}
				],
				timeline: [
					{
						id: 1
					},
					{
						id: 2
					},
					{
						id: 3
					}
				],
				counter: 0
			},
			methods: {
				create_player_choice: function(choice) {

					this.current_choice = choice;

					this.choose = true;
				},
				player_choose: function(choice_id) {
					var choice = this.current_choice.find(obj => {return obj.id === choice_id});

					this.add_comment(0, choice.text);

					this.positivity += choice.result;
					this.choose = false;
				},
				add_background_comment: function() {
					var background_commenters = this.commenters.filter(obj => {return obj.character === false})
					
					var commenter_id = random_int(0, background_commenters.length-1);
					var commenter = background_commenters[commenter_id].id;
					var comment_id = random_int(0, this.background_comments.length-1);
					var comment = this.background_comments[comment_id].text;

					this.add_comment(commenter, comment);
				},
				start_interval: function() {
					setInterval(() => {this.add_background_comment()}, 1000);
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