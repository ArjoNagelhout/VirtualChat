var app = new Vue({
			el: '#app',
			data: {
				video_path: "/Users/arjonagelhout/Documents/HKU G&I/Blok 3/Project Context/Website/videos",
				pictures_path: "/Users/arjonagelhout/Documents/HKU G&I/Blok 3/Project Context/Website/pictures",
				comments: [
					{
						name: "Een persoon", 
						color: "#0f0", 
						pictures: ["pictures/1.png", "pictures/3.png", "pictures/6.png"],
						text: "Dit is een test"
					}
				]
			},
			methods: {
				add_comment: function() {
					this.comments.push({
							name: "Itz_marcos_Py", 
							color: "#00f", 
							picture: "picture_1.png",
							text: "They just started playing him on the radio up here in Michigan"
						})
				}
			},
			computed: {
				
			}
		})