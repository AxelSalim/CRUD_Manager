const STUDENTDB = "StudentDB"

// retourner la base de donnée locale
function getLocalDB() {
    if(!localStorage.getItem(STUDENTDB)) {
        localStorage.setItem(STUDENTDB, JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem(STUDENTDB))
}

// mettre à jour la BD
function updateDB(db) {
    localStorage.setItem(STUDENTDB, JSON.stringify(db))
}

// ajout d'un étudiant
function addStudent(student) {
    const db = getLocalDB()
    student.id = Date.now()+"";
    db.push(student)
    updateDB(db)
}


// function pour mettre à jour l'étudiant
function updateStudent(student) {
    const db = getLocalDB()

    const updatedDb = db.map(function(curStudent) {
        if(curStudent.id == student.id) {
            return {
                nom: student.nom,
                prenom: student.prenom,
                dateNaissance: student.dateNaissance,
                niveauScolaire: student.niveauScolaire,
                id: student.id
            }
        }
        return curStudent
    })

    updateDB(updatedDb)
}

// supprimer un étudiant
function deleteStudent(student) {
    const db = getLocalDB()
    const updatedDb = db.filter(function(curStudent) {
        return curStudent.id != student.id
    })

    updateDB(updatedDb)
}

// récupérer un étudiant par rapport à son id
function getStudent(id) {
    const db = getLocalDB()
    var student = db.filter((data)=> data.id == id)

    
    if (filteredDB.length > 0) {
        return filteredDB[0]
    }
    return null
}


// recherche un étudiant 
function searchStudentByName(name) {
    const db = getLocalDB()
    const filteredDb = db.filter((data) => {
        return data.nom.toLowerCase().includes(name.ToLowerCase()) || data.prenom.toLowerCase().includes(name.ToLowerCase())
    })

    return filteredDb
}
