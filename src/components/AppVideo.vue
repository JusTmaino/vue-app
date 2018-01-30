<template>
<div>
	<form id="search" role="search" style="width: 300px;">
        <div class="position-relative has-icon-right">
           <input type="text" class="form-control round" name="query" v-model="filterKey" placeholder="Search"/>
           <div class="form-control-position"><i class="ft-search"></i></div>
       </div>
  </form>
  <div class="row match-height">
			<div v-for="video in filteredData" class="col-lg-4 col-md-12 col-sm-12" >
				<div class="card">
					<div class="card-body">
						<div class="card-img">
							<a data-toggle="modal" :data-target="getID(setPlayID(video._id))">
								<img class="card-img-top img-fluid" :src="video.pictureUrl" alt="Card image cap">
								<h4 class="card-title">{{video.name}}</h4>
							</a>
							<a class="btn btn-floating halfway-fab bg-warning" data-toggle="modal" :data-target="getID(setdeleteID(video._id))"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
						</div>

						<div class="card-content" style="height :140px ;">
							<a href="#"></a>
							<p class="row mb-1">
								<small style="padding-left: 40px; padding-top: 5px;">{{video.published}}</small>
							</p>
							<div style="padding-left:30px;" v-on:click="setVideoRating(video)">
								<starRating 
								:star-size="20" 
								active-color="orange" 
								:show-rating="false" 
								:increment="0.5" 
								:rating="video.rating" 
								@rating-selected="setRating" 
								:read-only="video.ratingReadOnly">
								</starRating>
							</div>
							<p style="padding-left: 20px;">{{video.description}}.</p>
						</div>

						<div class="card-block" style="padding-left: 50px;">
							<a class="btn btn-outline-warning"  data-toggle="modal" :data-target="getID(video._id)" style="width: 200px; background-color: #ED646E;">EDIT</a>
						</div>
					</div>
				</div>

				<!-- ***************************************** Modal pour Modifier une  Video *********************************** --> 
				<div class="modal fade text-left" style="position : fixed;top : 0;right : 0;bottom : 0;left : 0;z-index : 1040;background-color : rgba(0,0,0,0.5);" :id="video._id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel34" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header bg-warning white">
								<h3 class="modal-title" id="myModalLabel34">Edit Video</h3>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<form>
								<div class="modal-body">
									<label>Name: </label>
									<div class="form-group position-relative has-icon-left">
										<input type="text" placeholder="Name" class="form-control" v-model="video.name">
										<div class="form-control-position">
											<i class="fa fa-video-camera font-medium-1 line-height-1 text-muted icon-align"></i>
										</div>
									</div>

									<label>URL: </label>
									<div class="form-group position-relative has-icon-left">
										<input type="url" placeholder="URL" class="form-control" v-model="video.url">
										<div class="form-control-position">
											<i class="fa fa-link font-medium-1 line-height-1 text-muted icon-align"></i>
										</div>
									</div>

									<label>Description: </label>
									<div class="form-group position-relative has-icon-left">
										<textarea placeholder="Type here ..." class="form-control" v-model="video.description"></textarea> 
										<div class="form-control-position">
											<i class="fa fa-file-text-o font-medium-1 line-height-1 text-muted icon-align"></i>
										</div>
									</div>
								</div>
								<div class="modal-footer">
									<input type="reset" class="btn btn-outline-secondary btn-lg" data-dismiss="modal" value="close">
									<input type="button" v-on:click="editVideo(video)" data-dismiss="modal" class="btn btn-outline-warning btn-lg" value="Edit">
								</div>
							</form>
						</div>
					</div>
				</div>
				
				<!-- ************************************ Modal pour Suppression d'une Video ************************************** --> 

				<div class="modal fade text-left" style="position : fixed;top : 0;right : 0;bottom : 0;left : 0;z-index : 1040;background-color : rgba(0,0,0,0.5);" :id="setdeleteID(video._id)" tabindex="-1" role="dialog" aria-labelledby="myModalLabel34" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">

							<div class="swal2-modal swal2-show" style="display: block; width: 500px; padding: 20px; background: rgb(255, 255, 255); min-height: 357px;" tabindex="-1">
								
								<div class="swal2-icon swal2-warning pulse-warning" style="display: block;">!</div>
								
								<h2>Are you sure ?</h2>
								{{video.name}}
								<div class="swal2-content" style="display: block;">You won't be able to revert this!</div>
								
								<hr class="swal2-spacer" style="display: block;">
								<button v-on:click="removeVideo(video)" data-dismiss="modal" class="swal2-confirm btn btn-success btn-raised mr-5" style="">Yes, delete it!</button>
								<button class="swal2-cancel btn btn-danger btn-raised" data-dismiss="modal" style="display: inline-block;">No, cancel!</button>
							</div>

						</div>
					</div>
				</div>

				<!-- ************************************ Modal pour jouer une Video ************************************** -->
				<div class="modal fade text-left" style="position : fixed;top : 0;right : 0;bottom : 0;left : 0;z-index : 1040;background-color : rgba(0,0,0,0.5);" :id="setPlayID(video._id)" tabindex="-1" role="dialog" aria-labelledby="myModalLabel34" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">

							<iframe 
							width="560" 
							height="315" 
							:src="video.url" 
							frameborder="0" 
							allow="autoplay; encrypted-media" 
							allowfullscreen>	
							</iframe>

						</div>
					</div>
				</div>
			</div>
  </div>
</div>
</template>

<script>
import base from "../Firebase";
import starRating from "vue-star-rating";

let videosRef = base.database().ref("videos");

export default {
  name: "AppVideo",
  components: {
    starRating
  },
  firebase: {
    videos: videosRef
  },
  data() {
    return {
	  videos: [],
	  newVideo: {
        _id: '',
        name: '',
        url: 'http://',
		description:'',
		published : '',
		pictureUrl : '',
		rating : 0,
		ratingReadOnly : false
	  },
	  rating : 0,
      filterKey: ""
    };
  },
  computed: {
    filteredData: function() {
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var data = this.videos;
      if (filterKey) {
        data = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            );
          });
        });
      }
      return data;
    }
  },
  methods: {
    removeVideo: function(video) {
	  console.log("--- DELETE DATA ---");
	  videosRef.child(video['.key']).remove()
    },
    editVideo: function(video) {
	  console.log("--- UPDATE DATA ---");
	  videosRef.child(video['.key']).set({_id:video._id, name : video.name, url:video.url, description:video.description , published:video.published , pictureUrl:video.pictureUrl, rating:video.rating , ratingReadOnly : video.ratingReadOnly})
	},
    getID: function(id) {
      return "#" + id;
    },
    setdeleteID: function(id) {
      return "del" + id;
    },
    setPlayID: function(id) {
      return "play" + id;
	},
	setRating: function(rating) {
	  console.log("rating : "+rating);
      this.rating = rating;
	},
	setVideoRating : function(video){
	  //console.log("set video rating  : "+this.rating);
	  if(video.ratingReadOnly === false){
	  	video.rating = this.rating;
	  	video.ratingReadOnly = true;
	  	this.editVideo(video);
	  }
	}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.rating-text {
      font-weight: bold;
      font-size: 1.9em;
      border: 1px solid #cfcfcf;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 5px;
      color: #999;
    }
</style>

