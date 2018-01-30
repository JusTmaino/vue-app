<template>
  <div id="app">
    <AppVideo/>
    <AddVideo/>
  </div>
</template>
<script>
import AppVideo from './components/AppVideo'
import AddVideo from './components/AddVideo'


export default {
  name: 'App',
  components: {
    AppVideo,
    AddVideo
  }
}
</script>

