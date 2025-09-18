module.exports = {
    "esmaVersion": "latest",
    rules:{
        'reacr-hooks/exhaustive-deps': 'off'
    }
}

function App(){
  const [keycloak,setKeycloak] = useState(null)

  useEffect(() =>{
    const initKeycloak = async() => {
      const keycloakInstance = new Keycloak(keycloakOptions)
      try {
        await keycloakInstance.init({onLoad: 'login-required'})
        setKeycloak(keycloakInstance)
        if(keycloakInstance.authenticated){
          console.log(keycloakInstance);          
        }
      }catch (error){
        console.log(error);
      }
    }
    initKeycloak()
  },[])
}