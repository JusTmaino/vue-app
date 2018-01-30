
Vue.component('app-video', {
	template: '#video-template',
	props: {
		data: Array,
		filterKey: String,
		currentPageVue : Number
	},
	data: function () {
		var sortOrders = {}
		return {
			sortKey: '',
			sortOrders: sortOrders,
			previousSelected : ''
		}
	},
	computed: {
		filteredData: function () {
			var sortKey = this.sortKey
			var filterKey = this.filterKey && this.filterKey.toLowerCase()
			var order = this.sortOrders[sortKey] || 1
			var data = this.data
			if (filterKey) {
				data = data.filter(function (row) {
					return Object.keys(row).some(function (key) {
						return String(row[key]).toLowerCase().indexOf(filterKey) > -1
					})
				})
			}
			if (sortKey) {
				data = data.slice().sort(function (a, b) {
					a = a[sortKey]
					b = b[sortKey]
					return (a === b ? 0 : a > b ? 1 : -1) * order
				})
			}
			return data
		}
	},
	filters: {
		capitalize: function (str) {
			return str.charAt(0).toUpperCase() + str.slice(1)
		}
	},
	methods: {
		sortBy: function (key) {
			this.sortKey = key
			this.sortOrders[key] = this.sortOrders[key] * -1
		},
		refreshTable: function() {
			console.log("--- REFRESH DATA ---");
			console.log("template current page : "+this.currentPageVue);
			let url = "/api/restaurants?page="+this.currentPageVue;
			fetch(url)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data.data);
				this.data = data.data;
			}).catch(err => {
				console.log("erreur dans le get : " + err)
			});
		},
		supprimerRestaurantVue: function(id) {
			console.log("--- DELETE DATA ---");
			console.log("on supprime le restaurant id=" + id);
			let urldelete = "/api/restaurants/" + id;

			fetch(urldelete, {
				method: "DELETE",
			})
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
				
			}).catch(err => {
				console.log("erreur dans le get : " + err)
			});

			this.refreshTable();
		},
		modifierRestaurant: function(restaurant) {
			console.log("--- UPDATE DATA ---");

			let name = document.querySelector("#name");
			let cuisine = document.querySelector("#cuisine");
			if(name.value !== '' && cuisine.value !== ''){
				const formData = new FormData();
				formData.append('_id', restaurant._id);
				formData.append('nom', name.value);
				formData.append('cuisine', cuisine.value);

				let url = "/api/restaurants/" + restaurant._id;

				fetch(url, {
					method: "PUT",
					body: formData
				})
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					console.log("Sucessfully Updated");

				}).catch(err => {
					console.log("erreur dans le get : " + err)
				});

				this.refreshTable();
			}
			else{
				alert("choose a restaurant");
			}
		},
		ajouterRestaurant: function() {
			console.log("--- ADD DATA ---");

			let name = document.querySelector("#newName");
			let cuisine = document.querySelector("#newCuisine");

			const formData = new FormData();
			formData.append('nom', name.value);
			formData.append('cuisine', cuisine.value);

			let url = "/api/restaurants";

			fetch(url, {
				method: "POST",
				body: formData
			})
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
				console.log("Sucessfully Added");
				
			}).catch(err => {
				console.log("erreur dans le get : " + err)
			});

			this.refreshTable();
		},
		getID: function(id) {
			return "#"+id;
		},
		setdeleteID: function(id) {
			return "del"+id;
		},
		setPlayID: function(id) {
			return "play"+id;
		},
		deleteVideo: function(id) {
			console.log(id+" deleted");
		}
	}
})




var demo = new Vue({
	el: '#demo',
	data: {
		searchQuery: '',
		gridData: [],
		currentPageVue : 1,
		nbrData : 0
	},
	mounted() { 
		console.log("--- MOUNTED ---");
		this.getDataFromServer();
		this.getRestaurentsCount();
	},
	methods: {
		getDataFromServer: function() {
			console.log("--- GETTING DATA ---");
			fetch('/api/restaurants')
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data.data);
				this.gridData = data.data;
				let previousVueBtn = document.querySelector("#previousVueBtn");
				if(this.currentPageVue==1){
					previousVueBtn.setAttribute("disabled", "true");
				}
				else{
					previousVueBtn.removeAttribute("disabled");
				}
			}).catch(err => {
				console.log("erreur dans le get : " + err)
			});
		},
		getRestaurentsCount: function() {
			console.log("--- COUNTTING DATA ---");
			let url = "/api/restaurants/count";

			fetch(url)
			.then(function(responseJSON) {
				responseJSON.json()
				.then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                this.nbrData = res.data;
                console.log(this.nbrData);
            });
			})
			.catch(function (err) {
				console.log(err);
			});
		},
		previousPageVue: function() {
			console.log("--- PREVIOUS DATA ---");
			this.currentPageVue--;
			console.log(this.currentPageVue);
			let url = "/api/restaurants?page="+this.currentPageVue;
			fetch(url)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data.data);
				this.gridData = data.data;

				let previousVueBtn = document.querySelector("#previousVueBtn");
				let nextVueBtn = document.querySelector("#nextVueBtn");
				if(this.currentPageVue==1){
					previousVueBtn.setAttribute("disabled", "true");
				}
				else{
					previousVueBtn.removeAttribute("disabled");
				}

				if(this.currentPageVue < this.nbrData / 10 ){
					nextVueBtn.removeAttribute("disabled");
				}
			}).catch(err => {
				console.log("erreur dans le get : " + err)
			});
		},
		nextPageVue: function() {
			console.log("--- NEXT DATA ---");
			this.currentPageVue++;
			console.log(this.currentPageVue);
			let url = "/api/restaurants?page="+this.currentPageVue;
			console.log("URL : "+url);
			fetch(url)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data.data);
				this.gridData = data.data;

				console.log(this.nbrData % 10);
				let previousVueBtn = document.querySelector("#previousVueBtn");
				let nextVueBtn = document.querySelector("#nextVueBtn");
				if(this.currentPageVue==1){
					previousVueBtn.setAttribute("disabled", "true");
				}
				else{
					previousVueBtn.removeAttribute("disabled");
				}

				if(this.nbrData % 10 == 0){
					if( (this.currentPageVue >= (this.nbrData / 10) -1) ){
						nextVueBtn.setAttribute("disabled", "true");
					}
					else{
						nextVueBtn.removeAttribute("disabled");
					}
				}
				else{
					if( (this.currentPageVue >= this.nbrData / 10) ){
						nextVueBtn.setAttribute("disabled", "true");
					}
					else{
						nextVueBtn.removeAttribute("disabled");
					}
				}
			}).catch(err => {
				console.log("erreur dans le get : " + err)
			});
		},
		gofinalPageVue: function() {
			console.log("--- FINAL DATA ---");
			if(this.nbrData%10==0){
				this.currentPageVue=this.nbrData/10-1;
			}
			else{
				this.currentPageVue=this.nbrData/10;
			}

			let url = "/api/restaurants?page="+this.currentPageVue;
			console.log(this.currentPageVue);
			fetch(url)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data.data);
				this.gridData = data.data;

				let previousVueBtn = document.querySelector("#previousVueBtn");
				let nextVueBtn = document.querySelector("#nextVueBtn");
				nextVueBtn.setAttribute("disabled", "true");
				previousVueBtn.removeAttribute("disabled");
			}).catch(err => {
				console.log("erreur dans le get : " + err)
			});
		}

	}
})

