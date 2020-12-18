<template>
<v-app>
	<v-navigation-drawer
		v-model="drawer"
		absolute
		left
		temporary
	>
		<v-list
			nav
			dense
		>
			<v-list-item-group
				v-model="group"
				active-class="deep-purple--text text--accent-4"
			>
				<v-list-item to="/formacion">
					<v-list-item-title>Formación</v-list-item-title>
				</v-list-item>

				<v-list-item to="/experiencia">
					<v-list-item-title>Experiencia</v-list-item-title>
				</v-list-item>

				<v-list-item to="/habilidades">
					<v-list-item-title>Habilidades</v-list-item-title>
				</v-list-item>

				<v-list-item>
					<v-list-item-title>Buzz</v-list-item-title>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</v-navigation-drawer>
	<v-app-bar
      color="indigo darken-2"
      dark
      style="border-bottom:1px solid rgba(0,0,0,.12) !important;"
      app
      fixed
      clipped-left
      text
    >
		<v-app-bar-nav-icon @click.stop="drawer = !drawer" text></v-app-bar-nav-icon>
	</v-app-bar>
	<v-main class="grey lighten-3">
		<v-container fluid fill-height :class="{'pa-0': $vuetify.breakpoint.xs}">
			<v-layout :class="{'pa-0': $vuetify.breakpoint.xs}" justify-center>
					<router-view />
			</v-layout>
		</v-container>
	</v-main>
</v-app>
</template>
<script>
export default {
	data: () => {
		return {
			drawer: false,
			group: null
		}
	},
	watch: {
		group () {
			this.drawer = false
		}
	}
}
</script>