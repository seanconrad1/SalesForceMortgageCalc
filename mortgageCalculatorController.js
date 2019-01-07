({
	calculateMortgage : function(component, event, helper) {
        let price = 0
        let downpayment = 0
        let lengthofloan = 0
        let interestrate = 6
        let propertytax = 0
        let hoia = 0
        let nameField = component.find("calculatorform");
        let selectValue = component.find("select").get("v.value")

        if (selectValue === '1'){
            lengthofloan = 30
        }else if(selectValue === '2'){
            lengthofloan = 15
        }

        for(let field of nameField){
           	let name = field.get("v.name")
            let value = field.get('v.value')

            if (name === 'price'){
                price = parseInt(value)
            }else if(name === 'downpayment'){
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

        // This is for when you backspace all of the way in the forms,
        // it sets the values to 0 instead of NaN
        if(isNaN(propertytax)){
             propertytax = 0
        }
        if(isNaN(hoia)){
            hoia = 0
        }
        if(isNaN(interestrate)){
            interestrate = 0
        }
        if(isNaN(price)){
            price = 0
        }
        if(isNaN(lengthofloan)){
            lengthofloan = 0
        }
        if(isNaN(downpayment)){
            downpayment = 0
        }


        //Calculations go here
        price = price - (downpayment * price)
        let n = 12 * lengthofloan
        let i = (interestrate/100) / 12
        let D = (i * (Math.pow((1 + i), n))) / ((Math.pow((1 + i), n)) -1)
        let priceWithDiscountOnly = price * D
        let loanpayment = (price * D) + propertytax + hoia

        component.set("v.priceWithDiscountOnly", priceWithDiscountOnly.toFixed(0))
        component.set("v.monthlyPayment", parseFloat(loanpayment.toFixed(0)))

        var generateChart = component.get('c.setupChart');
   		$A.enqueueAction(generateChart);

 	},

    sliderController : function(component, event, helper) {
        helper.updatePrice(component, event.getParam("value"));
    },

    totalSliderController : function(component, event, helper) {
        helper.updateTotalAndOthers(component, event.getParam("value"));
    },

    setupChart : function(component, event, helper) {
        let nameField = component.find("calculatorform");
        let chartobj = component.get("v.chartobj")
        let priceWithDiscountOnly = component.get("v.priceWithDiscountOnly")
        let propertytax = ''
        let hoia = ''

        for(let field of nameField){
           	let name = field.get("v.name")
            let value = field.get('v.value')

            if(name === 'propertytax'){
               	propertytax = parseInt(value)
            }else if(name === 'hoia'){
               	 hoia = parseInt(value)
            }
        }


        var chartdata = {
            labels: ['Monthly Payment','Property Tax', 'Homeowners Insurance'],
            datasets: [
                {
                    label:'Day',
                    data: [priceWithDiscountOnly, propertytax, hoia],
                    backgroundColor: ["#0074D9", "#FF4136", "#2ECC40"],
                    borderColor:'rgba(62, 159, 222, 1)',
                    fill: false,
                    pointBackgroundColor: "#FFFFFF",
                	pointBorderWidth: 4,
                	pointHoverRadius: 5,
                	pointRadius: 3,
                	bezierCurve: true,
                	pointHitRadius: 10
                }
            ]
        }

        if(chartobj){
            chartobj.destroy();
        }

        //Get the context of the canvas element we want to select
        var ctx = component.find("piechart").getElement();
        chartobj = new Chart(ctx ,{
            type: 'doughnut',
            data: chartdata,
            options: {
                legend: {
                    position: 'bottom',
                    padding: 10,
                },
                responsive: true
            }
        });
        component.set("v.chartobj",chartobj);
    },

})
