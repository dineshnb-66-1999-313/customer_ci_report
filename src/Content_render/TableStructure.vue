<template>
    <div class="container-fluid" style="background-color: white;">
        <div class="row justify-content-between">
            <div class="col-md-3">
                <button class="btn btn-secondary" @click="extractdatatoexcel()">Excel</button>
                <b-dropdown id="dropdown-left" text="Action" variant="secondary" class="m-2">
                    <b-dropdown-item :disabled = "selected_row.length > 0 ? false : true" @click="GenerateMop()">Generate MOP</b-dropdown-item>
                    <b-dropdown-item :disabled = "selected_row.length > 0 ? false : true" @click="GenerateRFC()">Generate RFC</b-dropdown-item>
                </b-dropdown>
                <button class="btn btn-secondary" v-if="customer_CI_data_final.length == 0" @click="getpopupforcolumnselction()">List Column</button>
                <b-dropdown v-else id="dropdown-left" text="Views" variant="secondary" class="m-2">
                    <b-dropdown-item @click="getpopupforcolumnselction()">List Column</b-dropdown-item>
                    <b-dropdown-item @click="getmasterview()">Master View</b-dropdown-item>
                    <b-dropdown-item @click="showallcolumns()">Show All</b-dropdown-item>
                    <b-dropdown-item @click="getRecommdationview()">Recommendation view</b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="col-md-3 m-1">
                <input type="text" @input="onChangeSearchData($event)" placeholder="Search Here" class="form-control form-control-sm" v-model="searchdata">
            </div>
        </div>

        <b-modal
            id="Column_selection_model"
            ref="Column_selection_model"
            size="xl"
            title="Select the columns you need"
            centered
            hide-header
            hide-footer
        >
        <div>
            <div class="row">
                <div class="col-10 col-sm-6 col-md-5 col-lg-3">
                    <b-form-group>
                        <b-form-checkbox-group
                            class="green-switch"
                            v-model="selected_column"
                            v-for="data in column_names_list.slice(0, 20)" :key="data"
                            size="md"
                            switches
                        >
                            <b-form-checkbox @change="Onchangecheckbox($event)" :value="data">{{ columnMapping[data.column_name] }}</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                </div>
                <div class="col-10 col-sm-6 col-md-5 col-lg-3">
                    <b-form-group>
                        <b-form-checkbox-group
                            class="green-switch"
                            v-model="selected_column"
                            v-for="data in column_names_list.slice(20,40)" :key="data"
                            size="md"
                            switches
                        >
                            <b-form-checkbox @change="Onchangecheckbox($event)" :value="data">{{ columnMapping[data.column_name] }}</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                </div>
                <div class="col-10 col-sm-6 col-md-5 col-lg-3">
                    <b-form-group>
                        <b-form-checkbox-group
                            class="green-switch"
                            v-model="selected_column"
                            v-for="data in column_names_list.slice(40,60)" :key="data"
                            size="md"
                            switches
                        >
                            <b-form-checkbox @change="Onchangecheckbox($event)" :value="data">{{ columnMapping[data.column_name] }}</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                </div>
                <div class="col-10 col-sm-6 col-md-5 col-lg-3">
                    <b-form-group>
                        <b-form-checkbox-group
                            class="green-switch"
                            v-model="selected_column"
                            v-for="data in column_names_list.slice(60,75)" :key="data"
                            size="md"
                            switches
                        >
                            <b-form-checkbox @change="Onchangecheckbox($event)" :value="data">{{ columnMapping[data.column_name] }}</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                </div>
            </div>
        </div>
        </b-modal>

        <div class="row">
            <TablesView :filters="filters" />
        </div>
    </div>
</template>

<script>
import TablesView from './TablesView.vue';
import { mapGetters } from 'vuex';
import XLSX from 'xlsx';

export default {
    name: 'TableStructure',
    components: {
        TablesView
    },
    computed:{
        ...mapGetters([
            'column_names_list', 'selected_column','columnMapping', 'searchdata', 'selected_row', 'customer_CI_data_final'
        ])
    },
    data: () => ({
        filters: {
            name: {value: '', keys: ['modelid','company']}
        },
    }),
    updated(){
        this.$store.commit("filterdCIData")
    },
    methods: {
        getpopupforcolumnselction(){
            this.$refs['Column_selection_model'].show();
        },
        Onchangecheckbox(event){
            this.$store.commit("getselectedelemets", event);
        },
        getRecommdationview(){
            this.$store.commit('submitrecommdationcolumndata');
        },
        getmasterview(){
            this.$store.commit('submitmastercoulumndata');
        },
        showallcolumns(){
            this.$store.commit('submitallcolumndata')
        },
        // extractdatatoexcel(){
        //     this.$store.dispatch('GenerateExceldata', [this.$store.getters.customer_CI_data_final, this.$store.getters.selected_column]);
        // },
        extractdatatoexcel() {
            const data = [
                { name: 'John', age: 30, city: 'New York' },
                { name: 'Mary', age: 25, city: 'San Francisco' },
                { name: 'Peter', age: 40, city: 'London' }
            ];
            
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
            XLSX.writeFile(workbook, 'data.xlsx');
        },
        async GenerateMop(){
            await this.$store.dispatch('GoToGenerateMop');
            await this.$router.push('/MopGeneration');
        },
        async GenerateRFC(){
            await this.$store.dispatch('GoToGenerateMop');
            await this.$router.push('/RfcGenerator');
        },
        onChangeSearchData(event){
            this.$store.commit("onChangeSearchData",event.target.value)
        }
    }
}
</script>

<style>
.green-switch .custom-control-input:checked~.custom-control-label::before {
  background-color: green;
}

.green-switch .custom-control-input:checked~.custom-control-label::after {
  background-color: red;
}
</style>