const checkIfEmptyValue = (obj) => {
    let isEpmty = false;
    for (const prop in obj) {
        if (obj[prop] == "") {
            isEpmty = true;
        }
    }
    return isEpmty
}

const App = {
    // On définie ici les variables qu'on utilisera 
    data() {
        return {
            showHome: false,
            showCreateForm: false,
            showStudentsList: false,
            newStudent: {
                nom: "", 
                prenom: "",
                dateNaissance: "", 
                niveauScolaire: "",
            }
        }
    }, 

    mounted() {
        this.changeNavigationState("create"); 
    },

    methods: {
        goToHome() {
            this.changeNavigationState("home")
        },
        goToCreateForm() {
            this.changeNavigationState("create")
        },
        goToStudentsList() {
            this.changeNavigationState("list")
        },
        submitStudent(){                
            if (!checkIfEmptyValue(this.newStudent)) {
                addStudent(this.newStudent)
                console.log("Etudiant ajouté avec succès");                
            } else {

            }
        },
        changeNavigationState(destination) {
            this.showCreateForm = false
            this.showHome = false 
            this.showStudentsList = false

            switch (destination) {
                case "home":
                    this.showHome = true
                    break;
                case "create":
                    this.showCreateForm = true
                    break;
                case "list":
                    this.showStudentsList = true
                    break;
            
                default:
                    this.showHome = true
                    break;
            }
        }, 
        
    },
}

Vue.createApp(App).mount("#app");