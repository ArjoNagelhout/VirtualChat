var timeline_app = new Vue({
	el: '#timeline_app',
	data: {
		timeline: [],
        commenters: [],
		json_path: "../data.json",
        info: "default"
	},
	created: function() { 
		// Load data from json file
		fetch(this.json_path)
			.then(r => r.json())
			.then(json => {
				this.timeline = json.timeline;
                this.commenters = json.commenters
			});
	},
	methods: {
	}
})