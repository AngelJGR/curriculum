<template>
<v-main class="grey lighten-3">
	<v-container fluid fill-height :class="{'pa-0': $vuetify.breakpoint.xs}">
		<v-layout :class="{'pa-0': $vuetify.breakpoint.xs}" justify-center>
				<router-view />
		</v-layout>
	</v-container>
</v-main>
	
</template>
