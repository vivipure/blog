import { Directive } from "vue";

const loading: Directive = {
  mounted(el, binding) {
      console.log(el)
  },
  updated(el, binding) {
     console.log(binding.value) 
  }
};

export default loading