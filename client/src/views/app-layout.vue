<template>
<v-app>
	<v-navigation-drawer
		v-model="drawer"
    clipped
    fixed
    app
    color="indigo accent-3"
		dark
    :width="$vuetify.breakpoint.xs ? 250 : 280"
	>
		<v-list
			nav
			dense
		>
			<v-list-item-group
				active-class="blue-grey--text text--lighten-5"
			>
				<v-list-item
					v-for="(option, index) in options" :key="index"
					:to="`/profile/${option.link}`"
				>
					<v-list-item-icon>
						<v-icon>{{ option.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>{{ option.text }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>
		<template v-slot:append>
			<div class="pa-2">
				<v-btn block @click="logout">
					<v-icon left>mdi-logout</v-icon>
					Logout
				</v-btn>
			</div>
		</template>
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
		<v-spacer></v-spacer>
		<v-btn :to="{ name: 'Resume', params: { username: 'AngelJGR' } }">
			Ver perfil
		</v-btn>
	</v-app-bar>
	<v-main class="grey lighten-3">
		<v-container fluid fill-height :class="{'pa-0': $vuetify.breakpoint.xs}">
			<v-layout :class="{'pa-0': $vuetify.breakpoint.xs}" justify-center>
					<router-view />
					<alert-message
						:snackbar="snackbar"
						:color="color"
						:message="message"
					/>
			</v-layout>
		</v-container>
	</v-main>
</v-app>
</template>
<script>
import LoginService from '../services/login'

export default {
	data: () => {
		return {
			options: [
				{ link: 'personal', text: 'Información personal', icon: 'mdi-account-tie' },
				{ link: 'formations', text: 'Formación', icon: 'mdi-book-open-page-variant' },
				{ link: 'experience', text: 'Experiencia', icon: 'mdi-briefcase-variant' },
				{ link: 'skills', text: 'Habilidades', icon: 'mdi-clipboard-text-multiple' },
			],
			drawer: true,
			snackbar: false,
			color: '',
			message: ''
		}
	},
	methods: {
		logout() {
			this.snackbar = false
			this.$store.dispatch('session/logout')
				.then((res) => {
					if (res.data.success) {
						this.$router.push({name: 'Login'})
					} else {
						this.snackbar = true
						this.color = 'error'
						this.message = 'Ocurrió un error al cerrar la sesión'
					}
				})
				.catch(() => {
					this.snackbar = true
					this.color = 'error'
					this.message = 'Ocurrió un error al cerrar la sesión'
				})
		}
	}
}
</script>