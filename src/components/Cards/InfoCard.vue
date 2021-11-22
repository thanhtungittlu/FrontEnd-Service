<template>
    <div class="info-people-card-container">
        <div class="info-people-card-header">
            <div class="info-people-card-left">
                <div class="info-people-card-title">{{ title }}</div>
                <div v-bind:class="checkTotalNumber">{{ totalNumber }}</div>
            </div>
            <div class="info-people-card-right">
                <div class="icon-container">
                    <img :src="icon" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "InfoPeopleCard",
    props: {
        icon: {
            type: String,
        },
        title: {
            type: String,
        },
        totalNumber: {
            type: String,
        },
        typeOfNumber: {
            type: Boolean,
        },
    },
    computed: {
        checkNumberTransformation: function () {
            return this.typeOfNumber == true ? "number-up" : "number-down";
        },
        typeOfNumberImage: function () {
            return this.typeOfNumber == true
                ? "./img/up-arrow.png"
                : "./img/down-arrow.png";
        },
        checkTotalNumber: function () {
            return this.totalNumber == "Không có dữ liệu"
                ? "total-numbers-text"
                : "total-numbers";
        },
    },
    watch: {
        totalNumber(val) {
            console.log(val, "total numbe");
        },
    },
};
</script>

<style lang="scss">
.info-people-card-container {
    border-radius: 10px;
    box-shadow: 5px 5px 5px 5px #eaeaea;
    background: white;
    padding: 20px;
    color: black;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .info-people-card-header {
        display: flex;
        justify-content: space-between;

        .info-people-card-left {
            .info-people-card-title {
                color: #7f7f7f;
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
            }

            .total-numbers {
                font-weight: bold;
                font-size: 25px;
            }

            .total-numbers-text {
                font-weight: bold;
                font-size: 15px;
            }
        }

        .info-people-card-right {
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .info-people-card-footer {
        display: flex;
        align-items: center;
        font-size: 22px;
        .conversion-no-data {
            color: #0bd934;
            font-weight: bold;
            font-size: 17px;
        }

        .sub-info-people-card-footer {
            display: flex;

            .number-up-rushHour {
                color: #0bd934;
                margin: 0 8px;
            }
        }

        .icon-convert {
            margin-right: 5px;
            img {
                width: 23px;
                height: 26px;
            }
        }

        .total-numbers-text {
            font-weight: bold;
            font-size: 17px;
        }

        .number-up {
            color: #0bd934;
        }

        .number-down {
            color: #ff3636;
        }
    }
}

@media only screen and (max-width: 1280px) {
    .info-people-card-container {
        .info-people-card-header {
            .info-people-card-left {
                .info-people-card-title {
                    font-size: 13px;
                    margin-bottom: 0px;
                }

                .total-numbers {
                    font-size: 18px;
                }

                .total-numbers-text {
                    font-size: 18px;
                }
            }

            .info-people-card-right {
                width: 40px;
                height: 40px;
            }
        }

        .info-people-card-footer {
            .conversion-no-data {
                font-size: 14px;
            }
            .sub-info-people-card-footer {
                display: flex;
                font-size: 14px;

                .number-up-rushHour {
                    margin: 0 5px;
                }
            }
            .icon-convert {
                margin-right: 5px;
                img {
                    width: 15px;
                    height: 16px;
                }
            }
            .total-numbers-text {
                font-weight: bold;
                font-size: 14px;
            }
        }
    }
}
</style>
