Vue.component('alert', {
  props: ['alert'],
  template: `
<div>
  <b-alert :dismissible="alert.dismissable ? true : false" show :variant="alert.variant">{{ alert.message }}</b-alert>
</div>
  `,
  data: function () {
    return {
      
    }
  }
});

window.app = new Vue({
  el: "#app",
  data: {
      alerts: [
        { variant: 'danger', message: 'Hark, an error message!' },
        { variant: 'success', message: 'This, on the other hand, is a success message.' },
        { variant: 'warning', message: 'Lastly, a warning message.' },
         { variant: 'primary', message: 'Just your friendly neighborhood alert message.', dismissable: true }
      ]
    }
});