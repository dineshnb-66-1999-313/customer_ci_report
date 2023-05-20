<template>
    <div class="container-fluid">
        <div class="border" style="background-color: white;">
            <div class="row justify-content-around">
                <div class="col-10 col-sm-4 col-md-3 col-lg-3">
                    <label for="select3" class="control-label">Offer Type </label>
                    <multiselect v-model="offer_type" :options="offer_type_list" @input="onchangeoffertype" placeholder="Select Offer type" label="offertype" :show-labels="false" class="custom-multiselect"></multiselect>
                </div>
                <div class="col-10 col-sm-4 col-md-3 col-lg-3">
                    <label>Company</label>
                    <multiselect v-model="company_name" @input="onchangecompanyname" :options="company_name_list" placeholder="Select Company Name" label="company" :show-labels="false" class="custom-multiselect"></multiselect>
                </div>
                <div class="col-10 col-sm-4 col-md-3 col-lg-3">
                    <label for="select3" class="control-label">Product</label>
                    <multiselect v-model="modelid" @input="onchangemodelid" :multiple="true" :options="modelid_list" placeholder="Select Product" label="modelid" track-by="modelid" :show-labels="false" :close-on-select="false" :clear-on-select="false" :preserve-search="true" class="custom-multiselect" @select="onSelect($event)" @remove="onRemove($event)">
                        <span class="checkbox-label ml-2" slot="option" slot-scope="scope" @click.self="select(scope.modelid)">
                            {{ scope.option.modelid }}
                            <input class="test ml-1" type="checkbox" v-model="scope.option.checked" />
                        </span>
                        <template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length" v-show="!isOpen">{{ values.length === 1 ? values.length + ' Option selected' : values.length + ' options selected' }}</span></template>
                    </multiselect>
                </div>
            </div>
            <div class="row justify-content-around">
                <div class="col-10 col-sm-4 col-md-3 col-lg-3">
                    <label for="select3" class="control-label">Installation Status</label>
                    <multiselect v-model="installation_status" @input="onchnageinstalltionstatus" :options="installation_status_list" placeholder="Select Installation Status" label="installstatus" :show-labels="false" class="custom-multiselect"></multiselect>
                </div>
                <div class="col-10 col-sm-4 col-md-3 col-lg-3">
                    <label for="select3" class="control-label">Status Validation</label>
                    <multiselect v-model="status_validation" @input="onchnagestatusvalidation" :options="status_validation_list" placeholder="Select Status Validation" label="statusvalidation" :show-labels="false" class="custom-multiselect"></multiselect>
                </div>
                <div class="col-10 col-sm-4 col-md-3 col-lg-3">
                    <label for="select3" class="control-label">Operation Status</label>
                    <multiselect v-model="operation_status" @input="onchangeoperationstatus" :options="operation_status_list" placeholder="Select Operation Status" label="operationalstatus" :show-labels="false" class="custom-multiselect"></multiselect>
                </div>
            </div>
            <div class="row align-item-start m-3">
                <div class="col-4">
                    <button class="btn btn-success btn-md mr-2" @click="OnRunQuery()">Run Query</button>
                    <button class="btn btn-outline-secondary btn-md" @click="submitreset()">Reset</button>
                </div>
                <!-- <div class="col-4">
                    <input type="file" id="imageUpload" hidden class="form-control text-white"/>
                    <label for="imageUpload" class="p-2 rounded" style="border-style: dashed"><i class="fa fa-cloud-arrow-up fa-lg"></i><span></span> Attach CI File</label>
                </div> -->
            </div>
        </div>
        <b-modal
            id="Loading_page_model"
            ref="Loading_page_model"
            size="md"
            hide-header
            centered
            no-close-on-backdrop
            no-close-on-esc
            no-enforce-focus
            hide-footer
        >
            <div>
                <div class="row" v-if="!Customer_CI_reportFlag">
                    <img width="150" height="100" src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="">
                </div>
            </div>
        </b-modal>
        <div class="border">
            <TableStruture />
        </div>
    </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import TableStruture from './TableStructure.vue'
import { mapGetters } from 'vuex';
import Multiselect from 'vue-multiselect';

export default {
    name: 'CustomerCIreport',
    components: {
        TableStruture, Multiselect
    },
    computed:{
        ...mapGetters([
            'modelid', 'operation_status', 'installation_status', 'status_validation','company_name','offer_type',
            'offer_type_list','company_name_list','modelid_list', 'operation_status_list', 'installation_status_list', 'status_validation_list',
            'Customer_CI_reportFlag',
        ]),
    },
    mounted(){
        this.$store.dispatch('getalloffer_type')
        this.$store.dispatch('getallmodelids')
        this.$store.dispatch('getalloperationstatus')
        this.$store.dispatch('getallinstallationstatus')
        this.$store.dispatch('getallstatusvalidation')
    },
    updated(){
        if(this.$store.getters.Customer_CI_reportFlag == true){
            this.$refs['Loading_page_model'].hide();
        }
    },
    methods: {
        isSelected(option) {
            return this.selectedOptions.includes(option);
        },
        toggleOption(option) {
            if (this.isSelected(option)) {
                this.selectedOptions = this.selectedOptions.filter((selected) => selected !== option);
            } else {
                this.selectedOptions.push(option);
            }
        },
        onchangecompanyname(company_name){
            this.$store.commit("getcompanyname", company_name);
        },
        onchangemodelid(modelid){
            this.$store.commit("getmodelid", modelid);
        },
        onchangeoperationstatus(operation_status){
            this.$store.commit("getoperationstatus", operation_status);
        },
        onchnageinstalltionstatus(installation_status){
            this.$store.commit("getinstallstatus", installation_status);
        },
        onchnagestatusvalidation(status_validation){
            this.$store.commit("getstatsuvalidation", status_validation);
        },
        onchangeoffertype(offer_type){
            this.$store.commit("setoffertype", offer_type);
            this.$store.dispatch('getallcompanynames');
        },
        OnRunQuery(){
            this.$refs['Loading_page_model'].show();
            this.$store.dispatch("dispatchcustomercireports",[this.company_name,this.modelid,this.operation_status,this.installation_status,this.status_validation, this.offer_type]);
        },
        submitreset(){
            this.$store.commit("resetallfeilds");
        },
        onSelect (option) {
            let index = this.modelid_list.findIndex(item => item.modelid==option.modelid);
            this.modelid_list[index].checked = true;
        },
        
        onRemove (option) {
            let index = this.modelid_list.findIndex(item => item.modelid==option.modelid);
            this.modelid_list[index].checked = false;
        }
    } 
}
</script>

<style>
.contain{
    margin: 0rem 0rem 0.5rem 0rem;
    border: 1px solid red;
}
.row_data{
    margin: 1rem;
    background-color: rgba(228, 187, 110, 0.429);
    border: 1px solid #ffffff03;
}
.border{
    background-color: rgb(249, 252, 252);
    margin-bottom: 2rem;
}
.custom-multiselect {
  font-size: 14px; 
}
.test {
  position: absolute;
  left: 0vw;
}
</style>