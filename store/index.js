// import Vue from 'vue';
// Vue3中引入VueX有别于vue2
import { createStore } from 'vuex';
import index from "@/store/indexBar.js"
import rank from '@/store/rank.js'

export default createStore({
	modules: {
		index,
		rank
	}
});