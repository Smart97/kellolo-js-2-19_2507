<template>
    <div class="headerCartWrap">
        <div class="headerCartWrapBlock"></div>
        <div class="headerCartWrapInAll">
            <div id="basket" class="d-flex flex-column">
                <item
                    v-for="item of items"
                    type="basket"
                    :item="item"
                    :key="item.id"
                />
                <div class="headerCartWrapTotalPrice">
                    <div>total&nbsp;</div>
                    <div>${{ total }}</div>
                </div>

                <button type="button" class="productsButtonIndex">Checkout</button>
                <button type="button" class="productsButtonIndex">Go to cart</button>
            </div>
        </div>
    </div>
</template>

<script>
import { get } from "../utils/index.js";
import Item from "./Item.vue";

export default {
    name: "Basket",
    components: {
        Item,
    },
    data() {
        return {
            url: "https://raw.githubusercontent.com/Cerzon/assets/master/JSON/basket.json",
            items: [],
            // total: 0,
        }
    },
    computed: {
        total() {
            let result = 0;
            this.items.forEach(item => { result += item.price * item.amount });
            return result.toFixed(2);
        }
    },
    mounted() {
        get(this.url).then(data => { this.items = data.contents });
    },
}
</script>

<style>

</style>
