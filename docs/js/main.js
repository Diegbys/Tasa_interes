const info = new Vue({
    el: '#info',
    data: {
        interest_type: "",
        interests: [{
                name: "Simple",
                value: "1"
            },
            {
                name: "Compuesto",
                value: "2"
            }

        ],
        initial_capital: "",
        money_initialCapital: "",
        tasa: "",
        time_interest: [
            { name: "Anual", value: "1" },
            { name: "Semestral", value: "2" },
            { name: "Cuatrimestral", value: "3" },
            { name: "Trimestral", value: "4" },
            { name: "Bimestral", value: "5" },
            { name: "Mensual", value: "6" },
            { name: "Bimensual", value: "7" },
            { name: "Semanal", value: "8" },
            { name: "Diario", value: "9" },
        ],
        timeTasa: "",
        time: "",
        unit_time: "",
        meses_años: "",
        meses: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
        ],
        frecuency: "",
        time_frecuency: "",
        pagos: "0",
        tasa_equivalente: "0",
        table: []
    },
    methods: {
        simple() {

            this.validacion();

            var periodo = parseInt(this.pagos, 10);
            var interes = parseFloat(this.tasa_equivalente);
            var capitalInicial = parseFloat(this.initial_capital);
            var interes_acumulado = 0

            var table = []

            for (let i = 0; i <= periodo; i++) {

                if (i == 0) {
                    var interes_row = 0;
                } else {
                    var interes_row = capitalInicial * (interes / 100);
                }
                interes_acumulado += interes_row;
                let capitalFinal = capitalInicial + interes_acumulado;
                let row = { periodo: i, capitalI: capitalInicial, intereses: interes_row, capitalF: capitalFinal }

                table.push(row);
            }

            this.table = table;


        },
        compuesto() {
            this.validacion();

            var periodo = parseInt(this.pagos, 10);
            var interes = parseFloat(this.tasa_equivalente);
            var capitalInicial = parseFloat(this.initial_capital);

            var table = []

            for (let i = 0; i <= periodo; i++) {
                if (i == 0) {
                    var interes_row = 0;
                } else {
                    var interes_row = capitalInicial * (interes / 100);
                }

                let capitalFinal = capitalInicial + interes_row;
                let row = { periodo: i, capitalI: capitalInicial, intereses: interes_row, capitalF: capitalFinal }
                table.push(row);
                capitalInicial = capitalFinal;
            }

            this.table = table;

        },
        validacion() {
            //Cuando el año es igual
            if (this.timeTasa == this.unit_time) {
                if (this.meses_años == "") {
                    this.pagos = this.time;
                    this.tasa_equivalente = this.tasa;
                } else {
                    this.tasa_equivalente = this.tasa / 12;
                    this.pagos = (this.time * 12) + parseInt(this.meses_años, 10);;
                }
            }
            //Interes anual
            if (this.timeTasa == "1" && this.unit_time != "1") {
                this.pagos = this.time;
                if (this.unit_time == "2") { this.tasa_equivalente = this.tasa / 2 } //tiempo semestre
                if (this.unit_time == "3") { this.tasa_equivalente = this.tasa / 3 } //tiempo cuatrimestral
                if (this.unit_time == "4") { this.tasa_equivalente = this.tasa / 4 } //tiempo trimestral
                if (this.unit_time == "5") { this.tasa_equivalente = this.tasa / 6 } //tiempo Bimestral
                if (this.unit_time == "6") { this.tasa_equivalente = this.tasa / 12 } //tiempo mensual
                if (this.unit_time == "7") { this.tasa_equivalente = this.tasa / 24 } //tiempo bimensual
                if (this.unit_time == "8") { this.tasa_equivalente = this.tasa / 52.1429 } //tiempo semanal
                if (this.unit_time == "9") { this.tasa_equivalente = this.tasa / 365 } //tiempo diario
            }

            //Interes Semestral
            if (this.timeTasa == "2" && this.unit_time != "2") {
                if (this.unit_time == "1") {
                    this.tasa_equivalente = this.tasa;
                    this.pagos = this.time * 2;
                }
                if (this.unit_time == "3") {
                    this.tasa_equivalente = this.tasa / 6;
                    this.pagos = this.time * 4;
                }
                if (this.unit_time == "4" || this.unit_time == "5" || this.unit_time == "6" || this.unit_time == "7" || this.unit_time == "8" || this.unit_time == "9") {
                    this.pagos = this.time;
                    if (this.unit_time = "4") { this.tasa_equivalente = this.tasa / 2 }
                    if (this.unit_time = "5") { this.tasa_equivalente = this.tasa / 3 }
                    if (this.unit_time = "6") { this.tasa_equivalente = this.tasa / 6 }
                    if (this.unit_time = "7") { this.tasa_equivalente = this.tasa / 12 }
                    if (this.unit_time = "8") { this.tasa_equivalente = this.tasa / 12 }
                }
            }
        },
        submit() {
            console.log("se envio")
            if (this.initial_capital != 0 && this.money_initialCapital != 0 && this.tasa != 0 && this.timeTasa != 0 && this.time != 0 && this.unit_time != 0) {
                if (this.interest_type == 1) {
                    this.simple();
                } else if (this.interest_type == 2) {
                    this.compuesto();
                }
            }
        }

    },
    updated() {
        materialize_builder();
        if (this.unit_time != 1) {
            this.meses_años = 0
        }


    }
})

//Para materialize
document.addEventListener('DOMContentLoaded', function() {
    materialize_builder();
});

function materialize_builder() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
}

//Permitir solo escribir numeros y puntos
function isNumber(e) {
    e = e || window.event;
    var charCode = e.which ? e.which : e.keyCode;
    return /^[0-9]*\.?[0-9]*$/.test(String.fromCharCode(charCode));
}