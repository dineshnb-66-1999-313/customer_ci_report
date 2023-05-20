import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from './main';

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        BASEURL: 'http://10.133.103.121:8081/api/v1/ci/',
        company_name : "",
        modelid : [],
        operation_status : "",
        installation_status: "",
        status_validation: "",
        offer_type: "",
        company_name_list: [],
        modelid_list: [],
        operation_status_list: [],
        installation_status_list: [],
        status_validation_list: [],
        offer_type_list: [],
        column_names_list: [],
        selected_column: [],
        selected_row: [],
        searchdata: "",
        minstartDatetime: "",
        minendDatetime: "",
        Mopgenerationcolumn: [
            {
                ordinal_position: 1,
                column_name: "company"
            },
            {
                ordinal_position: 8,
                column_name: "modelid"
            },
            {
                ordinal_position: 12,
                column_name: "location"
            },
            {
                ordinal_position: 7,
                column_name: "class"
            },
            {
                ordinal_position: 10,
                column_name: "ipaddress"
            },
            {
                ordinal_position: 11,
                column_name: "nat"
            },
            {
                ordinal_position: 40,
                column_name: "swversion"
            },
            {
                ordinal_position: 69,
                column_name: "version"
            },
            {
                ordinal_position: 70,
                column_name: "springrelease"
            },
        ],
        generateMOPtabledata: [],
        Master_view: [
            {
                ordinal_position: 1,
                column_name: "company"
            },
            {
                ordinal_position: 2,
                column_name: "name"
            },
            {
                ordinal_position: 8,
                column_name: "modelid"
            },
            {
                ordinal_position: 10,
                column_name: "ipaddress"
            },
            {
                ordinal_position: 11,
                column_name: "nat"
            },
            {
                ordinal_position: 12,
                column_name: "location"
            },
            {
                ordinal_position: 39,
                column_name: "snmpstatus"
            },
            {
                ordinal_position: 49,
                column_name: "securitypatchlevel"
            },
            {
                ordinal_position: 68,
                column_name: "lastupdate"
            },
            {
                ordinal_position: 70,
                column_name: "springrelease"
            },
            {
                ordinal_position: 71,
                column_name: "offertype"
            },
        ],
        Recommendation_view: [
            {
                ordinal_position: 1,
                column_name: "company"
            },
            {
                ordinal_position: 2,
                column_name: "name"
            },
            {
                ordinal_position: 8,
                column_name: "modelid"
            },
            {
                ordinal_position: 40,
                column_name: "swversion"
            },
            {
                ordinal_position: 50,
                column_name: "nrelease"
            },
            {
                ordinal_position: 51,
                column_name: "nreleasedate"
            },
            {
                ordinal_position: 65,
                column_name: "n3eoms"
            },
            {
                ordinal_position: 68,
                column_name: "lastupdate"
            },
            {
                ordinal_position: 70,
                column_name: "springrelease"
            },
            {
                ordinal_position: 71,
                column_name: "offertype"
            },
        ],
        Customer_CI_reportFlag: false,
        customer_CI_data_final: [],
        customer_CI_data_final_with_filter: [],
        
        columnMapping : {
            company: 'Company',
            name: 'Name',
            customernickname: 'Customer Nick Name',
            operationalstatus: 'Operational Status',
            installstatus: 'Install Status',
            statusvalidation: 'Status Validation',
            class : 'CI Class',
            modelid: 'Modal ID',
            modelnumber: 'Model Number',
            ipaddress: 'IP Address',
            nat: 'NAT IP',
            location : 'Location',
            primarycontact: 'Primary Contact',
            inservicedate: 'In Service Data',
            serviceenddate: 'Service END Date',
            created: 'Created',
            createdby: 'Creade By',
            update: 'Update',
            updatedby: 'Updated By',
            externalkey: 'External Key',
            presentinrmm: 'Present IN RMM',
            jobapplied: 'Job Applied',
            firstdiscovered: 'First Discoverd',
            discoveredsource: 'Discovery Source',
            mostrecentdiscovery: 'Most Recent Discovery',
            secode: 'SE Code',
            seid: 'SEID',
            rmmonitoringstatus: 'RMM Monitor Status',
            ciid: 'CIID',
            credentials: 'Credentials',
            lasttrapreceived: 'Last Trap Received Date',
            incidentlast30: 'Incident in Last 30 days',
            lastincidentreceivedata: 'Last Incident',
            lastincidentassigngroup: 'Last Incident AssignGroup',
            lastpingtime: 'Last Ping Time',
            lastsnmptime: 'Last SNMP Time',
            lasttraptime: 'Last Trap Time',
            pingstatus: 'Ping Status',
            snmpstatus: 'SNMP Status',
            swversion: 'Software Version',
            fwversion: 'FW Version',
            platform: 'Platform',
            osversion: 'OS Version',
            servicetype:  'Service Type ',
            servicepacklevel: 'Service Pack Level',
            kernalpatchlevel: 'kernal Patch Level',
            cmpatchlevel: 'CM Patch level',
            additionalpatch: 'Additional Patch',
            securitypatchlevel: 'Security Level Patch',
            nrelease: 'N Release',
            nreleasedate: 'N Release Date',
            nendofsale: 'N End Of Sale',
            neoms: 'N EOS',
            n1release: 'N-1 Release',
            n1releasedate: 'N-1 Release Date',
            n1endofsale: 'N-1 End Of Sale',
            n1eoms: 'N-1 EOS',
            n2release: 'N-2 Release',
            n2releasedate: 'N-2 Release Date',
            n2endofsale: 'N-2 End Of Sale',
            n2eoms: 'N-2 EOS',
            n3release: 'N-3 Release',
            n3releasedate: 'N-3 Release Date',
            n3endofsale: 'N-3 End Of Sale',
            n3eoms: 'N-3 EOS',
            nreleasenote: 'N Release Notes',
            n1releasenote: 'N-1 Relase Notes',
            lastupdate: 'Last Update',
            version: 'Version',
            springrelease: 'Spring Release',
            offertype: 'Offer',
            _class: 'Class',
            note: "Notes",
            comments: "Comments",
            id : 'ID'
        },
        // MOP region
        
        MOPgeneratedDatatoExcel: {},
        MOPChangeRequestId: '',
        MOPImplementationEngName: '',
        MOPImplementationEngPhone: "",
        MOPImplementationEngEmail: "",
        MOPPrimeEngName: "",
        MOPPrimeEngphone: "",
        MOPPrimeEngemail: "",
        MOPSDMCSMname: "",
        MOPSDMCSMphone: "",
        MOPSDMCSMemail: "",
        MOPManagerName: "",
        MOPManagerPhone: "",
        MOPManagerEmail: "",
        MOPSeniorManagerName: "",
        MOPSeniorManagerPhone: "",
        MOPSeniorManagerEmail: "",
        MOPCustomer1Name: "",
        MOPCustomer1Phone: "",
        MOPCustomer1Email: "",
        MOPCustomer2Name: "",
        MOPCustomer2Phone: "",
        MOPCustomer2Email: "",
        MOPCustomer3Name: "",
        MOPCustomer3Phone: "",
        MOPCustomer3Email: "",
        MOPStartdatetime: "",
        MOPEnddatetime: "",
        MOPEmailDistribution: "",
        MOPBridgeDetails: ""
    },
    mutations: { //syncronus

// ------------------- set property for all CI's --------------------------------------------
        setoffertype(state, payload){
            state.offer_type = payload;
        },
        getcompanyname(state, payload){
            state.company_name = payload
        },
        getmodelid(state, payload){
            state.modelid = payload
        },
        getinstallstatus(state, payload){
            state.installation_status = payload
        },
        getstatsuvalidation(state, payload){
            state.status_validation = payload
        },
        getoperationstatus(state, payload){
            state.operation_status = payload
        },
//-----------------Set property for all list of CI's---------------------------
        getalloffer_type(state, payload){
            state.offer_type_list = payload;
        },
        commitallcompanynames(state,payload){
            state.company_name_list = payload
        },
        getallmodelids(state, payload){
            state.modelid_list = payload;
        },
        getallinstallationstatus(state, payload){
            state.installation_status_list = payload;
        },
        getallstatusvalidation(state, payload){
            state.status_validation_list = payload;
        },
        getalloperationstatus(state, payload){
            state.operation_status_list = payload;
        },

    //-------------------------------------------------------
        
    //----------------Run Query--------------------------------
        getIntialState(state){
            state.Customer_CI_reportFlag = false;
            state.selected_row = [];
        },
        getallcustomerCIreport(state,payload){
            if(payload === null){
                state.Customer_CI_reportFlag = true
                state.customer_CI_data_final = state.customer_CI_data_final_with_filter = payload
            }
            else{
                state.Customer_CI_reportFlag = true
                state.customer_CI_data_final = state.customer_CI_data_final_with_filter = payload
            }
        },
    // ------------------------------------------------------------

        GetCoulmnNames(state, payload){
            console.log(payload)
            for(let i = 0; i < payload.length ; i++){
                state.column_names_list.push(payload[i]);
            }
            state.selected_column = state.column_names_list
        },
        getselectedelemets(state, payload){
            state.selected_column = payload
            state.selected_column.sort((a,b) => {
                return a.ordinal_position-b.ordinal_position;
            })
        },
        submitrecommdationcolumndata(state){
            state.selected_column = state.Recommendation_view
            state.selected_column.sort((a,b) => {
                return a.ordinal_position-b.ordinal_position;
            })
        },
        submitmastercoulumndata(state){
            state.selected_column = state.Master_view
            state.selected_column.sort((a,b) => {
                return a.ordinal_position-b.ordinal_position;
            })
        },
        submitallcolumndata(state){
            state.selected_column = state.column_names_list;
        },
        resetallfeilds(state){
            state.company_name = "",
            state.modelid = [],
            state.operation_status = "",
            state.installation_status="",
            state.status_validation="",
            state.offer_type=""
        },
        getselectedrows(state, payload){
            state.selected_row = payload
        },
        initial_commit_forgenerateMOP(state){
            state.generateMOPtabledata = [];
        },
        generatemoptable(state, payload){
            state.generateMOPtabledata = payload
        },
        getminstartDatetime(state){
            state.minstartDatetime = new Date().toISOString().slice(0, -8);
        },
        getminendDatetime(state){
            state.minendDatetime = new Date().toISOString().slice(0, -8);
        },
        unSelectRows(state){
            state.selected_row = []
        },
        gotoCIreport(){
            router.push('/cireport')
        },
        onChangeSearchData(state, payload){
            state.searchdata = payload
            if(state.searchdata === ""){
                state.customer_CI_data_final_with_filter = state.customer_CI_data_final
            }
            else{
                state.customer_CI_data_final_with_filter = state.customer_CI_data_final.filter(item => {
                    return item.modelid.toLowerCase().includes(state.searchdata.toLowerCase()) || item.ipaddress.toLowerCase().includes(state.searchdata.toLowerCase())
                })
            }
        },
        // --------------- MOP mutation started  -------------------------------

        getMOPChangeRequestId(state, payload){
            state.MOPChangeRequestId = payload;
        },
        getMOPImplementationEngName(state, payload){
            state.MOPImplementationEngName = payload;
        },
        getMOPImplementationEngPhone(state, payload){
            state.MOPImplementationEngPhone = payload;
        },
        getMOPImplementationEngemail(state,payload){
            state.MOPImplementationEngEmail = payload;
        },
        getMOPprimeEngName(state,payload){
            state.MOPPrimeEngName = payload;
        },
        getMOPPrimeEngphone(state,payload){
            state.MOPPrimeEngphone = payload;
        },
        getMOPPrimeEngemail(state,payload){
            state.MOPPrimeEngemail = payload;
        },
        getMOPSDMName(state,payload){
            state.MOPSDMCSMname = payload;
        },
        getMOPSDMPhone(state,payload){
            state.MOPSDMCSMphone = payload;
        },
        getMOPSDMemail(state,payload){
            state.MOPSDMCSMemail = payload;
        },
        getMOPRMMangerName(state,payload){
            state.MOPManagerName = payload;
        },
        getMOPRMMangerPhone(state,payload){
            state.MOPManagerPhone = payload;
        },
        getMOPRMMangerEmail(state,payload){
            state.MOPManagerEmail = payload;
        },
        getMOPRMSenEngName(state,payload){
            state.MOPSeniorManagerName = payload;
        },
        getMOPRMSenEngPhone(state,payload){
            state.MOPSeniorManagerPhone = payload;
        },
        getMOPRMSenEngEmail(state,payload){
            state.MOPSeniorManagerEmail = payload;
        },
        getMOPCustomer1Name(state,payload){
            state.MOPCustomer1Name = payload;
        },
        getMOPCustomer1Phone(state,payload){
            state.MOPCustomer1Phone = payload;
        },
        getMOPCustomer1Email(state,payload){
            state.MOPCustomer1Email = payload;
        },
        getMOPCustomer2Name(state,payload){
            state.MOPCustomer2Name = payload;
        },
        getMOPCustomer2Phone(state,payload){
            state.MOPCustomer2Phone = payload;
        },
        getMOPCustomer2Email(state,payload){
            state.MOPCustomer2Email = payload;
        },
        getMOPCustomer3Name(state,payload){
            state.MOPCustomer3Name = payload;
        },
        getMOPCustomer3Phone(state,payload){
            state.MOPCustomer3Phone = payload;
        },
        getMOPCustomer3Email(state,payload){
            state.MOPCustomer3Email = payload;
        },
        getMOPChangeStartdatetime(state,payload){
            state.MOPStartdatetime = payload;
        },
        getMOPChangeEnddatetime(state,payload){
            state.MOPEnddatetime = payload;
        },
        getMOPEmailDestribution(state,payload){
            state.MOPEmailDistribution = payload;
        },
        getMOPBridgeDetails(state,payload){
            state.MOPBridgeDetails = payload;
        },

        Getdatatoexcel(state, payload){
            state.MOPgeneratedDatatoExcel = payload;
        }
        // --------------- MOP mutation Ended---------------------------------
    },
    actions: {
    // --------------------------Column names----------------------------------------
        async getcolumns_name(state){
            await axios.get('http://localhost:4000/app/getcoulmnnames')
            .then(getdata => {
                state.commit("GetCoulmnNames", getdata.data.data.rows);
            })
        },
    //-------------------------------------------------------------------------------

    // ------------------------- fetching all CI input data from API] --------------------------------------
        async getalloffer_type(state){
            await axios.get('http://localhost:4000/app/fetchOfferTypes')
            .then(response =>{
                state.commit("getalloffer_type", response.data.data);
            })
        },
        async getallcompanynames(state){
            await axios.get(`http://localhost:4000/app/fetchCompanies/${state.getters.offer_type.offertype}`)
            .then(response =>{
                state.commit("commitallcompanynames", response.data.data);
            })
        },
        async getallmodelids(state){
            await axios.get('http://localhost:4000/app/fetchModelIds') //http://10.133.103.121:8081/api/v1/ci/fetchModelIds
            .then(response =>{
                state.commit("getallmodelids", response.data.data);
            })
        },
        async getallinstallationstatus(state){
            await axios.get('http://localhost:4000/app/fetchInstallstatus')
            .then(response =>{
                state.commit("getallinstallationstatus", response.data.data);
            })
        },
        async getallstatusvalidation(state){
            await axios.get('http://localhost:4000/app/fetchStatusValidations')
            .then(response =>{
                state.commit("getallstatusvalidation", response.data.data);
            })
        },
        async getalloperationstatus(state){
            await axios.get('http://localhost:4000/app/fetchOperationalStatus')
            .then(response =>{
                state.commit("getalloperationstatus", response.data.data);
            })
        },
    // ----------------------------------------------------------------------------

    //  -----------------------Run query -----------------------------------------
        async dispatchcustomercireports(state, [company_name,modelid,operation_status,install_status,status_validation, offer_type]){
            state.commit("getIntialState");
            const customer_ci_data = {
                company_name: Object.keys(company_name).length > 0  ? company_name.company : "",
                modelid: modelid.map(obj => obj.modelid),
                operation_status: Object.keys(operation_status).length > 0 ? operation_status.operationalstatus : "",
                install_status: Object.keys(install_status).length > 0 ? install_status.installstatus: "",
                status_validation: Object.keys(status_validation).length > 0 ? status_validation.statusvalidation : "",
                offer_type: Object.keys(offer_type).length > 0 ? offer_type.offertype : ""
            }
            await axios.post('http://localhost:4000/app/getCustomerDetailsWithFilter',customer_ci_data)
            .then(response => {
                state.commit("getallcustomerCIreport", response.data.data);
            })
        },

    //----------------------------------------------------------------------------

    //  ----------------Excel data Generation------------------------------
        async GenerateExceldata(state, [rows, columns]){
            const exceldatarowcolumn = {
                row : rows,
                column: columns
            }
            await axios.post('http://localhost:4000/app/GenerateExcelData',exceldatarowcolumn)
            .then(response => {
                console.log(response);
            })
        },

    // ------------------------- Generate MOP -------------------------------    
        async GoToGenerateMop(state){
            state.commit("initial_commit_forgenerateMOP");
            await axios.post('http://localhost:4000/app/getselectedrowdata/', state.getters.selected_row)
            .then(response => {
                state.commit("generatemoptable", response.data.data.rows);
            })
        },
        getReadyForMopGenerate(state, [MOPChangeRequestId, MOPImplementationEngName, MOPImplementationEngPhone, 
            MOPImplementationEngEmail,MOPPrimeEngName, MOPPrimeEngphone, MOPPrimeEngemail, MOPSDMCSMname, MOPSDMCSMphone, MOPSDMCSMemail,
            MOPManagerName, MOPManagerPhone, MOPManagerEmail,MOPSeniorManagerName, MOPSeniorManagerPhone,MOPSeniorManagerEmail,
            MOPCustomer1Name, MOPCustomer1Phone, MOPCustomer1Email, MOPCustomer2Name, MOPCustomer2Phone, MOPCustomer2Email,
            MOPCustomer3Name, MOPCustomer3Phone,MOPCustomer3Email, MOPStartdatetime, MOPEnddatetime,MOPEmailDistribution,
            MOPBridgeDetails]){
            state.MOPgeneratedDatatoExcel = {
                selected_column_list: state.getters.Mopgenerationcolumn,
                ID: [
                    {
                        ChangeID: MOPChangeRequestId
                    }
                ],
                ImplementationEng: [
                    {
                        ImplementationEngName: MOPImplementationEngName
                    },
                    {
                        ImplementationEngPhone: MOPImplementationEngPhone
                    },
                    {
                        ImplementationEngEmail: MOPImplementationEngEmail
                    }
                ],
                PrimeEng: [
                    {
                        PrimeEngName: MOPPrimeEngName
                    },
                    {
                        PrimeEngphone: MOPPrimeEngphone
                    },
                    {
                        PrimeEngphone: MOPPrimeEngemail
                    }
                ],
                SDMCSM: [
                    {
                        SDMCSMname: MOPSDMCSMname
                    },
                    {
                        SDMCSMphone: MOPSDMCSMphone
                    },
                    {
                        SDMCSMemail: MOPSDMCSMemail
                    }
                ],
                Manager: [
                    {
                        ManagerName: MOPManagerName
                    },
                    {
                        ManagerPhone: MOPManagerPhone
                    },
                    {
                        ManagerEmail: MOPManagerEmail
                    }
                ],
                SeniorManager: [
                    {
                        SeniorManagerName: MOPSeniorManagerName
                    },
                    {
                        SeniorManagerPhone: MOPSeniorManagerPhone
                    },
                    {
                        SeniorManagerEmail: MOPSeniorManagerEmail
                    }
                ],
                Customer1: [
                    {
                        Customer1Name: MOPCustomer1Name
                    },
                    {
                        Customer1Phone: MOPCustomer1Phone
                    },
                    {
                        Customer1Email: MOPCustomer1Email
                    }
                ],
                Customer2: [
                    {
                        Customer2Name: MOPCustomer2Name
                    },
                    {
                        Customer2Phone: MOPCustomer2Phone
                    },
                    {
                        Customer2Email: MOPCustomer2Email
                    }
                ],
                Customer3: [
                    {
                        Customer3Name: MOPCustomer3Name
                    },
                    {
                        Customer3Phone: MOPCustomer3Phone
                    },
                    {
                        Customer3Email: MOPCustomer3Email
                    }
                ],
                Startdate: [
                    {
                        Startdatetime: MOPStartdatetime
                    }
                ],
                EndData: [
                    {
                        Enddatetime: MOPEnddatetime
                    }
                ],
                EmailDest: [
                    {
                        EmailDistribution: MOPEmailDistribution
                    }
                ],
                BridgeDeta: [
                    {
                        MOPBridgeDetails: MOPBridgeDetails
                    }
                ],
            }
            state.commit("Getdatatoexcel", state.MOPgeneratedDatatoExcel);
        }
    // -------------------------------------------------------------------------
        
    },
    modules: {},
    router,
    getters: {
        company_name: state => state.company_name,
        modelid: state => state.modelid,
        operation_status :state => state.operation_status,
        installation_status: state => state.installation_status,
        status_validation: state => state.status_validation,
        offer_type: state => state.offer_type,
        company_name_list: state => state.company_name_list,
        modelid_list: state => state.modelid_list,
        operation_status_list: state => state.operation_status_list,
        installation_status_list: state => state.installation_status_list,
        status_validation_list: state => state.status_validation_list,
        offer_type_list: state => state.offer_type_list,
        column_names_list: state => state.column_names_list,
        firtstHalf : state => state.firtstHalf,
        secondaHalf: state => state.secondaHalf,
        pageOptions: state => state.pageOptions,
        customer_CI_data_final : state => state.customer_CI_data_final,
        Customer_CI_reportFlag: state => state.Customer_CI_reportFlag,
        columnMapping: state => state.columnMapping,
        selected_column: state => state.selected_column,
        selected_row: state => state.selected_row,
        searchdata: state => state.searchdata,
        Mopgenerationcolumn: state => state.Mopgenerationcolumn,
        generateMOPtabledata: state => state.generateMOPtabledata,
        minstartDatetime: state => state.minstartDatetime,
        minendDatetime: state => state.minendDatetime,
        
        customer_CI_data_final_with_filter: state => state.customer_CI_data_final_with_filter,
        // MOP region
        MOPgeneratedDatatoExcel: state => state.MOPgeneratedDatatoExcel,
        MOPChangeRequestId: state => state.MOPChangeRequestId,
        MOPImplementationEngName: state => state.MOPImplementationEngName,
        MOPImplementationEngPhone: state => state.MOPImplementationEngPhone,
        MOPImplementationEngEmail: state => state.MOPImplementationEngEmail,
        MOPPrimeEngName: state => state.MOPPrimeEngName,
        MOPPrimeEngphone: state => state.MOPPrimeEngphone,
        MOPPrimeEngemail: state => state.MOPPrimeEngemail,
        MOPSDMCSMname: state => state.MOPSDMCSMname,
        MOPSDMCSMphone: state => state.MOPSDMCSMphone,
        MOPSDMCSMemail: state => state.MOPSDMCSMemail,
        MOPManagerName: state => state.MOPManagerName,
        MOPManagerPhone: state => state.MOPManagerPhone,
        MOPManagerEmail: state => state.MOPManagerEmail,
        MOPSeniorManagerName: state => state.MOPSeniorManagerName,
        MOPSeniorManagerPhone: state => state.MOPSeniorManagerPhone,
        MOPSeniorManagerEmail: state => state.MOPSeniorManagerEmail,
        MOPCustomer1Name: state => state.MOPCustomer1Name,
        MOPCustomer1Phone: state => state.MOPCustomer1Phone,
        MOPCustomer1Email: state => state.MOPCustomer1Email,
        MOPCustomer2Name: state => state.MOPCustomer2Name,
        MOPCustomer2Phone: state => state.MOPCustomer2Phone,
        MOPCustomer2Email: state => state.MOPCustomer2Email,
        MOPCustomer3Name: state => state.MOPCustomer3Name,
        MOPCustomer3Phone: state => state.MOPCustomer3Phone,
        MOPCustomer3Email: state => state.MOPCustomer3Email,
        MOPStartdatetime: state => state.MOPStartdatetime,
        MOPEnddatetime: state => state.MOPEnddatetime,
        MOPEmailDistribution: state => state.MOPEmailDistribution,
        MOPBridgeDetails: state => state.MOPBridgeDetails
    }
});