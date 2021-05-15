<template>
	<div class="backdrop" @click.self="closeComponent">
		<div class="additembox">
			<h1>ADD ITEM</h1>
			<div class="iteminputbox">
				<form action="">
					<label for="title">WHAT TO DO</label>
					<input type="text" name="" id="" required v-model="title" />

					<label for="deadline">DEADLINE</label>
					<input type="text" name="" id="" v-model="deadline" />
					<div class="addbtn" @click="senddata">
						<img src="../assets/button.png" alt="" srcset="" />
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: [/* "header", "text",  */ 'theme'],
		/* setup() {
			const title = ref('');
			const deadline = ref('');
			let shouldclose = ref(false);

			const senddata = async () => {
				const datasend = {
					item: title.value,
					deadline: deadline.value,
					completed: false,
				};

				console.log(datasend);

				let gett = await fetch('http://localhost:3000/list', {
					method: 'POST',
					body: JSON.stringify(datasend),
					headers: { 'Content-Type': 'application/json' },
				});
				shouldclose = true;
				console.log('DOne');
			};

			return { senddata, title, deadline, shouldclose };
		}, */
		data() {
			return {
				title: '',
				deadline: '',
				datasend: {},
			};
		},
		methods: {
			closeComponent() {
				this.title = '';
				this.deadline = '';
				this.$emit('closecomp');
			},

			finalizeAddItem() {
				console.log('Closing');
				this.shouldclose = false;
				this.closeComponent();
			},

			senddata() {
				if (this.title) {
					this.datasend = {
						item: this.title,
						deadline: this.deadline,
						completed: false,
						deleted: false,
					};
					fetch('http://localhost:3000/list', {
						method: 'POST',
						body: JSON.stringify(this.datasend),
						headers: { 'Content-Type': 'application/json' },
					});
					this.finalizeAddItem();
					console.log('DOne');
					// this.$emit('reloaddata');
					setTimeout(() => this.$emit('reloaddata'), 420);
					console.log('Reloaded');
				} else {
					alert("Don't leave the field blank!!!");
				}
			},
		},
		/* updated() {
			if (this.shouldclose) {
				this.finalizeAddItem();
			}
		}, */
	};
</script>

<style scoped>
	.additembox {
		width: 420px;
		height: 350px;
		padding: 8px 0;
		margin: 220px auto;
		background: #6c5ce7;
		border-radius: 48px;
		overflow: hidden;
	}
	.iteminputbox {
		width: 420px;
		height: 350px;
		border-radius: 48px;
		background: #d8d8d8;
	}
	.backdrop {
		top: 0;
		position: fixed;
		background: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
	}
	h1 {
		color: #eee;
		border: none;
		padding: 0;

		font-family: Brandon Grotesque;
		font-style: normal;
		font-weight: 900;
		font-size: 32px;
		align-items: center;
		text-align: center;
	}
	p {
		font-style: normal;
	}

	.additembox.dark {
		background: rgb(48, 48, 48);
		color: #6c5ce7;
	}

	.addbtn {
		margin: 0;
		position: absolute;
		top: 75%;
		left: 50%;
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		width: 88px;
		height: 88px;
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
		opacity: 0.8;
	}
	/* .additembox.dark h1 {
  color: #6c5ce7;
}
.additembox.dark p {
  color: rgb(218, 218, 218);
} */

	form {
		max-width: 420px;
		margin: 0 auto;
		text-align: left;
		padding: 40px;
		padding-top: 8px;
		border-radius: 10px;
	}
	label {
		display: inline-block;
		margin: 25px 0 15px;
		text-transform: uppercase;
		letter-spacing: 1px;

		font-family: Brandon Grotesque;
		font-style: normal;
		font-weight: 330;
		font-size: 16px;
		line-height: 23px;
		align-items: center;

		color: #696969;
	}
	input {
		display: block;
		padding: 10px 18px;
		width: 100%;
		border: none;
		border-bottom: 1px solid #ddd;
		color: #555;

		background: #eeeeee;
		/* border: 1px solid #CBCBCB; */
		box-sizing: border-box;
		border-radius: 80px;
	}
</style>
