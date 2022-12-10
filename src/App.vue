<script setup>

/* Imports */
	import { onMounted } from 'vue' 
	import NavBar from '@/components/Layout/NavBar.vue'
	import { useStoreAuth } from '@/stores/StoreAuth.js'	

/** Store */
	const storeAuth = useStoreAuth()
	onMounted(() => storeAuth.init())

</script>


<template>

	<NavBar />

	<div class="container is-max-desktop px-2 py-4">
		<RouterView/>
	</div>

</template>



<style>

	@import 'bulma\css\bulma.min.css';

</style>
