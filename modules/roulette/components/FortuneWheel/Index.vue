<template>
	<v-card  
		class="pa-4 d-flex flex-column" 
		:class="disableWheel ? 'roulette-card': ''">
		<div class="d-flex flex-column align-start justify-center mb-2">
			<h1>{{ $t('Roulette') }}</h1>
			<span>{{ $t('PrizePerGift') }} {{ event.price }} Pejecoins</span>
		</div>
		<hr class="mb-1">
		<FortuneWheel style="width: 500px"
			:prizeId="prizeId"
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
					<h1>{{overlayMessage}}</h1>
					<v-progress-circular indeterminate 
						color="primary" 
						width="10"
						size="100">
					</v-progress-circular>
				</div>
			</v-overlay>
        </v-fade-transition>
		<RouletteModalPrize v-if="modalPrizeState" 
			:reward="modalPrizeReward" 
			@close="modalPrizeState = false"/>
	</v-card>
</template>

<script>
import FortuneWheel from 'vue-fortune-wheel'
import 'vue-fortune-wheel/lib/vue-fortune-wheel.css'

import { getHexColorOfRarity } from '@/modules/shared/helpers/rarityTypeHelper';

import RouletteModalPrize from '@/modules/roulette/components/RouletteModalPrize'

export default {
    components: {
        FortuneWheel,
		RouletteModalPrize
    },
    data() {
		return {
			event: {},
			prizeId: '1',
			overlay: false,
			overlayMessage: '',
			canvasVerify: true,
			canvasOptions: {
				borderWidth: 6,
				borderColor: '#584b43',
				imageSize: 30,
				btnText: "Spin",
				btnColor: "#EAA91A",
			},
			items: [],
			rewards: [],
			disableWheel: false,
			modalPrizeState: false,
			modalPrizeReward: null,
		}
	},
	async created () {
		this.overlayMessage = this.$t('LoadingBlocks');
		this.overlay = true;
		const data = await this.getRouletteData();

		if (data.length === null) {
			return this.disableWheel = true;
		}

		this.rewards = data.items;
		this.event = data.event
		this.items = data.items.map((i) => {
			const prize = {
				id: i.id.toString(),
				contentType: 'image',
				imageUri: i.reward.image,
				value: i.reward.title,
				bgColor: getHexColorOfRarity(i.reward.rarity),
				weight: i.reward.chance
			};
			return prize;
		});

		await new Promise(resolve => setTimeout(resolve, 2000));
		this.overlay = false;
	},
	methods: {
		async getRouletteData(){
			const payload = { groupId: this.$route.params.id }
            try {

				await new Promise(resolve => setTimeout(resolve, 500));
                const { status, data, message } = await this.$axios.$post(`${process.env.baseUrl}/roulette/items`, payload);
				if (!status){
					const snackbar = { color: 'orange', timeout: 3000, state: true , text: message, top: true };
                	this.$store.commit('ui/snackbar', snackbar);
					this.$router.push('/roulette');	
					return null;
				}
                return data;
            } catch (error) {
                const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenLoadingRouletteData'), top: true };
                this.$store.commit('ui/snackbar', snackbar);
				return null;
            }
		},
		onImageRotateStart() {
			this.disableWheel = true;
		},
		async onCanvasRotateStart(rotate) {
			this.overlayMessage = this.$t('VerifyWallet');
			this.overlay = true;
			await new Promise(resolve => setTimeout(resolve, 1000));
			const valid = await this.checkMoney();
			this.overlay = false;
			if (!valid){
				this.disableWheel = true;
				return;
			}

			rotate();
		},
		async onRotateEnd(prize) {
			this.overlayMessage = this.$t('ProcessingPrize');
			this.overlay = true;

			await new Promise(resolve => setTimeout(resolve, 500));
			this.overlay = false;
			this.disabledWheel = false;	

			const item = this.rewards.find(r => r.id.toString() === prize.id);
			this.modalPrizeReward = item.reward;
			this.modalPrizeState = true;
		},
		async checkMoney(){
            try {
				const payload = { groupId: this.$route.params.id }
                const { status, message, data } = await this.$axios.$post(`${process.env.baseUrl}/roulette/checkWallet`, payload);
				if (!status) {
                	const snackbar = { color: 'orange', timeout: 3000, state: true , text: message, top: true };
					this.$store.commit('ui/snackbar', snackbar);
					return false;
				}	
				this.prizeId = data.toString();
				this.$store.commit('auth/removeMoney', this.event.price);
                return true;
            } catch (error) {
				const snackbar = { color: 'red', timeout: 3000, state: true , text: this.$t('ErrorWhenObtainingMoney'), top: true };
                this.$store.commit('ui/snackbar', snackbar);
				return false;
            }
		}
	},
}
</script>

<style lang="scss">
.roulette-card .fw-btn__btn {
	background: gray !important;
}
.roulette-card .fw-btn__btn::before {
	border-bottom:  18px solid gray !important;
}
.roulette-card .fw-btn__btn:hover {
	-webkit-box-shadow:none !important;
    -moz-box-shadow: none !important;
    box-shadow: none !important;
	cursor: not-allowed !important;
}

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