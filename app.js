// Positivity is a variable that ranges from -10 to 10.
// 10 meaning it is a healthy stream with good comments
// -10 meaning that there are a lot of bad comments

function random_int(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var app = new Vue({
			el: '#app',
			data: {
				videos_path: "/Users/arjonagelhout/Documents/HKU G&I/Blok 3/Project Context/Website/videos/",
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
					{
						id: 4,
						name: "I'm a weirdo",
						color: "#42f4b3",
						pictures: ["3.png"],
						character: false
					},
					{
						id: 5,
						name: "And so am I",
						color: "#bca914",
						pictures: ["6.png", "2.png", "5.png"],
						character: false
					},
				],
				positivity: 8,
				information: {
					title: "90K CELEBRATION - Getting drunk then dance",
					streamer: "Vreemd persoon"
				},
				current_video: "movie_2.mp4",
				choose: true,
				current_choice: [
					{
						id: 1,
						text: "Start het verhaal",
						destination_timeline: 1
					}
				],
				comments: [],
				background_comments: [
					{
						id: 1,
						min_positivity: 3,
						max_positivity: 8,
						text: "OMG XD"
					},
					{
						id: 2,
						min_positivity: -10,
						max_positivity: 10,
						text: "Kun je een shoutout doen?"
					},
					{
						id: 3,
						min_positivity: 8,
						max_positivity: 10,
						text: "If you love her, leave a like!"
					},
					{
						id: 4,
						min_positivity: -10,
						max_positivity: -5,
						text: "Fuck you!"
					}
				],
				previous_background_comment_id: 0,
				timeline: [
					{
						id: 1,
						events: [
							{
								type: "set_positivity",
								duration: 0,
								value: 10
							},
							{
								type: "change_video",
								duration: 2000,
								video: "movie_1.mp4"
							},
							{
								type: "post_comment",
								duration: 4000,
								comment: {
									commenter_id: 1, 
									text: "test"
								}
							},
							{
								type: "present_choice",
								choice: [
									{
										id: 1,
										text: "Saai, kutstream",
										destination_timeline: 1
									},
									{
										id: 2,
										text: "Superleuk! Ga zo door!",
										destination_timeline: 2
									}
								]
							}

						]
					}
				],
				current_timeline_id: 1,
				counter: 0
			},
			
			methods: {
				execute_event: function(event_id) {
					var current_timeline = this.timeline.find(obj => {return obj.id === this.current_timeline_id});
					var event = current_timeline.events[event_id];

					// Execute different types of events
					switch (event.type) {
						case "change_video":
						this.current_video = event.video;
						video_element.load();
						break;

						case "post_comment":
						var comment = event.comment;
						this.add_comment(comment.commenter_id, comment.text);
						break;

						case "present_choice":
						this.current_choice = event.choice;
						this.choose = true;
						break;

						case "set_positivity":
						this.positivity = event.value;
						break;
					}


					// Check if all events have been executed
					if (event_id < current_timeline.events.length-1) {
						var new_event_id = event_id + 1;
						var event_duration = event.duration;
						setTimeout(()=>{this.execute_event(new_event_id)}, event_duration);
					}
				},
				player_choose: function(choice_id) {
					var choice = this.current_choice.find(obj => {return obj.id === choice_id});

					this.add_comment(0, choice.text);
					this.choose = false;

					this.current_timeline_id = choice.destination_timeline;
					this.execute_event(0);
				},
				add_background_comment: function() {
					// Only use commenters that are not characters
					var background_commenters = this.commenters.filter(obj => {return obj.character === false});
					
					// Take a random commenter of this selection
					var background_commenter_id = random_int(0, background_commenters.length-1);
					var commenter_id = background_commenters[background_commenter_id].id;

					// Only use comments that fit the current positivity level
					var background_comments = this.background_comments.filter(obj => {return this.positivity > obj.min_positivity && this.positivity < obj.max_positivity});
					
					// Take a random comment of this selection
					var comment_id = this.previous_background_comment_id;
					
					function generate_comment_id() {
						var background_comment_id = random_int(0, background_comments.length-1);
						comment_id = background_comments[background_comment_id].id;
					}
					if (background_comments.length > 1) {
						while (comment_id == this.previous_background_comment_id) {
							generate_comment_id();
						}
					} else {
						generate_comment_id();
					}
					
					this.previous_background_comment_id = comment_id;
					
					var comment = this.background_comments.find(obj => {return obj.id === comment_id});
					var comment_text = comment.text;

					this.add_comment(commenter_id, comment_text);
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
				
			}
		})