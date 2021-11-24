<template>
    <div class="base-input-container">
        <template v-if="option == 'formSelect'">
            <div class="base-label">
                {{ title }}
                <div v-if="isRequired == true" class="required-input">*</div>
                <div v-else></div>
            </div>

            <select class="base-select-form" v-model="selected">
                <option disabled value="" class="base-select-option">
                    Lựa chọn {{ title }}
                </option>
                <option v-for="item in listData" :key="item" :value="item">
                    {{ item }}
                </option>
            </select>
        </template>
        <template v-else>
            <div class="base-label">
                {{ title }}
                <div v-if="isRequired == true" class="required-input">*</div>
                <div v-else></div>
            </div>
            <div class="">
                <input
                    :type="type"
                    v-model="value"
                    class="base-input"
                    @input="debounceInput" 
                />
            </div>
        </template>
    </div>
</template>

<script>
import moment from "moment-timezone";
import "moment/locale/vi";
import _ from "lodash";

moment.tz.setDefault("Asia/Ho_Chi_Minh");
moment.locale("vi");

export default {
    props: {
        type: {
            type: String,
        },
        title: {
            type: String,
        },
        value: {
            value: String,
        },
        option: {
            value: String,
        },
        listData: {
            value: Array,
        },
        responseGroup: {
            value: String,
        },
        isRequired: {
            value: Boolean,
            default: false,
        },
    },

    data() {
        return {
            date: new Date(),
            selected: "",
            value:"",
            isShow: false,
        };
    },
    methods: {
        debounceInput: _.debounce(function (e) {
            this.value = e.target.value;
        }, 200),
    },
    watch: {
        responseEmail(val) {
            this.value = val;
        },
        responsePassword(val) {
            this.value = val;
        },
        responseName(val) {
            this.value = val;
        },
        responsePhonenumber(val) {
            this.value = val;
        },
        responseNote(val) {
            this.value = val;
        },
        responseUrl(val) {
            this.value = val;
        },
        responseGroup(val) {
            this.selected = val;
        },
        responseRole(val) {
            this.selected = val;
        },
        //Emit to add employee
        selected(val) {
            this.$emit("selectedGender", val);
        },
        value(val) {
            this.$emit("valueGender", val);
        },
    },
};
</script>

<style lang="scss">
.base-input-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 0 0 40%;
    margin-bottom: 20px;

    .base-label {
        font-size: 16px;
        color: #000;
        display: flex;
        gap: 5px;

        .required-input {
            font-size: 20px;
            color: red;
        }
    }

    .base-input-sub-container {
        border: 2px solid #eaeaea;
        border-radius: 10px;
        background-color: white;
        display: flex;
        align-items: center;
        position: relative;
        gap: 10px;
        .base-input {
        width: 100%;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-size: 15px;
        border-color: transparent;
        }

        .image-input {
            width: 36px;
            height: 32px;
            cursor: pointer;

            img {
                width: 20px;
                height: 20px;
                object-fit: cover;
            }
        }
    }

    .base-select-form {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 2px solid #eaeaea;
        font-weight: bold;
        font-size: 16px;
        color: #000;
    }

    .base-area {
        height: 100%;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 2px solid #eaeaea;
        font-weight: bold;
    }

    .base-input {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 2px solid #eaeaea;
        font-weight: bold;
    }

    .enable-cursor {
        cursor: not-allowed;
    }
}
</style>
