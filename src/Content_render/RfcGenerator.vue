<template>
    <div class="container-fluid">
        <div class="row contact_info m-2 p-1">
            <div class="row justify-content-start">
                <div class="col-1 col-sm-1 col-md-3">
                    <h5><i style="cursor: pointer;" @click="goToCIreport()" class="fa fa-arrow-left fa-xl"></i></h5>
                </div>
                <div class="col-10 col-sm-10 col-md-5 text-center">
                    <h4>RFC Template</h4>
                </div>
            </div>
            <h5>Scope</h5>
            <div class="row overflow-auto ml-1 mb-4">
                <v-table
                    :data="generateMOPtabledata"
                >
                    <thead slot="head" class="text-danger">
                        <v-th class="table_head text-center" :sortKey="data.column_name" defaultSort="asc" v-for="data in Mopgenerationcolumn" :key="data.column_name"><span><b>{{ columnMapping[data.column_name] }}</b></span></v-th>
                    </thead>
                    <tbody slot="body" slot-scope="{displayData}">
                        <tr class="table_row text-center" v-for="row in displayData" :key="row.ID">
                            <td class="table_column" v-for="row2 in Mopgenerationcolumn" :key="row2.ID">{{row[row2.column_name]}}</td>
                        </tr>
                    </tbody>
                </v-table>
            </div>
        </div>
        <form @submit.prevent="GenerateRFC">
            <div class="row m-2 contact_info mb-4 pb-4">
                <h3>Contact Information</h3>
                <div class="col-md-6">
                    <div class="row mt-3">
                        <div class="col-md-4">
                            <span>Service Delivery Mgr.:</span>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control form-control-sm" v-model="ChangeNumber" placeholder="SDM Name...">
                        </div>
                    </div>
                    <div class="row pt-3">
                        <div class="col-md-4">
                            <span>RFC Created Date (EST)  </span>
                        </div>
                        <div class="col-md-6">
                            <input type="datetime-local" class="form-control form-control-sm" v-model="ImplementationEngName" v-bind:min="minstartDatetime">
                        </div>
                    </div>
                    <div class="row pt-3">
                        <div class="col-md-4">
                            <span>Peer Review By :</span>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control form-control-sm" v-model="ImplementationEngName" placeholder="Peer Name...">
                        </div>
                    </div>
                    <div class="row pt-3">
                        <div class="col-md-4">
                            <span>Change Owner: </span>
                        </div>
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-5">
                                    <input type="text" class="form-control form-control-sm" v-model="ImplementationEngName" placeholder="Name...">
                                </div>
                                <div class="col-md-5">
                                    <input type="email" class="form-control form-control-sm" v-model="ImplementationEngEmail" placeholder="Email...">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row pt-3">
                        <div class="col-md-4">
                            <span>Incident ID : </span>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control form-control-sm" v-model="ImplementationEngName" placeholder="Name...">
                        </div>
                    </div>
                    <div class="row pt-3">
                        <div class="col-md-4">
                            <span>CRQ Number:</span>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control form-control-sm" v-model="ImplementationEngName" placeholder="CRQ Number">
                        </div>
                    </div>
                    <div class="row pt-3">
                        <div class="col-md-4">
                            <span>Change Implementor:</span>
                        </div>
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-5">
                                    <input type="text" class="form-control form-control-sm" v-model="ImplementationEngName" placeholder="Name...">
                                </div>
                                <div class="col-md-5">
                                    <input type="email" class="form-control form-control-sm" v-model="ImplementationEngEmail" placeholder="Email...">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-md-4">
                            <span>Short Description: </span>
                        </div>
                        <div class="col-md-7">
                            <input type="text" class="form-control form-control-sm" v-model="ImplementationEngName" placeholder="Short Description...">
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row pt-3">
                        <div class="col-md-4">
                            <span>Detail Description: </span>
                        </div>
                        <div class="col-md-7">
                            <textarea type="text-area" class="form-control form-control-sm" rows="2" v-model="ImplementationEngName" placeholder="Details Descption"></textarea>
                        </div>
                    </div>
                    <div class="row pt-3">
                        <div class="col-md-4">
                            <span>Business Justification: </span>
                        </div>
                        <div class="col-md-7">
                            <input type="text" class="form-control form-control-sm" v-model="ImplementationEngName" placeholder="Business Justification...">
                        </div>
                    </div>
                    <div class="row pt-3">
                        <div class="col-md-4">
                            <span>Evaluation criteria: </span>
                        </div>
                        <div class="col-md-7">
                            <input type="text" class="form-control form-control-sm" v-model="ImplementationEngName" placeholder="Evaluation Criteria...">
                        </div>
                    </div>
                    <div class="row pt-3">
                        <div class="col-md-4">
                            <span>Affected Application: </span>
                        </div>
                        <div class="col-md-7">
                            <input type="text" class="form-control form-control-sm" v-model="ImplementationEngName" placeholder="Affected Application...">
                        </div>
                    </div>
                    <div class="row pt-3">
                        <div class="col-md-4">
                            <span>Start Date/Time (EST) :<span class="star">*</span></span>
                        </div>
                        <div class="col-md-6">
                            <input type="datetime-local" class="form-control form-control-sm" v-model="ImplementationEngName" v-bind:min="minstartDatetime" required>
                        </div>
                    </div>
                    <div class="row pt-3">
                        <div class="col-md-4">
                            <span>End Date/Time (EST) :<span class="star">*</span></span>
                        </div>
                        <div class="col-md-6">
                            <input type="datetime-local" class="form-control form-control-sm" v-model="ImplementationEngName" v-bind:min="minendDatetime" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 pt-3">
                            <span>Bridge Details :</span>
                        </div>
                        <div class="col-md-7 pt-3">
                            <input type="text" class="form-control form-control-sm" v-model="ChangeNumber" placeholder="Bridge Details...">
                        </div>
                    </div>
                    <div class="row pt-3 justify-content-evenly">
                        <div class="col-md-6">
                            <button class="btn btn-success btn-md pt-2 pb-2 pr-4 pl-4 btn-block">Generate RFC</button>
                        </div>
                </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'RFCGenareation',
    computed:{
        ...mapGetters([
            'Mopgenerationcolumn', 'columnMapping', 'generateMOPtabledata', 'selected_row', 'minstartDatetime', 'minendDatetime'
        ])
    },
    mounted(){
        this.$store.commit("getminstartDatetime");
        this.$store.commit("getminendDatetime");
    },
    methods:{
        goToCIreport(){
            this.$router.push('/cireport');
        }
    }
}
</script>

<style>
.contact_info{
    background-color: white;
}
.table_head{
    min-width: 100px;
    height: 60px;
    max-width: 100px;
    position: sticky; 
    top: 0;
    position: -webkit-sticky; position: static;
    cursor: pointer;
    font-size: 13px;
    /* background-color: darkgrey; */
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
    min-width: 100px;
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
    min-width: 100px;
    min-height: 5px;
    max-height: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    border: 1px solid grey;
    font-size: 13px;
}
.star{
    color: red;
}
</style>