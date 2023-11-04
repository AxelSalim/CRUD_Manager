const checkIfEmptyValue = (obj) => {
    let isEpmty = false;
    for (const prop in obj) {
        if (obj[prop] == "") {
            isEpmty = true;
        }
    }
    return isEpmty
}

const showSuccessMessage = (message) => {
    swal.fire({
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
    })
}

const showErrorMessage = (message) => {
    swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        timer: 1500
    })
}

const students = getLocalDB();

const App = {
    // On définie ici les variables qu'on utilisera 
    data() {
        return {
            showHome: false,
            showCreateForm: false,
            showStudentsList: false,
            etudiants: students,
            message: "yo",
            newStudent: {
                nom: "", 
                prenom: "",
                dateNaissance: "", 
                niveauScolaire: "",
            },
        }
    }, 

    mounted() {
        this.changeNavigationState("create");
        this.changeNavigationState("list");
    },

    methods: {
        goToHome() {
            this.changeNavigationState("home")
            this.etudiants = this.students
        },
        goToCreateForm() {
            this.changeNavigationState("create")
        },
        goToStudentsList() {
            this.changeNavigationState("list")
            this.etudiants = this.students
            console.log(etudiants[0]);
        },
        submitStudent(){                
            if (!checkIfEmptyValue(this.newStudent)) {

                if(!checkIfStudentExist(this.newStudent.nom, this.newStudent.prenom)) {
                    
                    addStudent(this.newStudent)
                    this.newStudent = {
                        nom: "", 
                        prenom: "",
                        dateNaissance: "", 
                        niveauScolaire: "",
                    }
                    showSuccessMessage("Etudiant ajouté avec succès")
                } else {
                    showErrorMessage("Cet Etudiant est déjà inscrit")
                }
            } else {
                showErrorMessage("Veuillez remplir tous les chams")
            }
        },
        // students(){
        //     const storageData = localStorage.getItem(getLocalDB())

        //     if(storageData) {
        //         etudiants = JSON.parse(storageData)
        //     }
        // },
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