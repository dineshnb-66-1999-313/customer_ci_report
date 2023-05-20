<template>
    <div class="container-fluid">
        <div class="row contact_info m-2 p-1">
            <div class="row justify-content-start">
                <div class="col-1 col-sm-1 col-md-3">
                    <h5><i style="cursor: pointer;" @click="goToCIreport()" class="fa fa-arrow-left fa-xl"></i></h5>
                </div>
                <div class="col-10 col-sm-10 col-md-5 text-center">
                    <h4>MOP Template</h4>
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
        <form @submit.prevent="GenerateMOP">
        <div class="row m-2 contact_info mb-4 pb-4">
            <h3>Contact Information</h3>
            <div class="col-md-6">
                <div class="row mt-3">
                    <div class="col-md-4">
                        <span>Change Request ID : </span>
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control form-control-sm" @input="OnchangeMOPChangeRequestId($event)" v-model="MOPChangeRequestId" placeholder="Change Request ID...">
                    </div>
                </div>
                <div class="row pt-3">
                    <div class="col-md-4">
                        <span>RM Implementation Enginner : </span>
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-4">
                                <input type="text" class="form-control form-control-sm" @input="OnchangeMOPImplementationEngName($event)" v-model="MOPImplementationEngName" placeholder="Name...">
                            </div>
                            <div class="col-md-4">
                                <input type="number" class="form-control form-control-sm" @input="OnchangeMOPImplementationEngPhone($event)" v-model="MOPImplementationEngPhone" placeholder="Phone...">
                            </div>
                            <div class="col-md-4">
                                <input type="email" class="form-control form-control-sm" @input="OnchangeMOPImplementationEngEmail($event)" v-model="MOPImplementationEngEmail" placeholder="Email...">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row pt-3">
                    <div class="col-md-4 pt-2">
                        <span>RM Prime Enginner : </span>
                    </div>
                    <div class="col-md-8">
                        <div class="row justify-content-between">
                            <div class="col-md-4">
                                <input type="text" class="form-control form-control-sm" @input="OnchangeMOPprimeEngName($event)" v-model="MOPPrimeEngName" placeholder="Name..." >
                            </div>
                            <div class="col-md-4">
                                <input type="number" class="form-control form-control-sm" @input="OnchangeMOPprimeEngPhone($event)" v-model="MOPPrimeEngphone" placeholder="Phone..." >
                            </div>
                            <div class="col-md-4">
                                <input type="email" class="form-control form-control-sm" @input="OnchangeMOPprimeEngemail($event)" v-model="MOPPrimeEngemail" placeholder="Email..." >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row pt-3">
                    <div class="col-md-4 pt-2">
                        <span>SDM / CSM : </span>
                    </div>
                    <div class="col-md-8">
                        <div class="row justify-content-between">
                            <div class="col-md-4">
                                <input type="text" class="form-control form-control-sm" @input="OnchangeMOPSDMName($event)" v-model="MOPSDMCSMname" placeholder="Name..." >
                            </div>
                            <div class="col-md-4">
                                <input type="number" class="form-control form-control-sm" @input="OnchangeMOPSDMPhone($event)" v-model="MOPSDMCSMphone" placeholder="Phone..." >
                            </div>
                            <div class="col-md-4">
                                <input type="email" class="form-control form-control-sm" @input="OnchangeMOPSDMemail($event)" v-model="MOPSDMCSMemail" placeholder="Email..." >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row pt-3">
                    <div class="col-md-4 pt-2">
                        <span>RM Manger :  </span>
                    </div>
                    <div class="col-md-8">
                        <div class="row justify-content-between">
                            <div class="col-md-4">
                                <input type="text" class="form-control form-control-sm" @input="OnchangeMOPRMMangerName($event)" v-model="MOPManagerName" placeholder="Name..." >
                            </div>
                            <div class="col-md-4">
                                <input type="number" class="form-control form-control-sm" @input="OnchangeMOPRMMangerPhone($event)" v-model="MOPManagerPhone" placeholder="Phone..." >
                            </div>
                            <div class="col-md-4">
                                <input type="email" class="form-control form-control-sm" @input="OnchangeMOPRMMangerEmail($event)" v-model="MOPManagerEmail" placeholder="Email..." >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row pt-3">
                    <div class="col-md-4 pt-2">
                        <span>RM Senior Manager : </span>
                    </div>
                    <div class="col-md-8">
                        <div class="row justify-content-between">
                            <div class="col-md-4">
                                <input type="text" class="form-control form-control-sm" @input="OnchangeMOPRMSenEngName($event)" v-model="MOPSeniorManagerName" placeholder="Name..." >
                            </div>
                            <div class="col-md-4">
                                <input type="number" class="form-control form-control-sm" @input="OnchangeMOPRMSenEngPhone($event)" v-model="MOPSeniorManagerPhone" placeholder="Phone..." >
                            </div>
                            <div class="col-md-4">
                                <input type="email" class="form-control form-control-sm" @input="OnchangeMOPRMSenEngEmail($event)" v-model="MOPSeniorManagerEmail" placeholder="Email..." >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row pt-3">
                    <div class="col-md-4 pt-2">
                        <span>Customer Contact 1 : </span>
                    </div>
                    <div class="col-md-8">
                        <div class="row justify-content-between">
                            <div class="col-md-4">
                                <input type="text" class="form-control form-control-sm" @input="OnchangeMOPCustomer1Name($event)" v-model="MOPCustomer1Name" placeholder="Name..." >
                            </div>
                            <div class="col-md-4">
                                <input type="number" class="form-control form-control-sm" @input="OnchangeMOPCustomer1Phone($event)" v-model="MOPCustomer1Phone" placeholder="Phone..." >
                            </div>
                            <div class="col-md-4">
                                <input type="email" class="form-control form-control-sm" @input="OnchangeMOPCustomer1Email($event)" v-model="MOPCustomer1Email" placeholder="Email..." >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row pt-3">
                    <div class="col-md-4">
                        <span>Customer Contact 2 : </span>
                    </div>
                    <div class="col-md-8">
                        <div class="row justify-content-between">
                            <div class="col-md-4">
                                <input type="text" class="form-control form-control-sm" @input="OnchangeMOPCustomer2Name($event)" v-model="MOPCustomer2Name" placeholder="Name...">
                            </div>
                            <div class="col-md-4">
                                <input type="number" class="form-control form-control-sm" @input="OnchangeMOPCustomer2Phone($event)" v-model="MOPCustomer2Phone" placeholder="Phone...">
                            </div>
                            <div class="col-md-4">
                                <input type="email" class="form-control form-control-sm" @input="OnchangeMOPCustomer2Email($event)" v-model="MOPCustomer2Email" placeholder="Email...">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row pt-3">
                    <div class="col-md-4">
                        <span>Customer Contact 3 :</span>
                    </div>
                    <div class="col-md-8">
                        <div class="row justify-content-between">
                            <div class="col-md-4">
                                <input type="text" class="form-control form-control-sm" @input="OnchangeMOPCustomer3Name($event)" v-model="MOPCustomer3Name" placeholder="Name...">
                            </div>
                            <div class="col-md-4">
                                <input type="number" class="form-control form-control-sm" @input="OnchangeMOPCustomer3Phone($event)" v-model="MOPCustomer3Phone" placeholder="Phone...">
                            </div>
                            <div class="col-md-4">
                                <input type="email" class="form-control form-control-sm" @input="OnchangeMOPCustomer3Email($event)" v-model="MOPCustomer3Email" placeholder="Email...">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row pt-3">
                    <div class="col-md-4">
                        <span>Start Date/Time (EST) :<span class="star">*</span></span>
                    </div>
                    <div class="col-md-4">
                        <input type="datetime-local" class="form-control form-control-sm"  @input="OnchangeMOPChangeStartDateTime($event)"  v-model="MOPStartdatetime" v-bind:min="minstartDatetime" required>
                    </div>
                </div>
                <div class="row pt-3">
                    <div class="col-md-4">
                        <span>End Date/Time (EST) :<span class="star">*</span></span>
                    </div>
                    <div class="col-md-4">
                        <input type="datetime-local" class="form-control form-control-sm" @input="OnchangeMOPChangeEndDateTime($event)" v-model="MOPEnddatetime" v-bind:min="minendDatetime" required>
                    </div>
                </div>
                <div class="row pt-3">
                    <div class="col-md-4">
                        <span>Email Distribution : </span>
                    </div>
                    <div class="col-md-6">
                        <input type="email" class="form-control form-control-sm" @input="OnchangeMOPEmailDestribution($event)" v-model="MOPEmailDistribution" placeholder="Email Distribution..." >
                    </div>
                </div>
                <div class="row pt-3">
                    <div class="col-md-4">
                        <span>Bridge Details : </span>
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control form-control-sm" @input="OnchangeMOPBridgeDetails($event)" v-model="MOPBridgeDetails" placeholder="Bridge Details..." >
                    </div>
                </div>
                <div class="row p-4">
                    <div class="col-md-6 offset-md-2">
                        <button class="btn btn-success btn-md pt-2 pb-2 pr-4 pl-4 btn-block">Generate MOP</button>
                    </div>
                </div>
                {{MOPgeneratedDatatoExcel}}
                <!-- {{MOPgeneratedDatatoExcel.ImplementationEng[0].ImplementationEngName}}
                {{MOPgeneratedDatatoExcel.ImplementationEng[1].ImplementationEngPhone}}
                {{MOPgeneratedDatatoExcel.ImplementationEng[2].ImplementationEngEmail}} -->
            </div>
        </div>
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'MOP_Genareation',
    computed:{
        ...mapGetters([
            'Mopgenerationcolumn', 'columnMapping', 'generateMOPtabledata', 'selected_row', 'minstartDatetime', 'minendDatetime',
            'MOPChangeRequestId', 'MOPImplementationEngName', 'MOPImplementationEngPhone', 'MOPImplementationEngEmail',
            'MOPPrimeEngName', 'MOPPrimeEngphone', 'MOPPrimeEngemail', 'MOPSDMCSMname', 'MOPSDMCSMphone', 'MOPSDMCSMemail',
            'MOPManagerName', 'MOPManagerPhone', 'MOPManagerEmail','MOPSeniorManagerName', 'MOPSeniorManagerPhone','MOPSeniorManagerEmail',
            'MOPCustomer1Name', 'MOPCustomer1Phone', 'MOPCustomer1Email', 'MOPCustomer2Name', 'MOPCustomer2Phone', 'MOPCustomer2Email',
            'MOPCustomer3Name', 'MOPCustomer3Phone','MOPCustomer3Email', 'MOPStartdatetime', 'MOPEnddatetime','MOPEmailDistribution',
            'MOPBridgeDetails', 'MOPgeneratedDatatoExcel'
        ])
    },
    mounted(){
        this.$store.commit("getminstartDatetime");
        this.$store.commit("getminendDatetime");
    },
    methods:{
        goToCIreport(){
            this.$router.push('/cireport');
        },
        GenerateMOP(){
            this.$store.dispatch("getReadyForMopGenerate", [this.MOPChangeRequestId, this.MOPImplementationEngName, this.MOPImplementationEngPhone, 
                        this.MOPImplementationEngEmail,this.MOPPrimeEngName, this.MOPPrimeEngphone, this.MOPPrimeEngemail, this.MOPSDMCSMname, this.MOPSDMCSMphone, this.MOPSDMCSMemail,
                        this.MOPManagerName, this.MOPManagerPhone, this.MOPManagerEmail,this.MOPSeniorManagerName, this.MOPSeniorManagerPhone,this.MOPSeniorManagerEmail,
                        this.MOPCustomer1Name, this.MOPCustomer1Phone, this.MOPCustomer1Email, this.MOPCustomer2Name, this.MOPCustomer2Phone, this.MOPCustomer2Email,
                        this.MOPCustomer3Name, this.MOPCustomer3Phone,this.MOPCustomer3Email, this.MOPStartdatetime, this.MOPEnddatetime,this.MOPEmailDistribution,
                        this.MOPBridgeDetails
            ]);
        },
        OnchangeMOPChangeRequestId(event){
            this.$store.commit("getMOPChangeRequestId", event.target.value);
        },
        OnchangeMOPImplementationEngName(event){
            this.$store.commit("getMOPImplementationEngName", event.target.value);
        },
        OnchangeMOPImplementationEngPhone(event){
            this.$store.commit("getMOPImplementationEngPhone", event.target.value);
        },
        OnchangeMOPImplementationEngEmail(event){
            this.$store.commit("getMOPImplementationEngemail", event.target.value);
        },
        OnchangeMOPprimeEngName(event){
            this.$store.commit("getMOPprimeEngName", event.target.value)
        },
        OnchangeMOPprimeEngPhone(event){
            this.$store.commit("getMOPPrimeEngphone", event.target.value)
        },
        OnchangeMOPprimeEngemail(event){
            this.$store.commit("getMOPPrimeEngemail", event.target.value)
        },
        OnchangeMOPSDMName(event){
            this.$store.commit("getMOPSDMName", event.target.value)
        },
        OnchangeMOPSDMPhone(event){
            this.$store.commit("getMOPSDMPhone", event.target.value)
        },
        OnchangeMOPSDMemail(event){
            this.$store.commit("getMOPSDMemail", event.target.value)
        },
        OnchangeMOPRMMangerName(event){
            this.$store.commit("getMOPRMMangerName", event.target.value)
        },
        OnchangeMOPRMMangerPhone(event){
            this.$store.commit("getMOPRMMangerPhone", event.target.value)
        },
        OnchangeMOPRMMangerEmail(event){
            this.$store.commit("getMOPRMMangerEmail", event.target.value)
        },
        OnchangeMOPRMSenEngName(event){
            this.$store.commit("getMOPRMSenEngName", event.target.value)
        },
        OnchangeMOPRMSenEngPhone(event){
            this.$store.commit("getMOPRMSenEngPhone", event.target.value)
        },
        OnchangeMOPRMSenEngEmail(event){
            this.$store.commit("getMOPRMSenEngEmail", event.target.value)
        },
        OnchangeMOPCustomer1Name(event){
            this.$store.commit("getMOPCustomer1Name", event.target.value)
        },
        OnchangeMOPCustomer1Phone(event){
            this.$store.commit("getMOPCustomer1Phone", event.target.value)
        },
        OnchangeMOPCustomer1Email(event){
            this.$store.commit("getMOPCustomer1Email", event.target.value)
        },
        OnchangeMOPCustomer2Name(event){
            this.$store.commit("getMOPCustomer2Name", event.target.value)
        },
        OnchangeMOPCustomer2Phone(event){
            this.$store.commit("getMOPCustomer2Phone", event.target.value)
        },
        OnchangeMOPCustomer2Email(event){
            this.$store.commit("getMOPCustomer2Email", event.target.value)
        },
        OnchangeMOPCustomer3Name(event){
            this.$store.commit("getMOPCustomer3Name", event.target.value)
        },
        OnchangeMOPCustomer3Phone(event){
            this.$store.commit("getMOPCustomer3Phone", event.target.value)
        },
        OnchangeMOPCustomer3Email(event){
            this.$store.commit("getMOPCustomer3Email", event.target.value)
        },
        OnchangeMOPChangeStartDateTime(event){
            this.$store.commit("getMOPChangeStartdatetime",event.target.value)
        },
        OnchangeMOPChangeEndDateTime(event){
            this.$store.commit("getMOPChangeEnddatetime",event.target.value)
        },
        OnchangeMOPEmailDestribution(event){
            this.$store.commit("getMOPEmailDestribution",event.target.value)
        },
        OnchangeMOPBridgeDetails(event){
            this.$store.commit("getMOPBridgeDetails",event.target.value)
        }
    }
}
</script>

<style>
.contact_info{
    background-color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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