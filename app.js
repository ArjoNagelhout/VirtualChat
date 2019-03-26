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
		pictures_path: "/Users/arjonagelhout/Documents/HKU G&I/Blok 3/Project Context/Website/VirtualStreamingSite/pictures/",
		commenters: [],
		positivity: 0,
		background_comment_frequency: {min: 1000, max: 1000},
		background_comments_bool: false,
		information: {},
		current_video: null,
		choose: true,
		current_choice: [],
		comments: [],
		background_comments: [],
		previous_background_comment_id: 0,
		timeline: [],
		current_timeline_id: 0,
		counter: 0,
		turnt_camera: false,
		viewcount: {value: 0, real: 0, fluctuation: 0, update_delay: 10000},

		debug:false
	},
	created: function() { 
		// Load data from json file
		fetch("data.json")
			.then(r => r.json())
			.then(json => {
				this.background_comments = json.background_comments;
				this.commenters = json.commenters;
				this.timeline = json.timeline;
				this.current_choice = json.start_choice;
				this.current_video = json.start_video;
				this.information = json.information;

				video_element.load();
			});


		window.addEventListener("resize", function(e) {
			this.video_stream_element.height = this.video_stream_element.offsetWidth * (1080/1920);
		});



		this.add_background_comment();
		this.update_viewcount();
		//this.create_camera();

	},
	methods: {
		create_camera: function() {
			if (navigator.mediaDevices.getUserMedia) {
				
				navigator.mediaDevices.getUserMedia({ video: true })
					.then(function (stream) {
						this.video_stream_element.srcObject = stream;
						this.video_stream_element.height = this.video_stream_element.offsetWidth * (1080/1920);
					})
			}
		},
		update_viewcount: function() {
			var f = this.viewcount.fluctuation/2;
			var c = this.viewcount.value+random_int(-f, f);
			if (c < 0) {
				c = 0;
			}
			this.viewcount.real = c;

			setTimeout(()=>{this.update_viewcount()}, this.viewcount.update_delay);
		},
		execute_event: function(event_id) {
			var current_timeline = this.timeline.find(obj => {return obj.id === this.current_timeline_id});
			var event = current_timeline.events[event_id];

			// Execute different types of events
			switch (event.type) {

				case "wait":
				break;

				case "go_to_timeline":
				this.current_timeline_id = event.destination_timeline;
				this.execute_event(0);
				break;

				case "set_video":
				this.current_video = event.video;
				this.change_video_loop(event.loop);
				video_element.load();
				break;

				case "set_background_comment_frequency":
				this.background_comment_frequency.min = event.min;
				this.background_comment_frequency.max = event.max;
				break;

				case "set_background_comments":
				this.background_comments_bool = event.value;
				break;

				case "post_comment":
				var comment = event.comment;
				this.add_comment(comment.commenter_id, comment.text);
				break;

				case "present_choice":
				// Don't ever do this. This is a quick fix
				if (chat.scrollTop >= (chat.scrollHeight - chat.offsetHeight)) {
					this.$nextTick(() => {
						this.$nextTick(() => {
							chat.scrollTop = chat.scrollHeight;
						});
					});
				}
				this.current_choice = event.choice;
				this.choose = true;
				break;

				case "set_positivity":
				this.positivity = event.value;
				break;

				case "set_viewcount":
				this.viewcount.value = event.value;
				this.viewcount.fluctuation = event.fluctuation;
				break;

				case "turn_camera":
				this.turnt_camera = true;
				break;
			}


			// Check if all events have been executed
			if (event_id < current_timeline.events.length-1) {
				var new_event_id = event_id + 1;
				var event_duration = event.duration;
				setTimeout(()=>{this.execute_event(new_event_id)}, event_duration);
			}
		},
		change_video_loop: function(bool) {
			if (bool == "true") {
				video_element.setAttribute("loop", "true");
			} else {
				video_element.removeAttribute("loop");
			}
		},
		player_choose: function(choice_id) {
			var choice = this.current_choice.find(obj => {return obj.id === choice_id});

			this.add_comment(0, choice.text);
			this.choose = false;

			this.current_timeline_id = choice.destination_timeline;

			this.$nextTick(() => {
					chat.scrollTop = chat.scrollHeight;
				});

			this.execute_event(0);
		},
		add_background_comment: function() {

			var comment_delay = random_int(this.background_comment_frequency.min, this.background_comment_frequency.max);
			setTimeout(()=>{this.add_background_comment()}, comment_delay);
			if (this.background_comments_bool == false) {
				return;
			}

			// Only use commenters that are not story characters
			var background_commenters = this.commenters.filter(obj => {return obj.character === false});
			
			// Take a random commenter of this selection
			var background_commenter_id = random_int(0, background_commenters.length-1);
			var commenter_id = background_commenters[background_commenter_id].id;

			// Only use comments that fit the current positivity level
			var background_comments = this.background_comments.filter(obj => {return this.positivity >= obj.min_positivity && this.positivity <= obj.max_positivity});

			// Take a random comment of this selection
			var comment_id = this.previous_background_comment_id;
			
			function generate_comment_id() {
				var background_comment_id = random_int(0, background_comments.length-1);
				comment_id = background_comments[background_comment_id].id;
			}
			if (background_comments.length > 1) {
				// Generate comment different than the one that was just posted
				while (comment_id == this.previous_background_comment_id) {
					generate_comment_id();
				}
			} else {
				// Only one comment fits the criteria
				generate_comment_id();
			}
			
			this.previous_background_comment_id = comment_id;
			
			var comment = this.background_comments.find(obj => {return obj.id === comment_id});
			var comment_text = comment.text;

			// Don't post random comments when the player has to choose
			if (this.choose == false) {
				this.add_comment(commenter_id, comment_text);
			}
			
			
		},
		add_comment: function(commenter_id, text) {

			var commenter = this.commenters.find(obj => {return obj.id === commenter_id});

			this.comments.push({
				name: commenter.name, 
				color: commenter.color, 
				pictures: commenter.pictures,
				text: text
			});

			if (chat.scrollTop >= (chat.scrollHeight - chat.offsetHeight)) {
				this.$nextTick(() => {
						chat.scrollTop = chat.scrollHeight;
					});
			}
		}
		
	}
})
