export default {
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    handleClick() {
      this.$router.push('/connexion');
      
    },
    reserver() {
      this.$router.push('/reserver');
      
    },
    goToAccount() {
      this.$router.push('/account');
      window.location.reload();
    },
    logout() {
      localStorage.removeItem('token');
      window.location.reload();
      this.$router.push('/');
      
    }
  }
}
