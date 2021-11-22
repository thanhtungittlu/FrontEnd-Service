<template>
    <div class='row'>
        <div
            class="col-sm-3"
        >
            <InfoCard
                :icon="dataOverall[0].icon"
                :title="dataOverall[0].title"
                :totalNumber="dataOverall[0].totalNumber"
            />
        </div>
        <div
            class="col-sm-3"
        >
            <InfoCard
                :icon="dataOverall[1].icon"
                :title="dataOverall[1].title"
                :totalNumber="dataOverall[1].totalNumber"
            />
        </div>
        <div
            class="col-sm-3"
        >
            <InfoCard
                :icon="dataOverall[2].icon"
                :title="dataOverall[2].title"
                :totalNumber="dataOverall[2].totalNumber"
            />
        </div>
        <div
            class="col-sm-3"
        >
            <InfoCard
                :icon="dataOverall[3].icon"
                :title="dataOverall[3].title"
                :totalNumber="dataOverall[3].totalNumber"
            />
        </div>
    </div>
</template>

<script>
import { InfoCard } from "@/components";
export default {
    name: "SectionFirst",
    components: {
        InfoCard,
    },
    data() {
        return {
            dataOverall: [
                {
                    icon: "./img/cpu.png",
                    title: "Total box",
                    totalNumber: "40"
                },
                {
                    icon: "./img/online-video.png",
                    title: "Box online",
                    totalNumber: "30"
                },
                {
                    icon: "./img/delete-from-cloud-outlined-button.png",
                    title: "Box offline",
                    totalNumber: "10"
                },
                {
                    icon: "./img/power-button.png",
                    title: "Disabled Box",
                    totalNumber: "0"
                }
            ],

        };
    },
}

</script>

<style>

</style>

