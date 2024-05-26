<template>
  <div class="row">
    <div class="col-md-12">
        <ul class="nav nav-pills " v-show="false" >
            <li @click="selectTab(index)"  class="nav-item step-item" :class="tab.props.selected ? 'active' : 'in-active'" v-for="(tab, index) in tabs" v-bind:key="`tab-${index}`">
                <a :class=" tab.props.selected ? 'nav-link  active' : 'nav-link  n-active' "  href="#">
                        <!-- <span class="tabStatus">{{index+1}} </span>  -->
                        <span class="tabLabel">{{tab.props.title}}</span>
                </a>
            </li>
        </ul>
       
    </div>
    <div class="col-md-12 text-center" style="z-index:0;">
        <ul id="progressbar">
           <li  v-for="(tab, index) in tabs" v-bind:key="`tab-${index}`" :id="'tab-'+index" :class="index==0? 'active':'item'">
              <span>{{tab.props.title}}</span>  
           </li>
        </ul>
    </div>
    
    <div class="col-md-12">
         <form>
            <slot></slot>
         </form>
    </div>
    <div class="col-md-12">
         <div id="step_error" class="text-danger"></div>
    </div>
    <div class="col-md-12 mt-2">
          <div class="btn-group" role="group">
                <button @click="previousTab" :disabled="currentTab === 0" class="btn btn-default mr-2">Previous</button>
                <button @click="nextTab" :disabled="currentTab == totalTabs - 1" v-if="currentTab < totalTabs - 1"  class="btn btn-default">Next</button>
                <button @click="onSubmit" v-if="currentTab === totalTabs - 1" class="btn btn-default">Submit</button>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormWizard',
  props:{
        validation: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            tabs: [],
            currentTab : 0,
            totalTabs : 0,
            storeState: this.$store.state,
           
        }
    },
    watch:{
       validation(){
         console.log(this.validation,"TEST VALID")
       }
    },

    methods:{
        previousTab(){
           
            this._switchTab(this.currentTab - 1);
        },

        nextTab(){
            if(this._validateCurrentTab()===true){
                this._switchTab(this.currentTab + 1);    
            }   
        },
        selectTab(index){
            if(index < this.currentTab){
              this._switchTab(index);
            }

            if(this._validateCurrentTab() === false){
                return;
            }

            this._switchTab(index);
            
        },


        onSubmit(){
            if(this._validateCurrentTab() === false)
                return;
            this.$emit('on-complete');
        },

        _switchTab(index){
            //Disable all tabs
            this.tabs.forEach(tab => {
              tab.props.selected = false;
            });

            this.currentTab = index;
            this.tabs[index].props.selected = true;
           
            this.$slots.default()[index].props.selected=true
            this.$emit("on-select",index)
            this.apply_active()
            this.apply_inactive()
            document.getElementById("step_error").innerText=""

            //  console.log(this.$slots.default()[index].children.default())
        },

        _validateCurrentTab(){
          
            if(this.validation[this.currentTab].invalid){
                this.$emit("on-error","Please fill all required fields on the current stage")
                document.getElementById("step_error").innerText="Please fill all required fields on the current stage"
                return false
            }else{
                  return true;
            }
          
        },
        apply_active:function(){
           
           for (let i =this.currentTab; i >0; i--) {
              
               document.getElementById("tab-"+i).classList.add("active")
           }
        },
        apply_inactive:function(){
           for (let i =this.currentTab+1; i <this.validation.length; i++) {   
               document.getElementById("tab-"+i).classList.remove("active")
           }
        }
        
    },
   
    mounted(){
            
            this.tabs = this.$slots.default();
            this.totalTabs = this.tabs.length;
            this.currentTab = this.tabs.findIndex((tab) => tab.props.selected === true);
            if(this.currentTab === -1 && this.totalTabs > 0){  
                this.tabs[0].props.selected = true;
                this.currentTab = 0;
            }
    },
}
</script>

<style>

</style>