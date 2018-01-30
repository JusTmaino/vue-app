<template>
<div class="modal fade text-left" style="position : fixed;top : 0;right : 0;bottom : 0;left : 0;z-index : 1040;background-color : rgba(0,0,0,0.5);" id="addVideoForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel34" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary white">
				<h3 class="modal-title" id="myModalLabel34">New Video</h3>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<form v-on:submit.prevent="addVideo">
				<div class="modal-body">
					<label>URL: </label>
					<div class="form-group position-relative has-icon-left">
						<input type="url" placeholder="URL" class="form-control" @change="fillFields()" v-model="newVideo.url">
						<div class="form-control-position">
							<i class="fa fa-link font-medium-1 line-height-1 text-muted icon-align"></i>
						</div>
					</div>

          <label>Name: </label>
					<div class="form-group position-relative has-icon-left">
						<input type="text" placeholder="Name" class="form-control" v-model="newVideo.name">
						<div class="form-control-position">
							<i class="fa fa-video-camera font-medium-1 line-height-1 text-muted icon-align"></i>
						</div>
					</div>

					<label>Description: </label>
					<div class="form-group position-relative has-icon-left">
						<textarea placeholder="Type here ..." class="form-control" v-model="newVideo.description"></textarea> 
						<div class="form-control-position">
							<i class="fa fa-file-text-o font-medium-1 line-height-1 text-muted icon-align"></i>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<input type="reset" class="btn btn-outline-secondary btn-lg" data-dismiss="modal" value="close">
					<input type="submit" class="btn btn-outline-primary btn-lg" value="Add">
				</div>
			</form>
		</div>
	</div>
</div>
</template>

<script>
import base from "../Firebase";

let videosRef = base.database().ref("videos");

export default {
  name: "AddVideo",
  data(){
    return{
	    newVideo: {
        _id: '',
        name: '',
        url: 'http://',
        description:'',
        published : '',
        pictureUrl : '',
		    rating : 0,
		    ratingReadOnly : false
      }
    };
  },
  methods: {
    addVideo: function() {
      console.log("--- ADD DATA ---");
      this.newVideo._id = this.newVideo.url.substring(32,43);
      this.newVideo.url = 'https://www.youtube.com/embed/'+this.newVideo.url.substring(32,43);
      this.newVideo.description = this.newVideo.description.substring(0,110);
      videosRef.push(this.newVideo);
        this.newVideo._id = '';
        this.newVideo.name = '';
        this.newVideo.url = 'http://';
        this.newVideo.description = '';
        this.newVideo.published = '';
        this.newVideo.pictureUrl = '';
        this.newVideo.rating = 0;
        this.newVideo.ratingReadOnly = false;
    },
	  fillFields: function(){
		  fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + this.newVideo.url.substring(32,43) + "&key=" + "AIzaSyAfKdpiqmCJarHU1_3YAUbyXG110h6wKEw")
      .then(resp => resp.json())
      .then((resp) => {
        console.log(resp);
        const Video = {
          id: resp.items[0].id,
          name: resp.items[0].snippet.title,
          description: resp.items[0].snippet.description,
		      starCount: null,
          published: resp.items[0].snippet.publishedAt,
          pictureUrl : resp.items[0].snippet.thumbnails.high.url
	      };
        this.newVideo.name = Video.name;
        this.newVideo.description = Video.description;
        this.newVideo.published = Video.published;
        this.newVideo.pictureUrl = Video.pictureUrl;
	    });
	  }
  }
};
</script>