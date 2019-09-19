
//expanding seed
function ampliar(seed){

	//capitalize
	function inicial(str){
		var i = str.charAt(0).toUpperCase();
		var resto = str.slice(1).toLowerCase(); 
		return i+resto;
	}

	function texto(item, index, seed){
		if (typeof item == 'string'){
			var aux = [];
			aux.push(
				item.toUpperCase(),
				item.toLowerCase(),
				inicial(item))
			aux.forEach(function(item, index, array){
				if (!seed.includes(item)){seed.push(item);}
			})
		}
	}

	//repensar estas movidas para añadir. ¿facer configurable?
	function addNum(seed){
		//seed.push("2019","2018","2017"); 
		//seed.push("123","1234","12345");
	}

	seed.forEach(function(item, index, array){
		texto(item,index,array);
	})

	addNum(seed);
}


//combinations function
//TO DO: avoid combinations between numbers. Different list for the numbers?
function generate(seed, dict){
	var txt = "";
	seed.forEach(function(item,index,array){
		item.toString();
		aux = array.slice();
		aux.splice(index,1);
		aux.forEach(function(item2,index2,array2){
			if((item.toLowerCase()!=item2.toLowerCase()) && ( isNaN(item) || isNaN(item2))){
				dict.push(item+item2);
				txt = txt+item+item2+"\r\n";
			}
		});
	});
	return txt.trim();
}


window.onload = function(){

	var submit = document.getElementById("submit_seed");
	submit.addEventListener("click", function(){
		//TO DO - Submit with [Enter]

		var textarea = document.getElementById("seedbox");
		var seed = textarea.value.split(",");
		var dict = [];

		//remove whitespaces
		seed.forEach(function(item, index, array){
			array[index] = item.replace(/\s+/g, "");
		});

		ampliar(seed);

		//txt = dictionary as a text ; dict = dictionary as a list
		var txt = generate(seed, dict, txt);
		textarea.value = txt;


		//generating txt
		var download = document.getElementById("download");
		var content = document.getElementById("seedbox").value;
		download.download = "weakdict.txt";
		download.href = "data:text/plain;charset=utf-8," + encodeURIComponent(content); //TO DO: to handle Enters properly
	});

	var reset = document.getElementById("reset");
	reset.addEventListener("click", function(){
		var textarea = document.getElementById("seedbox");
		textarea.value = "";

		var download = document.getElementById("download");
		download.removeAttribute("href")
	});
}
