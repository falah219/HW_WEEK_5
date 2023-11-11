class Pendaftar {
    constructor(nama, umur, uangsangu) {
        this.nama = nama;
        this.umur = umur;
        this.uangsangu = uangsangu;
    }
}

class DataPendaftar {
    constructor() {
        this.dataPendaftar = [];
    }

    async setPendaftar(pendaftar) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.dataPendaftar.push(pendaftar);
                this.saveData();
                resolve();
            }, 1000); 
        });
    }
    

    // setPendaftar(pendaftar) {
    //     this.dataPendaftar.push(pendaftar);
    //     this.saveData();
    // }

    getPendaftar() {
        return this.dataPendaftar;
    }

    averageUmur() {
        let totalUmur = 0 ;
        for (let index = 0; index < this.dataPendaftar.length; index++) {
            totalUmur += this.dataPendaftar[index].umur;
        } 
        const avgUmur = totalUmur / this.dataPendaftar.length;
        return avgUmur
    }

    averageUangSangu() {
        let totalUangSangu = 0 ;
        for (let index = 0; index < this.dataPendaftar.length; index++) {
            totalUangSangu += this.dataPendaftar[index].uangsangu;
        } 
        const avgUangSangu = totalUangSangu / this.dataPendaftar.length;

        console.log(this.dataPendaftar[0].uangsangu);
        return avgUangSangu
    }

    saveData() {
        localStorage.setItem("dataPendaftar", JSON.stringify(this.dataPendaftar));
    }

    loadData() {
        const data = localStorage.getItem("dataPendaftar");
        if (data) {
            this.dataPendaftar = JSON.parse(data);
        }
    }
}


const dataPendaftar = new DataPendaftar();

document.addEventListener("DOMContentLoaded", function () {
    dataPendaftar.loadData();
    updateTable();
    displayAverage();
});

function submitForm(e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const umur = parseInt(document.getElementById("umur").value);
    const uangsangu = parseInt(document.getElementById("uangsangu").value);

    if (nama.length < 10) {
        alert("Harap isi form nama dengan benar!");
        return;
    }

    else if(umur < 25){
        alert("Harap isi form umur dengan benar!");
        return;
    }

    else if(uangsangu < 100000 || uangsangu > 1000000){
        alert("Harap isi form uang sangu dengan benar!");
        return;
    }

    const pendaftarBaru = new Pendaftar(nama, umur, uangsangu);
    dataPendaftar.setPendaftar(pendaftarBaru);

    document.getElementById("registrationForm").reset();
    updateTable();
    displayAverage();
}

function updateTable() {
    const table = document.getElementById("pendaftarTable");

    dataPendaftar.getPendaftar().forEach(pendaftar => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.innerHTML = pendaftar.nama;
        cell2.innerHTML = pendaftar.umur;
        cell3.innerHTML = pendaftar.uangsangu;
    });
}

function displayAverage() {
    const avgUangSangu = dataPendaftar.averageUangSangu();
    const avgUmur = dataPendaftar.averageUmur();
    console.log(avgUmur);

    const resume = document.getElementById("resume");
    resume.innerText = `Rata-rata pendaftar memiliki uang sangu sebesar ${avgUangSangu} dengan rata-rata umur ${avgUmur}`;
}





