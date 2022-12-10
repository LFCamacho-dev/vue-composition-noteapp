<script setup>

/* Imports */
	import { onMounted } from 'vue' 
	import NavBar from '@/components/Layout/NavBar.vue'
	import { useStoreNotes } from '@/stores/StoreNotes.js'	

/** Store */
	const storeNotes = useStoreNotes()
	onMounted(() => storeNotes.getNotes())

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
