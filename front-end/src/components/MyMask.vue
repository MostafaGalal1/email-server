<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div :style="bgColor" class="modal-container">
        <component :is="currentComponent"/>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "MyMask",
  props: ['component'],

  data() {
    return {
      currentComponent: null,
    }
  },

  computed: {
    bgColor: {
      get: function () {
        return {
          'background-color': this.$store.getters.getDark ?
              this.$vuetify.theme.themes.dark.background : this.$vuetify.theme.themes.light.background
        }
      },

      set: function () {
        //
      }
    }
  },

  created() {
    this.currentComponent = this.component;
  },

}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0 auto;
  padding: 20px 30px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

</style>
