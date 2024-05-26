<template>
    <modal :title="renderTitle" :show="showModal" @close="closeModal">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-control-label" for="name">Name</label>
                    <input type="text" class="form-control form-control-alternative" id="name" v-model="data.name"
                        placeholder="Enter name" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input type="email" class="form-control form-control-alternative" id="email" v-model="data.email"
                        placeholder="Enter email" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-control-label" for="phone">Phone</label>
                    <input type="text" class="form-control form-control-alternative" id="phone" v-model="data.phone"
                        placeholder="Enter phone" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-control-label" for="address">Address</label>
                    <input type="text" class="form-control form-control-alternative" id="address" v-model="data.address"
                        placeholder="Enter address" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-control-label" for="country">Country</label>
                    <input type="text" class="form-control form-control-alternative" id="country" v-model="data.country"
                        placeholder="Enter country" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-control-label" for="starting_year">Starting Year</label>
                    <input type="text" class="form-control form-control-alternative" id="starting_year"
                        v-model="data.starting_year" placeholder="Enter starting year" />
                </div>
            </div>
            <div class="col-md-6" v-if="!isEdit">
                <div class="form-group">
                    <label class="form-control-label" for="branch_user_firstname">Branch Firstname</label>
                    <input type="text" class="form-control form-control-alternative" id="firstname"
                        v-model="data.branch_user_firstname" placeholder="Enter Branch Firstname" />
                </div>
            </div>
            <div class="col-md-6" v-if="!isEdit">
                <div class="form-group">
                    <label class="form-control-label" for="branch_user_lastname">Branch Lastname</label>
                    <input type="text" class="form-control form-control-alternative" id="lastname"
                        v-model="data.branch_user_lastname" placeholder="Enter Branch Lastname" />
                </div>
            </div>
            <div class="col-md-6" v-if="!isEdit">
                <div class="form-group">
                    <label class="form-control-label" for="branch_user_email">Branch Email</label>
                    <input type="text" class="form-control form-control-alternative" id="branchEmail"
                        v-model="data.branch_user_email" placeholder="Enter Branch Email" />
                </div>
            </div>
        </div>
        <template v-slot:actions>
            <button-cta 
                class="btn btn-default" 
                @click="handleSubmit" 
                label="Create Branch" 
                :isBusy="isLoading"
                :disabled="!isFormValid"
            ></button-cta>
        </template>
    </modal>
</template>

<script>
import Modal from "@/components/modal/Modal";
import ButtonCta from "@/components/Button/ButtonCta";

export default {
    components: {
        Modal,
        ButtonCta
    },
    data() {
        return {
            isLoading: false,
            data: {
                name: "",
                phone: "",
                email: "",
                address: "",
                starting_year: "",
                country: "",
                branch_user_email: "",
                branch_user_firstname: "",
                branch_user_lastname: ""
            }
        };
    },
    props: {
        showModal: {
            type: Boolean,
            default: false
        },
        closeModal: {
            type: Function,
            default: () => { }
        },
        save: {
            type: Function,
            default: () => { }
        },
        edit: {
            type: Function,
            default: () => { }
        },
        branchData: {
            type: Object,
            default: () => { }
        },
        isEdit: {
            type: Boolean,
            default: false
        },
        institutionId: {
            type: String,
        }
    },
    watch: {
        branchData() {
            this.data = {
                name: this.branchData.name,
                phone: this.branchData.phoneNumber,
                email: this.branchData.email,
                address: this.branchData.address,
                starting_year: this.branchData.starting_year,
                country: this.branchData.country,
                branch_user_email: this.branchData.branch_user_email,
                branch_user_firstname: this.branchData.branch_user_firstname,
                branch_user_lastname: this.branchData.branch_user_lastname
            };
        }
    },
    computed: {
        isFormValid() {
            return (
                this.data.name &&
                this.data.phone &&
                this.data.email &&
                this.data.address &&
                this.data.starting_year &&
                this.data.country 
            );
        },
        renderTitle() {
            return this.isEdit
                ? `Edit ${this.data.name}`
                : "New Institution Branch";
        },
        renderBtnLabel() {
            return this.isEdit ? "Edit" : "Save";
        }
    },
    methods: {
        async handleSubmit() {
            this.isLoading = true;
            const data = {
                instiution_uuid: this.institutionId,
                name: this.data.name,
                phoneNumber: this.data.phone,
                email: this.data.email,
                address: this.data.address,
                starting_year: this.data.starting_year,
                country: this.data.country,
                branch_user_email: this.data.branch_user_email,
                branch_user_firstname: this.data.branch_user_firstname,
                branch_user_lastname: this.data.branch_user_lastname
            };
            this.isEdit ? await this.edit(data) : await this.save(data);
            setTimeout(() => {
                this.isLoading = false;
            }, 2000);
        }
    }
};

</script>
