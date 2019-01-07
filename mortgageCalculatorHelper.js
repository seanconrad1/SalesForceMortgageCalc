({
    updatePrice : function(component, price, callback) {
        let nameField = component.find("calculatorform");
        for(let field of nameField){
           	let name = field.get("v.name")
            let value = field.get('v.value')
            if (name === 'price'){
            	field.set("v.value", price)
            }
        }
    },

    updateTotalAndOthers : function(component, price, callback) {
        let nameField = component.find("calculatorform")
       	let lengthofloan = ''
        let interestrate = ''
        let propertytax = ''
        let hoia = ''
     	let downpayment = ''
        let selectValue = component.find("select").get("v.value")

        if (selectValue === '1'){
            lengthofloan = 30
        }else if(selectValue === '2'){
            lengthofloan = 15
        }

        for(let field of nameField){
           	let name = field.get("v.name")
            let value = field.get('v.value')

           	if (name === 'downpayment'){
                downpayment = parseInt(value)/100
            }else if(name === 'lengthofloan'){
                lengthofloan = parseInt(value)
            }else if(name === 'interestrate'){
                interestrate = parseInt(value)
            }else if(name === 'propertytax'){
               	propertytax = parseInt(value)
            }else if(name === 'hoia'){
               	 hoia = parseInt(value)
            }

      	 }

        let n = 12 * lengthofloan
        let i = (interestrate/100) / 12
        let D = (i * (Math.pow((1 + i), n))) / ((Math.pow((1 + i), n)) -1)

        let priceOfHome = price / D


        for(let field of nameField){
           	let name = field.get("v.name")
            let value = field.get('v.value')
            if (name === 'price'){
            	field.set("v.value", priceOfHome)
            }
        }

    },

    updateChart : function(component, chart, callback) {
    	console.log(chart)
    }
})
