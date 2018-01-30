# vue-app

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev
```
## Features

```
- CRUD videos gallery Application with vue.js 2 and Firebase

- Two main components 
   --> "AppVideo" which handle the videos display, edit and delete actions from the gallery.
   --> "AddVideo" which handle the add videos to the gallery.
   
   
- A Video is composed of :
    - id : it is the youtube video id as default
    - url : the video's url on youtube
    - name : the title of the youtube's video
    - description : the description of the video
    - pictureUrl : the thumbnails url of the youtube video
    - published : the date of the video release on youtube
    - rating : the actual rate , it is from 1 to 5 stars
    - ratingReadOnly : boolean to allow only one time vote on a video
    
   
- Add a video is based on a youtube URL , copy /paste it on the url field in the "Add FORM" and
  by using youtube API , the title and the description will be set directly on the appropriate fields

- Rating feature included, only one time rating is allowed on each video

```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
