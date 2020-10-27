const info = new Vue({
    el: '#info',
    data: {
        interest_type: "",
        interests: [
            { name: "Simple", value: "1" },
            { name: "Compuesto", value: "2" }
        ],
        initial_capital: "",
        money_initialCapital: "",
        tasa: "",
        time_interest: [
            { name: "Anual", value: 1, days: 360 },
            { name: "Semestral", value: 2, days: 180 },
            { name: "Cuatrimestral", value: 3, days: 120 },
            { name: "Trimestral", value: 4, days: 90 },
            { name: "Bimestral", value: 5, days: 60 },
            { name: "Mensual", value: 6, days: 30 },
            { name: "Bimensual", value: 7, days: 15 },
            { name: "Semanal", value: 8, days: 7 },
            { name: "Diario", value: 9, days: 1 },
        ],
        timeTasa: "",
        time: "",
        unit_time: "",
        meses_años: "",
        meses: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
        ],
        time_frecuency: "",
        pagos: "0",
        tasa_equivalente: 0,
        capital_final: 0,
        table: []
    },
    methods: {
        simple() {
            this.validacion();

            var periodo = parseInt(this.pagos, 10);
            var interes = parseFloat(this.tasa_equivalente);
            var capitalInicial = parseFloat(this.initial_capital);
            var interes_acumulado = 0
            var capitalFinal = 0
            var table = []

            for (let i = 0; i <= periodo; i++) {

                if (i == 0) {
                    var interes_row = 0;
                } else {
                    var interes_row = capitalInicial * (interes / 100);
                }
                interes_acumulado += interes_row;
                capitalFinal = capitalInicial + interes_acumulado;
                let row = { periodo: i, capitalI: capitalInicial, intereses: interes_row, capitalF: capitalFinal }

                table.push(row);
            }
            this.capital_final = capitalFinal;
            this.table = table;


        },
        compuesto() {
            this.validacion();

            var periodo = parseInt(this.pagos, 10);
            var interes = parseFloat(this.tasa_equivalente);
            var capitalInicial = parseFloat(this.initial_capital);
            var capitalFinal = 0

            var table = []

            for (let i = 0; i <= periodo; i++) {
                if (i == 0) {
                    var interes_row = 0;
                } else {
                    var interes_row = capitalInicial * (interes / 100);
                }

                capitalFinal = capitalInicial + interes_row;
                let row = { periodo: i, capitalI: capitalInicial, intereses: interes_row, capitalF: capitalFinal }
                table.push(row);
                capitalInicial = capitalFinal;
            }

            this.capital_final = capitalFinal;
            this.table = table;

        },
        validacion() {
            if (this.meses_años != "") {
                var division = ((this.time_interest[this.unit_time - 1].days + (this.meses_años * 30)) / this.time_interest[this.timeTasa - 1].days)
            } else {
                var division = (this.time_interest[this.unit_time - 1].days / this.time_interest[this.timeTasa - 1].days)
            }
            this.tasa_equivalente = parseFloat(this.tasa) * division;
            this.pagos = this.time

            if (this.time_frecuency != "") {
                if (this.meses_años != "") {
                    console.log("conmeses")
                    var division2 = (this.time_interest[this.unit_time - 1].days  / this.time_interest[this.time_frecuency - 1].days)
                    let año_suma = this.time * division2;
                    let transformacion = ((this.meses_años * 30) / (this.time_interest[this.time_frecuency -1].days))
                    this.pagos = año_suma + transformacion;
                    
                } else {
                    console.log("sinmeses")
                    var division2 = (this.time_interest[this.unit_time - 1].days / this.time_interest[this.time_frecuency - 1].days)
                    this.pagos = this.time * division2;
                }
                var division = (this.time_interest[this.time_frecuency - 1].days / this.time_interest[this.timeTasa - 1].days)
                this.tasa_equivalente = parseFloat(this.tasa) * division;
            }
        },
        submit() {
            if (this.initial_capital != 0 && this.money_initialCapital != 0 && this.tasa != 0 && this.timeTasa != 0 && this.time != 0 && this.unit_time != 0) {
                if (this.interest_type == 1) {
                    this.simple();
                } else if (this.interest_type == 2) {
                    this.compuesto();
                }
            } else{
                alert("Debe llenar los campos minimos (aquellos que tienen '*')")

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
    var instances1 = M.FormSelect.init(elems);   
    
    var modal = document.querySelectorAll('.modal');
    var instances = M.Modal.init(modal);
}

//Permitir solo escribir numeros y puntos
function isNumber(e) {
    e = e || window.event;
    var charCode = e.which ? e.which : e.keyCode;
    return /^[0-9]*\.?[0-9]*$/.test(String.fromCharCode(charCode));
}