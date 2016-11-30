<template>
    <i :class="classIcon"></i>
</template>

<script>
export default{
    props:{
        i: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: "el"
        },
        addon: {
            type: String,
            default: "zmdi-hc-lg"
        }
    },
    data(){
        return{
            listClass: {
                el: "el-icon-__ICON__",
                mdi: "zmdi zmdi-__ICON__"
            }
        }
    },
    computed:{
        classIcon(){
            var icon = new Array;

            try{
                 icon.push(this.listClass[this.type].replace('__ICON__', this.i))
            }catch(e){
                window.console.warn(e)
            }

            if(this.type === 'mdi') icon.push(this.addon)

            return icon;
        }
    }
}
</script>
