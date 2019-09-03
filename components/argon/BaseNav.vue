<template>
  <nav
    class="navbar"
    :class="[
      { 'navbar-expand-lg': expand },
      { [`navbar-${effect}`]: effect },
      { 'navbar-transparent': transparent },
      { [`bg-${type}`]: type },
      { rounded: round }
    ]"
  >
    <div class="container">
      <slot name="container-pre"></slot>
      <slot name="brand">
        <a class="navbar-brand" href="#" @click.prevent="onTitleClick">
          {{ title }}
        </a>
      </slot>
      <NavbarToggleButton
        :toggled="toggled"
        :target="contentId"
        @click.native.stop="toggled = !toggled"
      >
      </NavbarToggleButton>

      <slot name="container-after"></slot>

      <div
        :id="contentId"
        v-click-outside="closeMenu"
        class="collapse navbar-collapse"
        :class="{ show: toggled }"
      >
        <div class="navbar-collapse-header">
          <base-alert v-if="geladen" type="success">
            Seite {{ $nuxt.$route.path }} erfolgreich geladen.
          </base-alert>
          <slot name="content-header" :close-menu="closeMenu"></slot>
        </div>
        <slot :close-menu="closeMenu"></slot>
      </div>
    </div>
  </nav>
</template>
<script>
import { FadeTransition } from 'vue2-transitions'
import NavbarToggleButton from './NavbarToggleButton'

export default {
  name: 'BaseNav',
  components: {
    FadeTransition,
    NavbarToggleButton
  },
  props: {
    type: {
      type: String,
      default: 'primary',
      description: 'Navbar type (e.g default, primary etc)'
    },
    title: {
      type: String,
      default: '',
      description: 'Title of navbar'
    },
    contentId: {
      type: [String, Number],
      default: Math.random().toString(),
      description:
        "Explicit id for the menu. By default it's a generated random number"
    },
    effect: {
      type: String,
      default: 'dark',
      description: 'Effect of the navbar (light|dark)'
    },
    round: {
      type: Boolean,
      default: false,
      description: 'Whether nav has rounded corners'
    },
    transparent: {
      type: Boolean,
      default: false,
      description: 'Whether navbar is transparent'
    },
    expand: {
      type: Boolean,
      default: false,
      description: 'Whether navbar should contain `navbar-expand-lg` class'
    }
  },
  data() {
    return {
      toggled: false,
      geladen: false
    }
  },
  watch: {
    $route() {
      this.geladen = true
    }
  },
  methods: {
    onTitleClick(evt) {
      this.$emit('title-click', evt)
    },
    closeMenu() {
      this.toggled = false
      this.geladen = false
    }
  }
}
</script>
<style></style>
