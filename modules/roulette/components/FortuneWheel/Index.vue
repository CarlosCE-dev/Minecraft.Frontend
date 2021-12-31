<template>
	<v-card width="550px" class="pa-4 d-flex align-center justify-center flex-column">
		<h1>Roulette</h1>
		<FortuneWheel style="width: 500px"
			:duration="15000"
			:angleBase="60"
			:canvas="canvasOptions"
			:prizes="items"
			:verify="canvasVerify"
			:useWeight="true"
			:disabled="disableWheel"
			@rotateStart="onCanvasRotateStart"
			@rotateEnd="onRotateEnd"/>
		<v-fade-transition>
			<v-overlay v-if="overlay" absolute color="black" opacity="0.3">
				<div class="d-flex flex-column align-center justify-conter">
					<h1>Verificando billetera</h1>
					<v-progress-circular indeterminate 
						color="primary" 
						width="10"
						size="100">
					</v-progress-circular>
				</div>
			</v-overlay>
        </v-fade-transition>
	</v-card>
</template>

<script>
import FortuneWheel from 'vue-fortune-wheel'
import 'vue-fortune-wheel/lib/vue-fortune-wheel.css'

import { getHexColorOfRarity } from '@/modules/shared/helpers/rarityTypeHelper';

export default {
    components: {
        FortuneWheel,
    },
    data() {
		return {
			overlay: false,
			canvasVerify: true, // Whether the turntable in canvas mode is enabled for verification
			canvasOptions: {
				borderWidth: 6,
				borderColor: '#584b43',
				imageSize: 30,
				btnText: "Spin"
			},
			items: [],
			disableWheel: false
		}
	},
	async created () {
		this.overlay = true;
		const data = await this.getRouletteData();
		this.items = data.rewards.map((i) => {
			const prize = {
				id: i.id,
				contentType: 'image',
				imageUri: i.image,
				value: i.title,
				bgColor: getHexColorOfRarity(i.rarity),
				weight: i.chance
			};
			return prize
		}).sort(() => Math.random() - 0.5);

		await new Promise(resolve => setTimeout(resolve, 2000));
		this.overlay = false;
	},
	methods: {
		async getRouletteData(){
			const payload = { groupId: this.$route.params.id }
            try {
                const { data } = await this.$axios.$post(`${process.env.baseUrl}/roulette/items`, payload);
                return data;
            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: "", top: true };
                this.$store.commit('ui/snackbar', snackbar);
            }
		},
		onImageRotateStart() {
			console.log('onRotateStart')
		},
		async onCanvasRotateStart(rotate) {
			this.overlay = true;
			const valid = await this.checkMoney();
			this.overlay = false;
			if (!valid){
				this.disableWheel = true;
				return;
			}

			rotate();
		},
		onRotateEnd(prize) {
			console.log("Prize obtain");
			
		},
		async checkMoney(){
            try {
                const { status, message } = await this.$axios.$post(`${process.env.baseUrl}/roulette/checkWallet`);
				if (!status) {
                	const snackbar = { color: 'orange', timeout: 3000, state: true , text: message, top: true };
					this.$store.commit('ui/snackbar', snackbar);
					return false;
				}	
                return true;
            } catch (error) {
				const snackbar = { color: 'red', timeout: 3000, state: true , text: "", top: true };
                this.$store.commit('ui/snackbar', snackbar);
				return false;
            }
		}
	},
}
</script>

<style lang="scss">
.fw-btn__btn {
	cursor:pointer;
	transition: box-shadow ease .200s;
	 -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

.fw-btn__btn:hover {
	-webkit-border-radius: 70px;
    -moz-border-radius: 70px;
    border-radius: 70px;   
    -webkit-box-shadow:0px 0px 20px red;
    -moz-box-shadow: 0px 0px 20px red;
    box-shadow: 0px 0px 20px red;
}


</style>