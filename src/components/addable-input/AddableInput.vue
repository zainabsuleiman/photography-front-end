<template>
    <div className="addable-input">
        <div className="addable-input__container">
            <input type="text" className="addable-input__container--input" ref="tagInput" :placeholder="placeholder"
                @keydown="inputKeyDown" />

            <ul className="addable-input__container--tags" v-if="value && value.length > 0">
                <li :key="index" v-for="(item, index) in value">
                    {{ item }}
                    <button className="tag-btn" @click="removeTag(index)">
                        <span class="tag-btn--icon fa fa-times"></span>
                    </button>
                </li>
            </ul>

            <span className="addable-input__empty-tags" v-if="typeof value === 'undefined' || value.length === 0">
                No items - Add items using the input above.
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
        },
        value: {
            type: Array,
        },
        onChange: {
            type: Function,
        },
    },
    data() {
        return {};
    },
    methods: {
        removeTag(index) {
            const newValue = [...this.value];
            newValue.splice(index, 1);
            this.onChange( newValue );
        },

        inputKeyDown(e) {
            const val = e.target.value;
            if (e.key === 'Enter' && val) {
                if (
                    this.value &&
                    this.value.find((tag) => tag.toLowerCase() === val.toLowerCase())
                ) {
                    return;
                }
                this.onChange( [ ...this.value, val ] );
                this.$refs.tagInput.value = null;
            }
        },
    }
}
</script>

<style>
.addable-input__label {
    margin-bottom: 20px;
    font-weight: 600;
    line-height: 1.6;
}

.addable-input__container {
    overflow: hidden;
    border: 0;
    box-shadow: 0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%);
    border-radius: 0.25rem;
}

.addable-input__container--input {
    border: none;
    outline: none;
    width: 100%;
    padding: 10px;
    color: #6c757d;
}

.addable-input__container--input::placeholder {
    color: #6c757d;
    font-size: 12px;
}

.addable-input__container--tags {
    list-style: none;
    padding: 5px;
    border-top: 4px solid #f1f4f7;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0;
    max-height: 100px;
    overflow: auto;
}


.addable-input__container--tags li {
    background: #fff;
    color: #6c757d;
    font-weight: 500;
    display: flex;
    align-items: center;
    margin-bottom: 3px;
    margin-right: 3px;
    padding: 3px 10px;
    border: 1px solid #ced4da;
    text-transform: uppercase;
    font-size: 12px;
    border-radius: 10px;
}

.addable-input__container--tags li .tag-btn {
    background: #fff;
    border: none;
    outline: none;
    color: #f16b6b;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    height: 15px;
    width: 15px;
    line-height: 0;
    margin-left: 10px;
    padding: 0;
}

.addable-input__empty-tags {
    padding: 6px;
    border-top: 4px solid #f1f4f7;
    width: 100%;
    display: block;
    color: #dee2e6;
    font-size: 14px;
}
</style>