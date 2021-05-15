<template>
	<!-- <div id="nav">
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link>

	</div>
	<router-view /> -->
	<Todolist></Todolist>
</template>

<script>
	import Todolist from './views/ToDoListHome.vue';

	export default {
		components: {
			Todolist,
		},
	};
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	body {
		background: #ddd;
		margin: 0;
	}

	#nav {
		padding: 30px;
	}

	#nav a {
		font-weight: bold;
		color: #2c3e50;
	}

	#nav a.router-link-exact-active {
		color: #42b983;
	}
	/* 
	.tooltip {
		position: relative;
		display: inline-block;
		border-bottom: 1px dotted black;
	}
 */
	.tooltip .tooltiptext {
		visibility: hidden;
		width: 120px;
		background-color: rgb(18, 18, 18);
		color: #eee;
		text-align: center;
		border-radius: 6px;
		padding: 5px 0;

		/* Position the tooltip */
		position: absolute;
		z-index: 1;
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
	}
</style>
