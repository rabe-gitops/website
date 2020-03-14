<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      The easy-to-use Git-centric flow to apply the GitOps pattern to Kubernetes
      microservices development, integration, and deployment.
    </p>
    <h3><a href="https://github.com/rabe-gitops">Discover it on GitHub</a></h3>
    <div class="github-buttons">
      <gh-btns-star class="github-button" slug="rabe-gitops/pattern" show-count></gh-btns-star>
      <gh-btns-watch class="github-button" slug="rabe-gitops/pattern" show-count></gh-btns-watch>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.github-buttons {
  text-align: center;
}
.github-button {
  float: none !important;
}
h3 {
  margin: 40px 0 20px 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
