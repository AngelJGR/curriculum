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
				<v-list-item to="/profile/formations">
					<v-list-item-title>Formación</v-list-item-title>
				</v-list-item>

				<v-list-item to="/profile/experience">
					<v-list-item-title>Experiencia</v-list-item-title>
				</v-list-item>

				<v-list-item to="/profile/skills">
					<v-list-item-title>Habilidades</v-list-item-title>
				</v-list-item>

				<v-list-item to="/profile/personal">
					<v-list-item-title>Información personal</v-list-item-title>
				</v-list-item>

				<!-- <v-list-item>
					<v-list-item-title>Logout</v-list-item-title>
				</v-list-item> -->
			</v-list-item-group>
		</v-list>
		<template v-slot:append>
			<div class="pa-2">
				<v-btn block @click="logout">
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
			drawer: true,
			snackbar: false,
			color: '',
			message: ''
		}
	},
	methods: {
		logout() {
			this.snackbar = false
			LoginService.logout()
				.then((res) => {
					if (res.data.success) {
						localStorage.removeItem('token')
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