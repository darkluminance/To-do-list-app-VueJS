<template>
	<h1>To do list</h1>

	<div class="list">
		<div
			class="listitem"
			:class="{ listitemdelete: item.deleted }"
			v-for="item in data"
			:key="item.id"
		>
			<div class="check" @click="updateitemstatus(item)">
				<div v-if="!item.completed">
					<img src="../assets/incomplete.png" alt="" srcset="" />
				</div>

				<div v-else>
					<img src="../assets/complete.png" alt="" srcset="" />
				</div>
			</div>

			<div class="itemtitle" @click="updateitemstatus(item)">
				<div class="itemtitletext" :class="{ itemcompleted: item.completed }">
					{{ item.item }}
				</div>
				<div class="itemdeadlinetext">
					{{ item.deadline }}
				</div>
			</div>

			<!-- Delete any list item -->
			<div class="deleteitem" @click="deleteitem(item.id)">
				<img src="../assets/delete.png" alt="" srcset="" />
			</div>
		</div>
	</div>

	<!-- Add item button -->
	<div v-show="showAddList">
		<Additem @closecomp="showAddList = false" @reloaddata="getdataagain">
		</Additem>
	</div>
	<div v-show="!showAddList" class="addbtn tooltip" @click="showAddList = true">
		<img src="../assets/button.png" alt="" srcset="" />
		<span class="tooltiptext">Add todo item</span>
	</div>
</template>

<script>
	import Additem from '../views/AddItem.vue';

	export default {
		name: 'Todolist',
		components: { Additem },
		data() {
			return {
				data: [],
				error: null,
				showAddList: false,
			};
		},
		methods: {
			getdataagain() {
				let fetched = fetch('http://localhost:3000/list')
					.then((res) => res.json())
					.then((data) => (this.data = data))
					.catch((err) => (this.error = err.message));

				console.log(fetched);
				if (fetched.ok) console.log('Not found bitch');
			},

			deleteitem(idd) {
				this.data.forEach((ele) => {
					console.log(ele.id);
					if (ele.id === idd) {
						ele.deleted = true;
						/* setTimeout(() => {
							this.data.splice(idd, 1);
						}, 80); */
					}
				});

				let filtered = this.data.filter((value) => {
					return !value.deleted;
				});
				console.log(filtered);
				setTimeout(() => {
					// this.data.splice(idd, 1);
					this.data = filtered;
				}, 420);
				/* for (let index = 0; index < this.data.length; index++) {
					if (index === idd - 1) {
						this.data[idd].deleted = true;
						setTimeout(() => {
							this.data.splice(idd, 1);
						}, 80);
					}
				} */
				fetch('http://localhost:3000/list/' + idd, {
					method: 'DELETE',
				});
			},

			updateitemstatus(theitem) {
				theitem.completed = !theitem.completed;
				console.log(theitem);
				fetch('http://localhost:3000/list/' + theitem.id, {
					method: 'PUT',
					body: JSON.stringify(theitem),
					headers: { 'Content-Type': 'application/json' },
				});
			},
		},

		mounted() {
			this.getdataagain();
		},

		/* 	updated() {
			if (!this.showAddList) this.getdataagain();
		}, */
	};
	// http://localhost:3000/list
</script>

<style scoped>
	h1 {
		font-family: HelveticaNeue;
		font-style: normal;
		font-weight: bold;
		font-size: 50px;
		align-items: center;
		text-align: center;
		margin-top: 69px;
		margin-bottom: 169px;
		color: #383838;
	}
	.list {
		margin: 0px auto;
		width: 580px;
	}
	.listitem {
		text-align: left;
		/* width: 500px; */

		display: flex;
		height: 56px;
		margin: 28px 0;
		background: #d8d8d8;
		box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
		border-radius: 18px;

		padding: 0 18px;

		font-family: HelveticaNeue;
		font-style: normal;
		font-weight: 300;
		font-size: 18px;
		line-height: 28px;
		display: flex;
		align-items: center;

		color: #484848;
	}
	.listitem {
		opacity: 0;
		animation: fadeIn 0.3s linear forwards;
	}
	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}

	.listitem:hover {
		transform: scale(1.008);
	}

	.listitem img {
		width: 24px;
	}

	.listitemdelete {
		animation: removed-item-animation 0.42s
			cubic-bezier(0.55, -0.04, 0.91, 0.94) forwards;
		/* transform origin is moved to the bottom left corner
		transform-origin: 0% 100%; */
	}

	@keyframes removed-item-animation {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
			transform: translateY(69px);
		}
	}

	.check {
		margin: 18px;
		padding: 0;
		width: 24px;
		height: 24px;
		padding-right: 28px;
	}
	.check div,
	.deleteitem {
		margin: 0;
		padding: 0;
		width: 24px;
		height: 24px;
	}
	.deleteitem:hover {
		opacity: 0.38;
	}

	.itemtitle {
		width: 420px;
		display: flex;
	}
	.itemcompleted {
		text-decoration: line-through;
		opacity: 0.69;
	}
	.itemdeadlinetext {
		font-size: 13px;
	}
	.itemtitle img {
		width: 100%;
	}
	.itemtitletext {
		-webkit-user-select: none; /* Safari */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE10+/Edge */
		user-select: none; /* Standard */
		width: 350px;
		margin-right: 18px;
	}

	.addbtn {
		position: fixed;
		left: 50%;
		top: 20%;
		transform: translate(-50%, 0);
		width: 108px;
		height: 108px;
		filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.38));
	}
	.addbtn img {
		width: 88px;
		height: 88px;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
	.addbtn:hover {
		opacity: 0.69;
	}
</style>
