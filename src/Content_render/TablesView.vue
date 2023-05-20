<template>
  <div class="container-fluid">
        <div class="row overflow-auto p-2">
            <div v-if="selected_row.length < 2" class="row">
                {{selected_row.length}} row selected 
            </div>
            <div v-else class="row">
                {{selected_row.length}} rows selected 
            </div>
            <v-table
                fixed-header
                :data="customer_CI_data_final_with_filter" 
                :currentPage.sync="currentPage"
                :pageSize="perpage"
                @totalPagesChanged="totalPages = $event"
                :filters="filters"
            >
                <thead slot="head" class="text-danger">
                    <th class="pl-3"><b><i v-if="selected_row.length > 0" @click="unSelectrows()" class="fa fa-arrows-rotate fa-lg tabel_head_rotate"></i></b></th>
                    <v-th class="table_head" :sortKey="data.column_name" defaultSort="asc" v-for="data in selected_column" :key="data.column_name"><span><b>{{ columnMapping[data.column_name] }}</b></span></v-th>
                </thead>

                    <tbody slot="body" slot-scope="{displayData}">
                    <tr class="table_row" v-for="row in displayData" :key="row.ID">
                        <td class="pl-3">
                            <b-form-checkbox-group v-model="selected_row" size="lg">
                                <b-form-checkbox  @change="OnchangeCheckboxrow($event)" :value="row.name"></b-form-checkbox>
                            </b-form-checkbox-group>
                        </td>
                        <td class="table_column" v-for="row2 in selected_column" :key="row2.ID">{{row[row2.column_name]}}</td>
                    </tr>
                </tbody>
            </v-table>
        </div>
        <hr>
        <div class="row justify-content-evenly">
            <div class="col-4 col-md-2 col-lg-1">
                <b-form-select v-model="perpage" :options= "pageOptions"></b-form-select>
            </div>
            <div class="col-8 col-md-5 col-lg-3">
                <b>Showing {{ customer_CI_data_final_with_filter.length == 0 ? ((currentPage * perpage) - perpage) : ((currentPage * perpage) - perpage)  + 1 }} to {{(perpage*currentPage) > customer_CI_data_final_with_filter.length ? customer_CI_data_final_with_filter.length%(perpage*currentPage) : perpage*currentPage}} of {{customer_CI_data_final_with_filter.length}}</b>
            </div>            
            <div class="col-12 col-md-10 col-lg-5">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="customer_CI_data_final_with_filter.length"
                    size= "md"
                    :per-page="perpage"
                    first-text="First"
                    prev-text="Prev"
                    next-text="Next"
                    last-text="Last"
                ></b-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
    name: 'Table-view',
    computed:{
        ...mapGetters([
            'customer_CI_data_final_with_filter','address_flag_farmer_crop_data', 'column_names_list',
            'selected_column','Customer_CI_reportFlag','columnMapping','selected_row'
        ])
    },
    props: {
        filters: {
            type: String,
            required: true
        }
    },
    data: ()=> ({
        perpage: 10,
        currentPage: 1,
        pageOptions: [
            { value: 10, text: '10' },
            { value: 15, text: '15' },
            { value: 20, text: '20' },
            { value: 25, text: '25' }
        ],
    }),
    mounted(){
        this.$store.dispatch('getcolumns_name');
    },
    methods:{
        OnchangeCheckboxrow(event){
            this.$store.commit("getselectedrows", event);
        },
        unSelectrows(){
            this.$store.commit("unSelectRows");
        }
    }
  }
</script>

<style scoped>
.table_head{
    min-width: 180px;
    height: 70px;
    max-width: 180px;
    position: sticky; 
    top: 0;
    position: -webkit-sticky; position: static;
    cursor: pointer;
}
.tabel_head_rotate{
    cursor: pointer;
    position: -webkit-sticky; position: static;
    top: 0;
    position: sticky;
}
.border_layout{
    border: 2px solid grey;
    border-radius: 100px;
}
table {
  border-collapse: collapse;
}

.table_column {
    border: 1px solid grey;
    padding: 1px 2px 0px 5px;
    min-width: 200px;
    height: 30px;
    max-width: 200px;
    overflow: hidden;
}

th {
  border: 1px solid grey;
}
.text_center{
    align-items: center;
}

.table_row {
    min-width: 180px;
    min-height: 5px;
    max-height: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    border: 1px solid grey;
}

</style>
