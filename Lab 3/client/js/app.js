var app = new Vue({
    el: '#hamming-encoder',
    data: {
        dataBits: [],
        status: '',
        numberOfDataBits: 4
    },
    created: function () {
        this.initDataBits(4);
    },
    methods: {
        initDataBits: function(){
            this.dataBits=[];
            
            for(var i=0;i<this.numberOfDataBits;i++){
                var bit = { data: null };
                this.dataBits.push(bit);
            }
        },
        send: function () {
            if (this.validate(this.dataBits) === true){
                var encodedMessage = this.encode(this.dataBits);
                // this.status = encodedMessage + ' encoded sent to server';

                return axios.put("http://localhost:3000/message", {bits: encodedMessage}).then(
                    response => (this.status = response.data)
                );
            } else {
                this.status = 'Input is not valid. Please use 0 or 1 as data bit values';
            }
        },
        encode: function(bits){
            // This function must be changed to allow any number of data bits
            // Right now it only works for 4 data bits
            // This function must be changed to allow any number of data bits
            // Right now it only works for 4 data bits
            if(bits.length === 4)
            {
                var c4=this.parity(parseInt(bits[1].data)+parseInt(bits[2].data)+parseInt(bits[3].data)); // se calculeaza bitul de control de pe pozitia 4
                var c2=this.parity(parseInt(bits[0].data)+parseInt(bits[2].data)+parseInt(bits[3].data)); // se calculeaza bitul de control de pe pozitia 2
                var c1=this.parity(parseInt(bits[0].data)+parseInt(bits[1].data)+parseInt(bits[3].data)); // se calculeaza bitul de control de pe pozitia 1
                var c0=this.parity(parseInt(bits[0].data)+parseInt(bits[1].data)+parseInt(bits[2].data)+parseInt(bits[3].data)+c1+c2+c4);
                console.log("Parity bit: "+c0);
                console.log("Control bits: "+c1+","+c2+","+c4);
                return [c0,c1,c2,parseInt(bits[0].data),c4,parseInt(bits[1].data),parseInt(bits[2].data),parseInt(bits[3].data)]; // vectorul V (cuvantul de transmis)
            }
            else
            {
                var c8=this.parity(parseInt(bits[4].data)+parseInt(bits[5].data)+parseInt(bits[6].data)+parseInt(bits[7].data)); // se calculeaza bitul de control de pe pozitia 8
                var c4=this.parity(parseInt(bits[1].data)+parseInt(bits[2].data)+parseInt(bits[3].data)+parseInt(bits[8].data)); // se calculeaza bitul de control de pe pozitia 4
                var c2=this.parity(parseInt(bits[0].data)+parseInt(bits[2].data)+parseInt(bits[3].data)+parseInt(bits[5].data)+parseInt(bits[6].data)); // se calculeaza bitul de control de pe pozitia 2
                var c1=this.parity(parseInt(bits[0].data)+parseInt(bits[1].data)+parseInt(bits[3].data)+parseInt(bits[4].data)+parseInt(bits[6].data)); // se calculeaza bitul de control de pe pozitia 1
                var c0=this.parity(parseInt(bits[0].data)+parseInt(bits[1].data)+parseInt(bits[2].data)+parseInt(bits[3].data)+bits[4].data+parseInt(bits[5].data)+parseInt(bits[6].data)+parseInt(bits[7].data)+c1+c2+c4+c8);
                console.log("Parity bit: "+c0);
                console.log("Control bits: "+c1+","+c2+","+c4+","+c8);
                return [c0,c1,c2,parseInt(bits[0].data),c4,parseInt(bits[1].data),parseInt(bits[2].data),parseInt(bits[3].data)];
            }
            
        },
        parity: function(number){
            return number % 2;
        },
        validate: function(bits){
            for(var i=0; i<bits.length;i++){
                if (this.validateBit(bits[i].data) === false)
                return false;
            }
            return true;
        },
        validateBit: function(character){
            if (character === null) return false;
            return (parseInt(character) === 0 ||
            parseInt(character) === 1);  
        }
    }
})